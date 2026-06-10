'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EscapingNoButtonProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isFloating: boolean;
  position: { x: number; y: number } | null;
  label: string;
  className?: string;
  canEscape: boolean;
  scale: number;
  transitionDuration: number;
  onEscape: () => void;
}

export function EscapingNoButton({
  buttonRef,
  isFloating,
  position,
  label,
  className,
  canEscape,
  scale,
  transitionDuration,
  onEscape,
}: EscapingNoButtonProps) {
  const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    // Desktop / pen: escape when pointer enters the button area
    if (e.pointerType === 'touch') return;
    if (!canEscape) return;
    onEscape();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!canEscape) return;

    // Touch: move before the tap completes (pointerdown fires before click)
    if (e.pointerType === 'touch') {
      e.preventDefault();
      onEscape();
    }
  };

  return (
    <Button
      ref={buttonRef}
      type="button"
      variant="secondary"
      size="lg"
      className={cn(
        'select-none text-white will-change-[left,top,transform]',
        className,
        isFloating && 'fixed z-50 touch-none',
        !isFloating && 'relative',
        !canEscape && 'cursor-default',
      )}
      style={{
        ...(isFloating && position
          ? {
              left: position.x,
              top: position.y,
              transition: `left ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1), top ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s ease`,
            }
          : {
              transition: 'transform 0.3s ease',
            }),
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
      onClick={(e) => e.preventDefault()}
    >
      {label}
    </Button>
  );
}
