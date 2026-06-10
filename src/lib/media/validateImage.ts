import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
} from '@/lib/media/constants';

export interface ImageValidationResult {
  ok: true;
}

export interface ImageValidationError {
  ok: false;
  message: string;
}

export type ValidateImageResult = ImageValidationResult | ImageValidationError;

function extensionOf(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? (parts.pop()?.toLowerCase() ?? '') : '';
}

export function validateImageFile(file: File): ValidateImageResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    const ext = extensionOf(file.name);
    if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext as (typeof ALLOWED_IMAGE_EXTENSIONS)[number])) {
      return {
        ok: false,
        message: 'فرمت مجاز: JPG، PNG یا WebP',
      };
    }
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return {
      ok: false,
      message: 'حجم عکس نباید بیشتر از ۲۰ مگابایت باشد',
    };
  }

  if (file.size === 0) {
    return {
      ok: false,
      message: 'فایل عکس خالی است',
    };
  }

  return { ok: true };
}

/** Server-side validation after client compression */
export function validateUploadBuffer(
  buffer: Buffer,
  mimeType: string,
): ValidateImageResult {
  if (!ALLOWED_IMAGE_TYPES.includes(mimeType as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return { ok: false, message: 'فرمت فایل مجاز نیست' };
  }

  if (buffer.length > MAX_IMAGE_BYTES) {
    return { ok: false, message: 'حجم فایل بیش از حد مجاز است' };
  }

  return { ok: true };
}
