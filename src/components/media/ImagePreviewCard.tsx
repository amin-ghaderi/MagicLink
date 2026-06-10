'use client';

import Image from 'next/image';
import { toProxiedDriveImageUrl } from '@/lib/storage/driveImageUrl';
import { cn } from '@/lib/utils';
import { UploadProgress, type UploadPhase } from './UploadProgress';
import { UploadError } from './UploadError';

export type PreviewStatus = 'preview' | 'uploading' | 'success' | 'error';

interface ImagePreviewCardProps {
  previewUrl: string;
  filename: string;
  width: number;
  height: number;
  status: PreviewStatus;
  uploadPhase?: UploadPhase;
  errorMessage?: string;
  onRemove?: () => void;
  onRetry?: () => void;
  accent?: 'rose' | 'pink' | 'violet';
  className?: string;
}

const STATUS_BADGE = {
  preview: { label: 'پیش‌نمایش', className: 'bg-white/15 text-white/80' },
  uploading: { label: 'در حال آپلود', className: 'bg-amber-500/20 text-amber-200' },
  success: { label: 'آماده استفاده ✓', className: 'bg-emerald-500/20 text-emerald-200' },
  error: { label: 'خطا', className: 'bg-red-500/20 text-red-200' },
} as const;

export function ImagePreviewCard({
  previewUrl,
  filename,
  width,
  height,
  status,
  uploadPhase,
  errorMessage,
  onRemove,
  onRetry,
  accent = 'violet',
  className,
}: ImagePreviewCardProps) {
  const badge = STATUS_BADGE[status];
  const displaySrc = previewUrl.startsWith('blob:')
    ? previewUrl
    : toProxiedDriveImageUrl(previewUrl);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-bl from-white/10 to-white/5 shadow-xl backdrop-blur-md transition-all duration-300',
        status === 'success' && 'border-emerald-400/30 shadow-emerald-900/20',
        status === 'error' && 'border-red-400/30',
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/30">
        <Image
          src={displaySrc}
          alt=""
          fill
          className={cn(
            'object-cover transition-opacity duration-300',
            status === 'uploading' && 'opacity-70',
          )}
          unoptimized
          sizes="(max-width: 768px) 100vw, 480px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute right-3 top-3">
          <span className={cn('rounded-full px-3 py-1 text-xs font-medium', badge.className)}>
            {badge.label}
          </span>
        </div>

        {onRemove && status !== 'uploading' && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            حذف
          </button>
        )}
      </div>

      <div className="space-y-3 p-4 text-right">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-white/90" dir="ltr">
            {filename}
          </p>
          {width > 0 && height > 0 && (
            <p className="text-xs text-white/50">
              {width} × {height}
            </p>
          )}
        </div>

        {status === 'uploading' && uploadPhase && (
          <UploadProgress phase={uploadPhase} accent={accent} />
        )}

        {status === 'error' && errorMessage && (
          <UploadError message={errorMessage} onRetry={onRetry} />
        )}

        {status === 'success' && (
          <p className="text-xs text-emerald-200/80">عکس با موفقیت آپلود شد و در لینک شما قرار می‌گیرد.</p>
        )}
      </div>
    </div>
  );
}
