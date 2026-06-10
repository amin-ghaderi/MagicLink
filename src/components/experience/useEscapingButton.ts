'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { InteractionMode } from '@/hooks/useInteractionMode';
import {
  getDangerRadius,
  getEscapeSpeed,
  getMinJumpDistance,
  getNoButtonScale,
} from './escapeDifficulty';

const PADDING = 12;

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
  return clampToViewport(
    {
      x: minX + Math.random() * Math.max(0, maxX - minX),
      y: minY + Math.random() * Math.max(0, maxY - minY),
    },
    width,
    height,
  );
}

function randomPositionAwayFrom(
  current: Position,
  width: number,
  height: number,
  minDistance: number,
): Position {
  for (let i = 0; i < 36; i++) {
    const next = randomPosition(width, height);
    if (Math.hypot(next.x - current.x, next.y - current.y) >= minDistance) {
      return next;
    }
  }
  return randomPosition(width, height);
}

interface UseEscapingButtonOptions {
  mode: InteractionMode;
  onEscape: () => string;
}

export function useEscapingButton({ mode, onEscape }: UseEscapingButtonOptions) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isFloatingRef = useRef(false);
  const escapingRef = useRef(false);
  const canEscapeRef = useRef(false);
  const escapeCountRef = useRef(0);
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  const [canEscape, setCanEscape] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [escapeCount, setEscapeCount] = useState(0);
  const [tauntMessage, setTauntMessage] = useState<string | null>(null);

  // Sync escape count to ref for proximity listener
  useEffect(() => {
    escapeCountRef.current = escapeCount;
  }, [escapeCount]);

  // Enable escaping after first user interaction
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

  const moveButton = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const { width, height } = rect;
    const minDist = getMinJumpDistance(escapeCountRef.current);

    if (!isFloatingRef.current) {
      const origin = clampToViewport({ x: rect.left, y: rect.top }, width, height);
      isFloatingRef.current = true;
      setIsFloating(true);
      setPosition(origin);
      requestAnimationFrame(() => {
        setPosition(randomPositionAwayFrom(origin, width, height, minDist));
      });
    } else {
      setPosition((prev) => {
        const current = clampToViewport(
          prev ?? { x: rect.left, y: rect.top },
          width,
          height,
        );
        return randomPositionAwayFrom(current, width, height, minDist);
      });
    }

    escapeCountRef.current += 1;
    setEscapeCount(escapeCountRef.current);
  }, []);

  const tryEscape = useCallback(() => {
    if (!canEscapeRef.current || escapingRef.current) return;

    escapingRef.current = true;
    const message = onEscapeRef.current();
    moveButton();
    setTauntMessage(message);

    setTimeout(() => {
      escapingRef.current = false;
    }, mode === 'mobile' ? 80 : 150);
  }, [moveButton, mode]);

  // Desktop: proximity-based escape via pointer movement
  useEffect(() => {
    if (mode !== 'desktop') return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (!canEscapeRef.current || escapingRef.current) return;

      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const radius = getDangerRadius(escapeCountRef.current);

      if (distance < radius) {
        tryEscape();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mode, tryEscape]);

  // Keep button inside viewport on resize
  useEffect(() => {
    if (!isFloating) return;

    const keepInView = () => {
      const el = buttonRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setPosition((prev) => (prev ? clampToViewport(prev, width, height) : prev));
    };

    window.addEventListener('resize', keepInView);
    window.addEventListener('orientationchange', keepInView);
    return () => {
      window.removeEventListener('resize', keepInView);
      window.removeEventListener('orientationchange', keepInView);
    };
  }, [isFloating]);

  return {
    buttonRef,
    canEscape,
    isFloating,
    position,
    escapeCount,
    tauntMessage,
    scale: getNoButtonScale(escapeCount),
    transitionDuration: getEscapeSpeed(escapeCount),
    tryEscape,
  };
}
