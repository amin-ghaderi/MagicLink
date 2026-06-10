import { fromBase64Url, toBase64Url } from '@/lib/base64url';

export const PAYLOAD_PARAM = 'd';

export function encodePayload<T extends object>(payload: T): string {
  return toBase64Url(JSON.stringify(payload));
}

export function decodePayload<T>(encoded: string): T | null {
  const json = fromBase64Url(encoded);
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function parsePayloadParam<T extends object>(
  params: Record<string, string | string[] | undefined>,
  validate: (payload: T) => boolean,
): T | null {
  const raw = params[PAYLOAD_PARAM];
  if (!raw || Array.isArray(raw)) return null;

  const tryDecode = (value: string): T | null => {
    const payload = decodePayload<T>(value);
    if (!payload || !validate(payload)) return null;
    return payload;
  };

  try {
    return tryDecode(decodeURIComponent(raw));
  } catch {
    return tryDecode(raw);
  }
}

export function buildTemplateUrl(path: string, payload: object, baseUrl = ''): string {
  const encoded = encodePayload(payload);
  return `${baseUrl}${path}?${PAYLOAD_PARAM}=${encodeURIComponent(encoded)}`;
}
