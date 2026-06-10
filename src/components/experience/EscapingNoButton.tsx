'use client';

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
  onMobileEscape: () => void;
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
  onMobileEscape,
}: EscapingNoButtonProps) {
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (mode !== 'mobile') return;

    // Escape before tap completes — finger never lands on NO
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      e.preventDefault();
      onMobileEscape();
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
        isFloating && 'fixed z-50',
        mode === 'mobile' && 'touch-manipulation',
        !isFloating && 'relative',
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
      onPointerDown={handlePointerDown}
      onClick={(e) => e.preventDefault()}
    >
      {label}
    </Button>
  );
}
