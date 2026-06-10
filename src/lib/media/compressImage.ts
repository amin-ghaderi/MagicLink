import { JPEG_QUALITY, MAX_IMAGE_WIDTH } from '@/lib/media/constants';

export interface CompressedImage {
  blob: Blob;
  filename: string;
  mimeType: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('خواندن عکس ممکن نشد'));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('فشرده‌سازی عکس ناموفق بود'));
      },
      mimeType,
      quality,
    );
  });
}

function outputFilename(originalName: string): string {
  const base = originalName.replace(/\.[^.]+$/, '') || 'image';
  return `${base}.jpg`;
}

/**
 * Resize to max width 1200px, preserve aspect ratio, JPEG quality 80%.
 * PNG/WebP are converted to JPEG for smaller uploads unless transparency is needed.
 */
export async function compressImage(file: File): Promise<CompressedImage> {
  const img = await loadImage(file);
  const originalWidth = img.naturalWidth;
  const originalHeight = img.naturalHeight;

  const scale = originalWidth > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH / originalWidth : 1;
  const width = Math.round(originalWidth * scale);
  const height = Math.round(originalHeight * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('فشرده‌سازی عکس در این مرورگر پشتیبانی نمی‌شود');
  }

  ctx.drawImage(img, 0, 0, width, height);

  const mimeType = 'image/jpeg';
  const blob = await canvasToBlob(canvas, mimeType, JPEG_QUALITY);

  return {
    blob,
    filename: outputFilename(file.name),
    mimeType,
    width,
    height,
    originalWidth,
    originalHeight,
  };
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const img = await loadImage(file);
  return { width: img.naturalWidth, height: img.naturalHeight };
}
