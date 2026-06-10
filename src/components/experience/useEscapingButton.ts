'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const PADDING = 12;
const MIN_MOVE_DISTANCE = 80;

interface Position {
  x: number;
  y: number;
}

function getViewportBounds(width: number, height: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const minX = PADDING;
  const minY = PADDING;
  const maxX = Math.max(minX, vw - width - PADDING);
  const maxY = Math.max(minY, vh - height - PADDING);
  return { minX, minY, maxX, maxY };
}

function clampToViewport(pos: Position, width: number, height: number): Position {
  const { minX, minY, maxX, maxY } = getViewportBounds(width, height);
  return {
    x: Math.min(Math.max(pos.x, minX), maxX),
    y: Math.min(Math.max(pos.y, minY), maxY),
  };
}

function randomPosition(width: number, height: number): Position {
  const { minX, minY, maxX, maxY } = getViewportBounds(width, height);
  if (maxX <= minX && maxY <= minY) {
    return clampToViewport({ x: minX, y: minY }, width, height);
  }
  return clampToViewport(
    {
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    },
    width,
    height,
  );
}

function randomPositionAwayFrom(
  current: Position,
  width: number,
  height: number,
): Position {
  for (let i = 0; i < 32; i++) {
    const next = randomPosition(width, height);
    if (Math.hypot(next.x - current.x, next.y - current.y) >= MIN_MOVE_DISTANCE) {
      return next;
    }
  }
  return randomPosition(width, height);
}

/** Scale: 1.0 until attempt 10, then shrinks to 0.6 by attempt 20+ */
export function getNoButtonScale(escapeCount: number): number {
  if (escapeCount < 10) return 1;
  const progress = Math.min((escapeCount - 10) / 10, 1);
  return 1 - progress * 0.4;
}

/** Transition duration in seconds — faster after 20 attempts */
export function getEscapeSpeed(escapeCount: number): number {
  if (escapeCount < 20) return 0.4;
  const extra = Math.min(escapeCount - 20, 15);
  return Math.max(0.1, 0.4 - extra * 0.02);
}

export function useEscapingButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isFloatingRef = useRef(false);
  const escapingRef = useRef(false);
  const canEscapeRef = useRef(false);
  const [canEscape, setCanEscape] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [escapeCount, setEscapeCount] = useState(0);
  const [tauntMessage, setTauntMessage] = useState<string | null>(null);

  // Escaping activates only after the user has interacted with the page.
  // Capture phase ensures enable runs before the NO button's own handler.
  useEffect(() => {
    const enable = () => {
      canEscapeRef.current = true;
      setCanEscape(true);
    };
    window.addEventListener('pointerdown', enable, {
      passive: true,
      once: true,
      capture: true,
    });
    window.addEventListener('keydown', enable, { once: true, capture: true });
    return () => {
      window.removeEventListener('pointerdown', enable, { capture: true });
      window.removeEventListener('keydown', enable, { capture: true });
    };
  }, []);

  // Keep floating button in viewport on resize / orientation change
  useEffect(() => {
    if (!isFloating) return;

    const keepInView = () => {
      const el = buttonRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setPosition((prev) =>
        prev ? clampToViewport(prev, width, height) : prev,
      );
    };

    window.addEventListener('resize', keepInView);
    window.addEventListener('orientationchange', keepInView);
    return () => {
      window.removeEventListener('resize', keepInView);
      window.removeEventListener('orientationchange', keepInView);
    };
  }, [isFloating]);

  const moveButton = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const { width, height } = rect;

    if (!isFloatingRef.current) {
      const origin = clampToViewport(
        { x: rect.left, y: rect.top },
        width,
        height,
      );
      isFloatingRef.current = true;
      setIsFloating(true);
      setPosition(origin);
      requestAnimationFrame(() => {
        setPosition(randomPositionAwayFrom(origin, width, height));
      });
    } else {
      setPosition((prev) => {
        const current = clampToViewport(
          prev ?? { x: rect.left, y: rect.top },
          width,
          height,
        );
        return randomPositionAwayFrom(current, width, height);
      });
    }

    setEscapeCount((c) => c + 1);
  }, []);

  const tryEscape = useCallback(
    (message: string) => {
      if (!canEscapeRef.current || escapingRef.current) return;

      escapingRef.current = true;
      moveButton();
      setTauntMessage(message);

      // Brief lockout prevents double-fire from pointerenter + pointerdown
      setTimeout(() => {
        escapingRef.current = false;
      }, 120);
    },
    [moveButton],
  );

  const scale = getNoButtonScale(escapeCount);
  const transitionDuration = getEscapeSpeed(escapeCount);

  return {
    buttonRef,
    canEscape,
    isFloating,
    position,
    escapeCount,
    tauntMessage,
    scale,
    transitionDuration,
    tryEscape,
  };
}
