'use client';

import { cn } from '@/lib/utils';

interface MobileResponseMessageProps {
  message: string;
  tapCount: number;
  className?: string;
}

export function MobileResponseMessage({
  message,
  tapCount,
  className,
}: MobileResponseMessageProps) {
  return (
    <p
      key={`${message}-${tapCount}`}
      className={cn(
        'animate-mobile-message text-base font-medium leading-relaxed sm:text-lg',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}
