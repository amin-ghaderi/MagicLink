/** Direct image URL for embedding in img tags, OG, and experiences */
export function buildGoogleDriveDirectUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function isGoogleDriveDirectUrl(url: string): boolean {
  return url.includes('drive.google.com/uc');
}
