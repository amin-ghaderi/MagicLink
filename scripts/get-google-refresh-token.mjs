/**
 * One-time helper: obtain GOOGLE_REFRESH_TOKEN for the owner's Google account.
 *
 * Prerequisites:
 *   1. OAuth Client ID + Secret in Google Cloud Console (Desktop or Web app)
 *   2. Redirect URI added: http://localhost:3333/oauth2callback
 *   3. Google Drive API enabled
 *
 * Usage:
 *   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/get-google-refresh-token.mjs
 */

import http from 'http';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3333/oauth2callback';
const PORT = 3333;
const SCOPES = ['https://www.googleapis.com/auth/drive'];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.');
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith('/oauth2callback')) return;

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error || !code) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Authorization failed: ${error ?? 'no code'}`);
    server.close();
    process.exit(1);
    return;
  }

  try {
    const { tokens } = await oauth2.getToken(code);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Success</h1><p>You can close this tab. Check the terminal for your refresh token.</p>');

    console.log('\n--- OAuth tokens ---\n');
    if (tokens.refresh_token) {
      console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
      console.log('\nAdd this to .env.local and Vercel Environment Variables.');
    } else {
      console.log('No refresh_token returned. Revoke app access at https://myaccount.google.com/permissions');
      console.log('and run this script again with prompt=consent (already set).');
      console.log('access_token (short-lived):', tokens.access_token);
    }
    console.log('');
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Token exchange failed. See terminal.');
    console.error(err);
  } finally {
    server.close();
    process.exit(0);
  }
});

server.listen(PORT, () => {
  console.log('\n1. Open this URL in your browser and sign in with the OWNER Google account:\n');
  console.log(authUrl);
  console.log(`\n2. Waiting for callback on ${REDIRECT_URI} ...\n`);
});
