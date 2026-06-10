'use client';

import { useCallback, useRef, useState } from 'react';

const PADDING = 16;
const MIN_MOVE_DISTANCE = 90;

interface Position {
  x: number;
  y: number;
}

function getViewportBounds(width: number, height: number) {
  return {
    minX: PADDING,
    minY: PADDING,
    maxX: Math.max(PADDING, window.innerWidth - width - PADDING),
    maxY: Math.max(PADDING, window.innerHeight - height - PADDING),
  };
}

function randomPosition(width: number, height: number): Position {
  const { minX, minY, maxX, maxY } = getViewportBounds(width, height);
  return {
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY),
  };
}

function randomPositionAwayFrom(
  current: Position,
  width: number,
  height: number,
): Position {
  for (let i = 0; i < 24; i++) {
    const next = randomPosition(width, height);
    if (Math.hypot(next.x - current.x, next.y - current.y) >= MIN_MOVE_DISTANCE) {
      return next;
    }
  }
  return randomPosition(width, height);
}

export function useEscapingButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [escapeCount, setEscapeCount] = useState(0);
  const [tauntMessage, setTauntMessage] = useState<string | null>(null);

  const moveButton = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const { width, height } = rect;

    if (!isFloating) {
      const origin = { x: rect.left, y: rect.top };
      setIsFloating(true);
      setPosition(origin);
      requestAnimationFrame(() => {
        setPosition(randomPositionAwayFrom(origin, width, height));
      });
    } else {
      setPosition((prev) => {
        const current = prev ?? { x: rect.left, y: rect.top };
        return randomPositionAwayFrom(current, width, height);
      });
    }

    setEscapeCount((c) => c + 1);
  }, [isFloating]);

  const handleEscape = useCallback(
    (message: string) => {
      moveButton();
      setTauntMessage(message);
    },
    [moveButton],
  );

  return {
    buttonRef,
    isFloating,
    position,
    escapeCount,
    tauntMessage,
    handleEscape,
  };
}
