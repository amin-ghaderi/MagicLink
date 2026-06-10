import {
  buildTemplateUrl,
  decodePayload,
  encodePayload,
  parsePayloadParam,
} from '@/lib/payloadCodec';
import type { LoveLetterConfig, LoveLetterPayload } from '@/types/loveLetter';
import { DEFAULT_LOVE_LETTER } from '@/types/loveLetter';

const MAX_SHORT = 200;
const MAX_BODY = 2500;
const MAX_IMAGE_URL = 500;

const EXPERIENCE_PATH = '/love/v';

function isValidShort(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= MAX_SHORT;
}

function isValidBody(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= MAX_BODY;
}

function isValidImageUrl(value: unknown): value is string | undefined {
  if (value === undefined || value === '') return true;
  if (typeof value !== 'string') return false;
  if (value.length > MAX_IMAGE_URL) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function configToPayload(config: LoveLetterConfig): LoveLetterPayload {
  const payload: LoveLetterPayload = {
    n: config.recipientName.trim(),
    t: config.title.trim(),
    b: config.body.trim(),
    c: config.ctaLabel.trim(),
  };
  if (config.imageUrl?.trim()) {
    payload.i = config.imageUrl.trim();
  }
  return payload;
}

function payloadToConfig(payload: LoveLetterPayload): LoveLetterConfig | null {
  if (
    !isValidShort(payload.n) ||
    !isValidShort(payload.t) ||
    !isValidBody(payload.b) ||
    !isValidShort(payload.c) ||
    !isValidImageUrl(payload.i)
  ) {
    return null;
  }

  return {
    recipientName: payload.n.trim(),
    title: payload.t.trim(),
    body: payload.b.trim(),
    ctaLabel: payload.c.trim(),
    imageUrl: payload.i?.trim() || undefined,
  };
}

function isValidPayload(payload: LoveLetterPayload): boolean {
  return payloadToConfig(payload) !== null;
}

export function encodeLoveLetter(config: LoveLetterConfig): string {
  return encodePayload(configToPayload(config));
}

export function decodeLoveLetter(encoded: string): LoveLetterConfig | null {
  const payload = decodePayload<LoveLetterPayload>(encoded);
  if (!payload) return null;
  return payloadToConfig(payload);
}

export function parseLoveLetterParams(
  params: Record<string, string | string[] | undefined>,
): LoveLetterConfig | null {
  const payload = parsePayloadParam<LoveLetterPayload>(params, isValidPayload);
  if (!payload) return null;
  return payloadToConfig(payload);
}

export function buildLoveLetterUrl(config: LoveLetterConfig, baseUrl = ''): string {
  return buildTemplateUrl(EXPERIENCE_PATH, configToPayload(config), baseUrl);
}

export function buildLoveLetterDemoUrl(baseUrl = ''): string {
  return buildLoveLetterUrl(DEFAULT_LOVE_LETTER, baseUrl);
}
