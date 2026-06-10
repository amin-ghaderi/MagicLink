import { GoogleDriveProvider } from '@/lib/storage/GoogleDriveProvider';
import type { StorageProvider, StorageProviderConfig } from '@/lib/storage/types';

export type StorageProviderId = 'google-drive';

/**
 * Resolves the active storage provider.
 * Future: CloudinaryProvider, ImageKitProvider, multiple GoogleDriveProvider instances.
 */
export function getStorageProvider(
  providerId: StorageProviderId = (process.env.STORAGE_PROVIDER as StorageProviderId) ??
    'google-drive',
  config?: StorageProviderConfig,
): StorageProvider {
  switch (providerId) {
    case 'google-drive':
      return new GoogleDriveProvider(config);
    default:
      throw new Error(`Unknown storage provider: ${providerId}`);
  }
}
