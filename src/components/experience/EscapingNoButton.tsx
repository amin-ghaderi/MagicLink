'use client';

import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Desktop only — proximity-escaping NO button */
interface EscapingNoButtonProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
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
  isFloating,
  position,
  label,
  className,
  scale,
  transitionDuration,
  instantMove,
  onForceEscape,
}: EscapingNoButtonProps) {
  // Block direct clicks — desktop relies on proximity escape
  useLayoutEffect(() => {
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
  }, [buttonRef, onForceEscape, isFloating]);

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
        isFloating && 'fixed z-[9999]',
        !isFloating && 'relative z-10',
      )}
      style={{
        ...(isFloating && position
          ? { left: position.x, top: position.y, transition }
          : { transition: 'transform 0.25s ease' }),
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {label}
    </Button>
  );

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
