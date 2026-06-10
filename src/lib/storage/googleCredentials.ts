import { google } from 'googleapis';

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive';

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
}

export function getGoogleServiceAccountCredentials(): ServiceAccountCredentials {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (json) {
    const parsed = JSON.parse(json) as ServiceAccountCredentials;
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is missing required fields');
    }
    return parsed;
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (email && privateKey) {
    return { client_email: email, private_key: privateKey };
  }

  throw new Error(
    'Google Drive credentials not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.',
  );
}

/** Service Account (preferred) or OAuth refresh token */
export function getGoogleDriveAuth() {
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

  if (refreshToken && clientId && clientSecret) {
    const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
    oauth2.setCredentials({ refresh_token: refreshToken });
    return oauth2;
  }

  return new google.auth.GoogleAuth({
    credentials: getGoogleServiceAccountCredentials(),
    scopes: [DRIVE_SCOPE],
  });
}
