'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileNoButtonProps {
  label: string;
  className?: string;
  onTap: () => void;
}

export function MobileNoButton({ label, className, onTap }: MobileNoButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      className={cn(
        'relative z-10 min-w-[7rem] select-none touch-manipulation text-white active:scale-95',
        className,
      )}
      onClick={onTap}
    >
      {label}
    </Button>
  );
}
