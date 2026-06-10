import { compressImage } from '@/lib/media/compressImage';
import { validateImageFile } from '@/lib/media/validateImage';
import type { MediaTemplateFolder } from '@/lib/storage/types';

export interface ClientUploadResult {
  url: string;
  fileId: string;
  width: number;
  height: number;
  filename: string;
}

export interface UploadProgressCallback {
  (phase: 'validating' | 'compressing' | 'uploading'): void;
}

export async function uploadImage(
  file: File,
  templateFolder: MediaTemplateFolder,
  onProgress?: UploadProgressCallback,
): Promise<ClientUploadResult> {
  onProgress?.('validating');
  const validation = validateImageFile(file);
  if (!validation.ok) {
    throw new Error(validation.message);
  }

  onProgress?.('compressing');
  const compressed = await compressImage(file);

  onProgress?.('uploading');
  const formData = new FormData();
  formData.append('file', compressed.blob, compressed.filename);
  formData.append('templateFolder', templateFolder);
  formData.append('mimeType', compressed.mimeType);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as {
    url?: string;
    fileId?: string;
    error?: string;
  };

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? 'آپلود ناموفق بود. لطفاً دوباره تلاش کنید.');
  }

  return {
    url: data.url,
    fileId: data.fileId ?? '',
    width: compressed.width,
    height: compressed.height,
    filename: compressed.filename,
  };
}
