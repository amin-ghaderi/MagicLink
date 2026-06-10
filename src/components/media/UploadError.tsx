'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadErrorProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function UploadError({ message, onRetry, className }: UploadErrorProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-4 text-right',
        className,
      )}
      role="alert"
    >
      <p className="mb-1 text-sm font-medium text-red-200">آپلود ناموفق</p>
      <p className="text-sm text-red-200/80">{message}</p>
      {onRetry && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-3"
          onClick={onRetry}
        >
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}
