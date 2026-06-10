'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EscapingNoButtonProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isFloating: boolean;
  position: { x: number; y: number } | null;
  label: string;
  onEscape: () => void;
}

export function EscapingNoButton({
  buttonRef,
  isFloating,
  position,
  label,
  onEscape,
}: EscapingNoButtonProps) {
  return (
    <Button
      ref={buttonRef}
      type="button"
      variant="secondary"
      size="lg"
      className={cn(
        'select-none border-pink-300/30 bg-pink-500/20 text-white hover:bg-pink-500/30',
        isFloating && 'fixed z-50 touch-none',
        !isFloating && 'relative',
      )}
      style={
        isFloating && position
          ? {
              left: position.x,
              top: position.y,
              transition:
                'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }
          : undefined
      }
      onMouseEnter={onEscape}
      onTouchStart={(e) => {
        e.preventDefault();
        onEscape();
      }}
      onClick={(e) => {
        e.preventDefault();
        onEscape();
      }}
    >
      {label}
    </Button>
  );
}
