/**
 * Google Drive uc?export=view URLs work in a browser tab but return 403 when
 * loaded cross-origin in <img> (Sec-Fetch-Mode: no-cors). Proxy through our API.
 */

export function extractGoogleDriveFileId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('drive.google.com')) return null;

    const fromQuery = parsed.searchParams.get('id');
    if (fromQuery) return fromQuery;

    const pathMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    return pathMatch?.[1] ?? null;
  } catch {
    return null;
  }
}

/** Same-origin proxy URL for experience rendering. Non-Drive URLs pass through unchanged. */
export function toProxiedDriveImageUrl(imageUrl: string): string {
  const fileId = extractGoogleDriveFileId(imageUrl);
  if (!fileId) return imageUrl;
  return `/api/drive-image?id=${encodeURIComponent(fileId)}`;
}
