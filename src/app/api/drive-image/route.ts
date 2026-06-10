import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getGoogleDriveAuth } from '@/lib/storage/googleCredentials';

export const runtime = 'nodejs';

const FILE_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id');

  if (!id || !FILE_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: 'Invalid file id' }, { status: 400 });
  }

  try {
    const drive = google.drive({ version: 'v3', auth: getGoogleDriveAuth() });

    const meta = await drive.files.get({
      fileId: id,
      fields: 'mimeType',
    });

    const media = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'arraybuffer' },
    );

    return new NextResponse(media.data as ArrayBuffer, {
      headers: {
        'Content-Type': meta.data.mimeType ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    console.error('[drive-image]', err);
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
