'use client';

import { useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { InteractionMode } from '@/hooks/useInteractionMode';

interface EscapingNoButtonProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  mode: InteractionMode;
  isFloating: boolean;
  position: { x: number; y: number } | null;
  label: string;
  className?: string;
  scale: number;
  transitionDuration: number;
  instantMove: boolean;
  onForceEscape: (reason: string) => void;
}

export function EscapingNoButton({
  buttonRef,
  mode,
  isFloating,
  position,
  label,
  className,
  scale,
  transitionDuration,
  instantMove,
  onForceEscape,
}: EscapingNoButtonProps) {
  // Mobile: capture touch/pointer before tap completes — NO click must never register
  useLayoutEffect(() => {
    if (mode !== 'mobile') return;

    const el = buttonRef.current;
    if (!el) return;

    const blockAndEscape = (e: Event, reason: string) => {
      e.preventDefault();
      e.stopPropagation();
      onForceEscape(reason);
    };

    const onTouchStart = (e: TouchEvent) => blockAndEscape(e, 'mobile-touchstart');
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') blockAndEscape(e, 'mobile-pointerdown');
    };
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false, capture: true });
    el.addEventListener('pointerdown', onPointerDown, { capture: true });
    el.addEventListener('click', onClick, { capture: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart, { capture: true });
      el.removeEventListener('pointerdown', onPointerDown, { capture: true });
      el.removeEventListener('click', onClick, { capture: true });
    };
  }, [mode, buttonRef, onForceEscape, isFloating]);

  // Desktop: block any direct click on NO as last resort
  useLayoutEffect(() => {
    if (mode !== 'desktop') return;

    const el = buttonRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        e.preventDefault();
        e.stopPropagation();
        onForceEscape('desktop-direct-click-blocked');
      }
    };
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('pointerdown', onPointerDown, { capture: true });
    el.addEventListener('click', onClick, { capture: true });

    return () => {
      el.removeEventListener('pointerdown', onPointerDown, { capture: true });
      el.removeEventListener('click', onClick, { capture: true });
    };
  }, [mode, buttonRef, onForceEscape, isFloating]);

  const transition = instantMove
    ? 'none'
    : `left ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1), top ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.25s ease`;

  const button = (
    <Button
      ref={buttonRef}
      type="button"
      variant="secondary"
      size="lg"
      tabIndex={-1}
      className={cn(
        'select-none text-white will-change-[left,top,transform]',
        className,
        isFloating && 'fixed z-[9999] touch-manipulation',
        !isFloating && 'relative z-10',
      )}
      style={{
        ...(isFloating && position
          ? { left: position.x, top: position.y, transition }
          : { transition: 'transform 0.25s ease' }),
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
      onPointerDown={(e) => {
        if (mode === 'mobile' && e.pointerType === 'touch') {
          e.preventDefault();
          e.stopPropagation();
          onForceEscape('mobile-react-pointerdown');
        }
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {label}
    </Button>
  );

  // Portal when floating — never clipped or hidden under card
  if (isFloating && typeof document !== 'undefined') {
    return (
      <>
        <span className="inline-block h-11 min-w-[7rem]" aria-hidden />
        {createPortal(button, document.body)}
      </>
    );
  }

  return button;
}
