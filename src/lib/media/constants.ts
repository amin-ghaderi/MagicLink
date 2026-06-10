export const MAX_IMAGE_BYTES = 20 * 1024 * 1024; // 20 MB
export const MAX_IMAGE_WIDTH = 1200;
export const JPEG_QUALITY = 0.8;

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'] as const;
