/** Template-specific subfolders under "LahzeSaz Uploads/" */
export const MEDIA_TEMPLATE_FOLDERS = {
  LOVE_LETTER: 'LoveLetter',
  GIFT_BOX: 'GiftBox',
  BIRTHDAY: 'Birthday',
  SECRET_MESSAGE: 'SecretMessage',
  IMPOSSIBLE_NO: 'ImpossibleNo',
} as const;

export type MediaTemplateFolder =
  (typeof MEDIA_TEMPLATE_FOLDERS)[keyof typeof MEDIA_TEMPLATE_FOLDERS];

export interface UploadParams {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  templateFolder: MediaTemplateFolder;
}

export interface UploadResult {
  url: string;
  fileId: string;
  provider: string;
  driveId?: string;
}

export interface StorageProvider {
  readonly id: string;
  upload(params: UploadParams): Promise<UploadResult>;
}

export interface StorageProviderConfig {
  /** Future: select among multiple Drive accounts */
  driveId?: string;
}
