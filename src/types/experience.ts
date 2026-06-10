export interface ExperienceConfig {
  question: string;
  yesLabel: string;
  noLabel: string;
  successMessage: string;
}

export const EXPERIENCE_PARAM_KEYS = {
  question: 'q',
  yesLabel: 'y',
  noLabel: 'n',
  successMessage: 's',
} as const;

export const DEFAULT_EXPERIENCE: ExperienceConfig = {
  question: 'آیا با من قرار می‌ری؟ ❤️',
  yesLabel: 'بله 💖',
  noLabel: 'نه 🙈',
  successMessage: 'هورا! ❤️\nروز من رو ساختی.',
};
