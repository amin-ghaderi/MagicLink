import { NextResponse } from 'next/server';
import { validateUploadBuffer } from '@/lib/media/validateImage';
import { getStorageProvider } from '@/lib/storage/getStorageProvider';
import { MEDIA_TEMPLATE_FOLDERS, type MediaTemplateFolder } from '@/lib/storage/types';

export const runtime = 'nodejs';

const TEMPLATE_FOLDER_VALUES = new Set<string>(Object.values(MEDIA_TEMPLATE_FOLDERS));

function isValidTemplateFolder(value: string): value is MediaTemplateFolder {
  return TEMPLATE_FOLDER_VALUES.has(value);
}

function persianError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const templateFolder = formData.get('templateFolder');
    const mimeType = formData.get('mimeType');

    if (!(file instanceof Blob) || file.size === 0) {
      return persianError('فایل عکس ارسال نشد', 400);
    }

    if (typeof templateFolder !== 'string' || !isValidTemplateFolder(templateFolder)) {
      return persianError('پوشهٔ قالب نامعتبر است', 400);
    }

    const resolvedMime =
      typeof mimeType === 'string' && mimeType.startsWith('image/')
        ? mimeType
        : file.type || 'image/jpeg';

    const buffer = Buffer.from(await file.arrayBuffer());
    const validation = validateUploadBuffer(buffer, resolvedMime);
    if (!validation.ok) {
      return persianError(validation.message, 400);
    }

    const filename =
      file instanceof File && file.name ? file.name : `upload-${Date.now()}.jpg`;

    const provider = getStorageProvider();
    const result = await provider.upload({
      buffer,
      filename,
      mimeType: resolvedMime,
      templateFolder,
    });

    return NextResponse.json({
      url: result.url,
      fileId: result.fileId,
      provider: result.provider,
    });
  } catch (err) {
    console.error('[upload]', err);
    const message =
      err instanceof Error && err.message.includes('not configured')
        ? 'سیستم آپلود هنوز پیکربندی نشده است'
        : 'آپلود ناموفق بود. لطفاً دوباره تلاش کنید.';
    return persianError(message, 500);
  }
}
