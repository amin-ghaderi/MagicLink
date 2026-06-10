import { google } from 'googleapis';

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive';

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

/**
 * Validates OAuth environment variables.
 * Called at provider construction and before each auth client is created.
 */
export function validateGoogleOAuthConfig(): GoogleOAuthConfig {
  const missing: string[] = [];

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();

  if (!clientId) missing.push('GOOGLE_CLIENT_ID');
  if (!clientSecret) missing.push('GOOGLE_CLIENT_SECRET');
  if (!refreshToken) missing.push('GOOGLE_REFRESH_TOKEN');

  if (missing.length > 0) {
    throw new Error(
      `Google Drive OAuth not configured. Missing: ${missing.join(', ')}.`,
    );
  }

  return {
    clientId: clientId!,
    clientSecret: clientSecret!,
    refreshToken: refreshToken!,
  };
}

/** OAuth2 client using the owner's refresh token — uses personal Drive quota */
export function getGoogleDriveAuth() {
  const { clientId, clientSecret, refreshToken } = validateGoogleOAuthConfig();

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
  oauth2.setCredentials({
    refresh_token: refreshToken,
    scope: DRIVE_SCOPE,
  });

  return oauth2;
}
