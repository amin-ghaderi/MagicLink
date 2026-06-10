import { fromBase64Url, toBase64Url } from '@/lib/base64url';
import {
  DEFAULT_EXPERIENCE,
  PAYLOAD_PARAM,
  type ExperienceConfig,
  type ExperiencePayload,
  type ThemeId,
} from '@/types/experience';
import { THEME_CODES, THEME_TO_CODE } from '@/lib/themes';

const MAX_FIELD_LENGTH = 300;

function isValidField(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= MAX_FIELD_LENGTH;
}

function configToPayload(config: ExperienceConfig): ExperiencePayload {
  return {
    q: config.question,
    y: config.yesLabel,
    n: config.noLabel,
    s: config.successMessage,
    t: THEME_TO_CODE[config.theme],
    r: config.seed,
  };
}

function payloadToConfig(payload: ExperiencePayload): ExperienceConfig | null {
  const theme = THEME_CODES[payload.t];
  if (
    !isValidField(payload.q) ||
    !isValidField(payload.y) ||
    !isValidField(payload.n) ||
    !isValidField(payload.s) ||
    !theme ||
    typeof payload.r !== 'number' ||
    !Number.isFinite(payload.r)
  ) {
    return null;
  }

  return {
    question: payload.q.trim(),
    yesLabel: payload.y.trim(),
    noLabel: payload.n.trim(),
    successMessage: payload.s.trim(),
    theme: theme as ThemeId,
    seed: payload.r,
  };
}

export function encodeExperience(config: ExperienceConfig): string {
  const json = JSON.stringify(configToPayload(config));
  return toBase64Url(json);
}

export function decodeExperience(encoded: string): ExperienceConfig | null {
  const json = fromBase64Url(encoded);
  if (!json) return null;

  try {
    const payload = JSON.parse(json) as ExperiencePayload;
    return payloadToConfig(payload);
  } catch {
    return null;
  }
}

export function parseExperienceParams(
  params: Record<string, string | string[] | undefined>,
): ExperienceConfig | null {
  const raw = params[PAYLOAD_PARAM];
  if (!raw || Array.isArray(raw)) return null;

  try {
    const decoded = decodeURIComponent(raw);
    return decodeExperience(decoded);
  } catch {
    return decodeExperience(raw);
  }
}

export function buildExperienceUrl(config: ExperienceConfig, baseUrl = ''): string {
  const encoded = encodeExperience(config);
  return `${baseUrl}/v?${PAYLOAD_PARAM}=${encodeURIComponent(encoded)}`;
}

export function buildDemoUrl(baseUrl = ''): string {
  return buildExperienceUrl(DEFAULT_EXPERIENCE, baseUrl);
}

export function createExperienceConfig(
  input: Omit<ExperienceConfig, 'seed'>,
): ExperienceConfig {
  const seed = Math.floor(Math.random() * 2_147_483_647);
  return { ...input, seed };
}
