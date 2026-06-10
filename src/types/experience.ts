export type ThemeId = 'romantic' | 'funny' | 'birthday' | 'proposal' | 'surprise';

export interface ExperienceConfig {
  question: string;
  yesLabel: string;
  noLabel: string;
  successMessage: string;
  theme: ThemeId;
  /** Random seed — unique per generated link for message shuffle */
  seed: number;
}

/** Compact JSON stored inside the encoded URL payload */
export interface ExperiencePayload {
  q: string;
  y: string;
  n: string;
  s: string;
  t: string;
  r: number;
}

export const PAYLOAD_PARAM = 'd';

export const DEFAULT_EXPERIENCE: ExperienceConfig = {
  question: 'آیا با من قرار می‌ری؟ ❤️',
  yesLabel: 'بله 💖',
  noLabel: 'نه 🙈',
  successMessage: 'هورا! ❤️\nروز من رو ساختی.',
  theme: 'romantic',
  seed: 42_069,
};
