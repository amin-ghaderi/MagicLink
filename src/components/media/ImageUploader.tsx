'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { validateImageFile } from '@/lib/media/validateImage';
import { getImageDimensions } from '@/lib/media/compressImage';
import { uploadImage } from '@/lib/media/uploadImage';
import type { UploadPhase } from './UploadProgress';
import { UploadError } from './UploadError';
import { ImagePreviewCard, type PreviewStatus } from './ImagePreviewCard';
import type { MediaTemplateFolder } from '@/lib/storage/types';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  templateFolder: MediaTemplateFolder;
  label?: string;
  optional?: boolean;
  accent?: 'rose' | 'pink' | 'violet';
  className?: string;
  onUploadingChange?: (uploading: boolean) => void;
}

interface PreviewState {
  localUrl: string;
  filename: string;
  width: number;
  height: number;
}

export function ImageUploader({
  value,
  onChange,
  templateFolder,
  label = 'آپلود عکس',
  optional = true,
  accent = 'violet',
  className,
  onUploadingChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [status, setStatus] = useState<PreviewStatus>('preview');
  const [uploadPhase, setUploadPhase] = useState<UploadPhase>('validating');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const uploadGenRef = useRef(0);

  const accentButton =
    accent === 'rose'
      ? 'border-rose-300/25 bg-rose-500/10 hover:border-rose-300/40 hover:bg-rose-500/15'
      : accent === 'pink'
        ? 'border-pink-300/25 bg-pink-500/10 hover:border-pink-300/40 hover:bg-pink-500/15'
        : 'border-violet-300/25 bg-violet-500/10 hover:border-violet-300/40 hover:bg-violet-500/15';

  const revokePreview = useCallback((url: string) => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  }, []);

  const clearAll = useCallback(() => {
    if (preview) revokePreview(preview.localUrl);
    setPreview(null);
    setPendingFile(null);
    setStatus('preview');
    setErrorMessage(null);
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = '';
  }, [preview, revokePreview, onChange]);

  const runUpload = useCallback(
    async (file: File, localUrl: string) => {
      const gen = ++uploadGenRef.current;
      setStatus('uploading');
      setErrorMessage(null);
      setUploadPhase('validating');

      try {
        const result = await uploadImage(file, templateFolder, setUploadPhase);
        if (gen !== uploadGenRef.current) return;

        onChange(result.url);
        setStatus('success');
        setPreview({
          localUrl,
          filename: result.filename,
          width: result.width,
          height: result.height,
        });
      } catch (err) {
        if (gen !== uploadGenRef.current) return;
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'آپلود ناموفق بود');
      }
    },
    [templateFolder, onChange],
  );

  const handleFile = useCallback(
    async (file: File) => {
      const validation = validateImageFile(file);
      if (!validation.ok) {
        setErrorMessage(validation.message);
        setStatus('error');
        setPreview(null);
        return;
      }

      const localUrl = URL.createObjectURL(file);
      let dimensions = { width: 0, height: 0 };

      try {
        dimensions = await getImageDimensions(file);
      } catch {
        revokePreview(localUrl);
        setErrorMessage('خواندن عکس ممکن نشد');
        setStatus('error');
        return;
      }

      if (preview) revokePreview(preview.localUrl);

      const meta: PreviewState = {
        localUrl,
        filename: file.name,
        width: dimensions.width,
        height: dimensions.height,
      };

      setPreview(meta);
      setPendingFile(file);
      setStatus('preview');
      setErrorMessage(null);

      // Brief preview flash then auto-upload
      requestAnimationFrame(() => {
        void runUpload(file, localUrl);
      });
    },
    [preview, revokePreview, runUpload],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
  };

  const onRetry = () => {
    if (pendingFile && preview) {
      void runUpload(pendingFile, preview.localUrl);
    } else if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Show existing URL as success when loaded with value but no local preview
  useEffect(() => {
    onUploadingChange?.(status === 'uploading');
  }, [status, onUploadingChange]);

  useEffect(() => {
    if (value && !preview && !pendingFile) {
      setPreview({
        localUrl: value,
        filename: 'uploaded-image.jpg',
        width: 0,
        height: 0,
      });
      setStatus('success');
    }
  }, [value, preview, pendingFile]);

  useEffect(() => {
    return () => {
      if (preview?.localUrl.startsWith('blob:')) {
        URL.revokeObjectURL(preview.localUrl);
      }
    };
  }, [preview]);

  return (
    <div className={cn('space-y-3 text-right', className)}>
      <div className="flex items-center justify-between gap-2">
        <label className="block text-sm font-medium text-white/90">
          {label}
          {optional && <span className="mr-1 text-white/50">(اختیاری)</span>}
        </label>
      </div>

      {!preview && status !== 'error' && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-10 transition-all',
            accentButton,
          )}
        >
          <span className="text-4xl">📷</span>
          <span className="text-base font-medium text-white/90">انتخاب عکس</span>
          <span className="text-xs text-white/50">JPG، PNG یا WebP — حداکثر ۲۰ مگابایت</span>
        </button>
      )}

      {preview && (
        <ImagePreviewCard
          previewUrl={preview.localUrl}
          filename={preview.filename}
          width={preview.width}
          height={preview.height}
          status={status}
          uploadPhase={uploadPhase}
          errorMessage={errorMessage ?? undefined}
          onRemove={clearAll}
          onRetry={onRetry}
          accent={accent}
        />
      )}

      {!preview && status === 'error' && errorMessage && (
        <UploadError
          message={errorMessage}
          onRetry={() => inputRef.current?.click()}
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        className="sr-only"
        onChange={onInputChange}
      />
    </div>
  );
}
