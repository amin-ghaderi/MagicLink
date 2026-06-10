'use client';

import { cn } from '@/lib/utils';

export type UploadPhase = 'validating' | 'compressing' | 'uploading';

const PHASE_LABELS: Record<UploadPhase, string> = {
  validating: 'در حال بررسی...',
  compressing: 'در حال فشرده‌سازی...',
  uploading: 'در حال آپلود...',
};

interface UploadProgressProps {
  phase: UploadPhase;
  className?: string;
  accent?: 'rose' | 'pink' | 'violet';
}

const ACCENT_BAR = {
  rose: 'from-rose-400 to-pink-500',
  pink: 'from-pink-400 to-violet-500',
  violet: 'from-violet-400 to-purple-500',
} as const;

export function UploadProgress({ phase, className, accent = 'violet' }: UploadProgressProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/80">{PHASE_LABELS[phase]}</span>
        <span className="animate-pulse text-white/50">لطفاً صبر کنید</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn(
            'h-full animate-pulse rounded-full bg-gradient-to-l transition-all duration-500',
            ACCENT_BAR[accent],
            phase === 'validating' && 'w-1/4',
            phase === 'compressing' && 'w-2/3',
            phase === 'uploading' && 'w-full animate-none',
          )}
          style={
            phase === 'uploading'
              ? { animation: 'upload-indeterminate 1.2s ease-in-out infinite' }
              : undefined
          }
        />
      </div>
    </div>
  );
}
