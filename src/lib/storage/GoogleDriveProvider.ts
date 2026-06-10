import { Readable } from 'stream';
import { google, type drive_v3 } from 'googleapis';
import { buildGoogleDriveDirectUrl } from '@/lib/storage/directImageUrl';
import { getGoogleDriveAuth, validateGoogleOAuthConfig } from '@/lib/storage/googleCredentials';
import type { StorageProvider, StorageProviderConfig, UploadParams, UploadResult } from '@/lib/storage/types';

/** In-memory cache for folder IDs (per serverless instance) */
const folderCache = new Map<string, string>();

export class GoogleDriveProvider implements StorageProvider {
  readonly id = 'google-drive';
  private readonly rootFolderId: string;
  private readonly driveId?: string;

  constructor(config: StorageProviderConfig = {}) {
    validateGoogleOAuthConfig();

    const rootId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    if (!rootId) {
      throw new Error(
        'GOOGLE_DRIVE_ROOT_FOLDER_ID is required. Create "LahzeSaz Uploads" in your Google Drive and set the folder ID.',
      );
    }
    this.rootFolderId = rootId;
    this.driveId = config.driveId ?? process.env.GOOGLE_DRIVE_ID;
  }

  async upload(params: UploadParams): Promise<UploadResult> {
    const drive = await this.getDriveClient();
    const templateFolderId = await this.ensureTemplateFolder(drive, params.templateFolder);

    const file = await drive.files.create({
      requestBody: {
        name: params.filename,
        parents: [templateFolderId],
      },
      media: {
        mimeType: params.mimeType,
        body: Readable.from(params.buffer),
      },
      fields: 'id',
      supportsAllDrives: Boolean(this.driveId),
    });

    const fileId = file.data.id;
    if (!fileId) {
      throw new Error('Google Drive upload succeeded but no file ID was returned');
    }

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
      supportsAllDrives: Boolean(this.driveId),
    });

    return {
      url: buildGoogleDriveDirectUrl(fileId),
      fileId,
      provider: this.id,
      driveId: this.driveId,
    };
  }

  private async getDriveClient() {
    const auth = getGoogleDriveAuth();
    return google.drive({ version: 'v3', auth });
  }

  private cacheKey(segment: string): string {
    return `${this.driveId ?? 'default'}:${segment}`;
  }

  private async ensureTemplateFolder(
    drive: ReturnType<typeof google.drive>,
    templateFolder: string,
  ): Promise<string> {
    const templateKey = this.cacheKey(templateFolder);
    let templateId = folderCache.get(templateKey);

    if (!templateId) {
      templateId = await this.findOrCreateFolder(drive, templateFolder, this.rootFolderId);
      folderCache.set(templateKey, templateId);
    }

    return templateId;
  }

  private async findOrCreateFolder(
    drive: ReturnType<typeof google.drive>,
    name: string,
    parentId: string,
  ): Promise<string> {
    const escapedName = name.replace(/'/g, "\\'");
    const listParams: drive_v3.Params$Resource$Files$List = {
      q: `'${parentId}' in parents and name='${escapedName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id)',
      spaces: 'drive',
      ...(this.driveId
        ? {
            driveId: this.driveId,
            corpora: 'drive' as const,
            includeItemsFromAllDrives: true,
            supportsAllDrives: true,
          }
        : {}),
    };

    const existing = await drive.files.list(listParams);
    const found = existing.data.files?.[0]?.id;
    if (found) return found;

    const created = await drive.files.create({
      requestBody: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      },
      fields: 'id',
      supportsAllDrives: Boolean(this.driveId),
    });
    const id = created.data.id;
    if (!id) {
      throw new Error(`Failed to create folder: ${name}`);
    }
    return id;
  }
}
