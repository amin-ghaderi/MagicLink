'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { InteractionMode } from '@/hooks/useInteractionMode';
import {
  clampToBounds,
  distanceBetween,
  getButtonCenter,
  getSafeBounds,
  randomPositionAwayFrom,
  type Position,
} from './escapeBounds';
import { logEscapeDebug } from './escapeDebug';
import { DANGER_RADIUS, getEscapeSpeed, getMinJumpDistance, getNoButtonScale } from './escapeDifficulty';

interface UseEscapingButtonOptions {
  mode: InteractionMode;
  boundsContainerRef: React.RefObject<HTMLElement | null>;
  onEscape: () => string;
}

export function useEscapingButton({
  mode,
  boundsContainerRef,
  onEscape,
}: UseEscapingButtonOptions) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isFloatingRef = useRef(false);
  const canEscapeRef = useRef(false);
  const escapeCountRef = useRef(0);
  const onEscapeRef = useRef(onEscape);
  const pointerRef = useRef<Position | null>(null);
  const lastMessageAtRef = useRef(0);
  const lastMoveAtRef = useRef(0);

  onEscapeRef.current = onEscape;

  const [canEscape, setCanEscape] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [instantMove, setInstantMove] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [tauntMessage, setTauntMessage] = useState<string | null>(null);

  // Enable escaping after first interaction
  useEffect(() => {
    const enable = () => {
      canEscapeRef.current = true;
      setCanEscape(true);
      logEscapeDebug({ device: mode, reason: 'escape-enabled' });
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
  }, [mode]);

  // Global pointer tracking
  useEffect(() => {
    const track = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', track, { passive: true });
    window.addEventListener('pointerdown', track, { passive: true });
    return () => {
      window.removeEventListener('pointermove', track);
      window.removeEventListener('pointerdown', track);
    };
  }, []);

  const moveButton = useCallback(
    (reason: string) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const { width, height } = rect;
      const bounds = getSafeBounds(boundsContainerRef.current, width, height);
      const minDist = getMinJumpDistance(escapeCountRef.current);

      setInstantMove(true);

      if (!isFloatingRef.current) {
        const origin = clampToBounds({ x: rect.left, y: rect.top }, width, height, bounds);
        isFloatingRef.current = true;
        setIsFloating(true);
        const next = randomPositionAwayFrom(origin, width, height, minDist, bounds);
        setPosition(next);

        logEscapeDebug({
          device: mode,
          reason,
          pointer: pointerRef.current ?? undefined,
          button: {
            left: rect.left,
            top: rect.top,
            centerX: origin.x + width / 2,
            centerY: origin.y + height / 2,
          },
          distance: pointerRef.current
            ? distanceBetween(pointerRef.current, {
                x: origin.x + width / 2,
                y: origin.y + height / 2,
              })
            : undefined,
          dangerRadius: DANGER_RADIUS,
        });
      } else {
        setPosition((prev) => {
          const current = clampToBounds(
            prev ?? { x: rect.left, y: rect.top },
            width,
            height,
            bounds,
          );
          const next = randomPositionAwayFrom(current, width, height, minDist, bounds);

          logEscapeDebug({
            device: mode,
            reason,
            pointer: pointerRef.current ?? undefined,
            button: {
              left: next.x,
              top: next.y,
              centerX: next.x + width / 2,
              centerY: next.y + height / 2,
            },
            distance: pointerRef.current
              ? distanceBetween(pointerRef.current, {
                  x: next.x + width / 2,
                  y: next.y + height / 2,
                })
              : undefined,
            dangerRadius: DANGER_RADIUS,
          });

          return next;
        });
      }

      escapeCountRef.current += 1;
      setEscapeCount(escapeCountRef.current);

      requestAnimationFrame(() => setInstantMove(false));
    },
    [boundsContainerRef, mode],
  );

  const triggerEscape = useCallback(
    (reason: string, options?: { skipCooldown?: boolean }) => {
      if (!canEscapeRef.current) return;

      const now = Date.now();
      const moveCooldown = mode === 'desktop' ? 70 : 0;
      if (!options?.skipCooldown && now - lastMoveAtRef.current < moveCooldown) {
        return;
      }
      lastMoveAtRef.current = now;

      moveButton(reason);

      if (mode === 'mobile' || now - lastMessageAtRef.current > 350) {
        setTauntMessage(onEscapeRef.current());
        lastMessageAtRef.current = now;
      }
    },
    [mode, moveButton],
  );

  // Desktop: rAF proximity loop — escape BEFORE cursor reaches button
  useEffect(() => {
    if (mode !== 'desktop') return;

    let rafId = 0;

    const tick = () => {
      if (canEscapeRef.current && pointerRef.current && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const center = getButtonCenter(rect);
        const dist = distanceBetween(pointerRef.current, center);

        if (dist < DANGER_RADIUS) {
          triggerEscape('desktop-proximity');
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mode, triggerEscape]);

  // Re-clamp on resize
  useEffect(() => {
    if (!isFloating) return;

    const keepInView = () => {
      const el = buttonRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      const bounds = getSafeBounds(boundsContainerRef.current, width, height);
      setPosition((prev) => (prev ? clampToBounds(prev, width, height, bounds) : prev));
    };

    window.addEventListener('resize', keepInView);
    window.addEventListener('orientationchange', keepInView);
    return () => {
      window.removeEventListener('resize', keepInView);
      window.removeEventListener('orientationchange', keepInView);
    };
  }, [isFloating, boundsContainerRef]);

  return {
    buttonRef,
    canEscape,
    isFloating,
    position,
    instantMove,
    escapeCount,
    tauntMessage,
    scale: getNoButtonScale(escapeCount),
    transitionDuration: getEscapeSpeed(escapeCount),
    triggerEscape,
  };
}
