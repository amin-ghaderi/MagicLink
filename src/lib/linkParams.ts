import {
  buildTemplateUrl,
  decodePayload,
  encodePayload,
  parsePayloadParam,
  PAYLOAD_PARAM,
} from '@/lib/payloadCodec';
import {
  DEFAULT_EXPERIENCE,
  type ExperienceConfig,
  type ExperiencePayload,
  type ThemeId,
} from '@/types/experience';
import { THEME_CODES, THEME_TO_CODE } from '@/lib/themes';

const MAX_FIELD_LENGTH = 300;

const EXPERIENCE_PATH = '/v';

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

function isValidPayload(payload: ExperiencePayload): boolean {
  return payloadToConfig(payload) !== null;
}

export { PAYLOAD_PARAM };

export function encodeExperience(config: ExperienceConfig): string {
  return encodePayload(configToPayload(config));
}

export function decodeExperience(encoded: string): ExperienceConfig | null {
  const payload = decodePayload<ExperiencePayload>(encoded);
  if (!payload) return null;
  return payloadToConfig(payload);
}

export function parseExperienceParams(
  params: Record<string, string | string[] | undefined>,
): ExperienceConfig | null {
  const payload = parsePayloadParam<ExperiencePayload>(params, isValidPayload);
  if (!payload) return null;
  return payloadToConfig(payload);
}

export function buildExperienceUrl(config: ExperienceConfig, baseUrl = ''): string {
  return buildTemplateUrl(EXPERIENCE_PATH, configToPayload(config), baseUrl);
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
