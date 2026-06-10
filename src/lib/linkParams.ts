import {
  DEFAULT_EXPERIENCE,
  EXPERIENCE_PARAM_KEYS,
  type ExperienceConfig,
} from '@/types/experience';

const MAX_FIELD_LENGTH = 300;

function decodeParam(value: string | string[] | undefined): string | null {
  if (!value || Array.isArray(value)) return null;
  try {
    const decoded = decodeURIComponent(value).trim();
    return decoded.length > 0 && decoded.length <= MAX_FIELD_LENGTH ? decoded : null;
  } catch {
    return null;
  }
}

export function parseExperienceParams(
  params: Record<string, string | string[] | undefined>,
): ExperienceConfig | null {
  const question = decodeParam(params[EXPERIENCE_PARAM_KEYS.question]);
  const yesLabel = decodeParam(params[EXPERIENCE_PARAM_KEYS.yesLabel]);
  const noLabel = decodeParam(params[EXPERIENCE_PARAM_KEYS.noLabel]);
  const successMessage = decodeParam(params[EXPERIENCE_PARAM_KEYS.successMessage]);

  if (!question || !yesLabel || !noLabel || !successMessage) {
    return null;
  }

  return { question, yesLabel, noLabel, successMessage };
}

export function buildExperienceUrl(
  config: ExperienceConfig,
  baseUrl = '',
): string {
  const search = new URLSearchParams({
    [EXPERIENCE_PARAM_KEYS.question]: config.question,
    [EXPERIENCE_PARAM_KEYS.yesLabel]: config.yesLabel,
    [EXPERIENCE_PARAM_KEYS.noLabel]: config.noLabel,
    [EXPERIENCE_PARAM_KEYS.successMessage]: config.successMessage,
  });

  return `${baseUrl}/v?${search.toString()}`;
}

export function buildDemoUrl(baseUrl = ''): string {
  return buildExperienceUrl(DEFAULT_EXPERIENCE, baseUrl);
}
