import type { ThemeId } from '@/types/experience';

export interface ThemeDefinition {
  id: ThemeId;
  code: string;
  label: string;
  emoji: string;
  /** Page background gradient classes */
  pageGradient: string;
  /** Radial glow overlay */
  glow: string;
  /** Card surface */
  card: string;
  /** Question title gradient */
  titleGradient: string;
  /** YES button */
  yesButton: string;
  /** NO button */
  noButton: string;
  /** Taunt text color */
  tauntText: string;
  /** Success card */
  successCard: string;
  /** Success celebration emoji */
  successEmoji: string;
  /** Ambient decoration type */
  decoration: 'hearts' | 'confetti' | 'sparkles' | 'stars' | 'gifts';
  /** Effect on YES click */
  celebration: 'hearts' | 'confetti' | 'both';
}

export const THEME_CODES: Record<string, ThemeId> = {
  a: 'romantic',
  f: 'funny',
  b: 'birthday',
  p: 'proposal',
  s: 'surprise',
};

export const THEME_TO_CODE: Record<ThemeId, string> = {
  romantic: 'a',
  funny: 'f',
  birthday: 'b',
  proposal: 'p',
  surprise: 's',
};

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  romantic: {
    id: 'romantic',
    code: 'a',
    label: 'عاشقانه',
    emoji: '❤️',
    pageGradient: 'from-rose-950 via-pink-900 to-purple-950',
    glow: 'from-pink-400/20 via-rose-400/10 to-transparent',
    card: 'border-pink-300/25 bg-gradient-to-bl from-pink-500/20 via-rose-500/15 to-purple-600/20 shadow-pink-900/25',
    titleGradient: 'from-pink-100 via-rose-50 to-purple-200',
    yesButton:
      'bg-gradient-to-l from-pink-500 to-rose-600 shadow-pink-500/35 hover:from-pink-400 hover:to-rose-500',
    noButton: 'border-pink-300/30 bg-pink-500/20 hover:bg-pink-500/30',
    tauntText: 'text-pink-200',
    successCard:
      'border-pink-300/30 bg-gradient-to-bl from-pink-500/30 via-rose-500/20 to-purple-600/25 shadow-pink-500/25',
    successEmoji: '💖',
    decoration: 'hearts',
    celebration: 'both',
  },
  funny: {
    id: 'funny',
    code: 'f',
    label: 'شوخی',
    emoji: '😂',
    pageGradient: 'from-amber-950 via-orange-900 to-yellow-900',
    glow: 'from-amber-400/20 via-yellow-400/10 to-transparent',
    card: 'border-amber-300/25 bg-gradient-to-bl from-amber-500/20 via-orange-500/15 to-yellow-600/15 shadow-amber-900/25',
    titleGradient: 'from-amber-100 via-yellow-50 to-orange-200',
    yesButton:
      'bg-gradient-to-l from-amber-500 to-orange-500 shadow-amber-500/35 hover:from-amber-400 hover:to-orange-400',
    noButton: 'border-amber-300/30 bg-amber-500/20 hover:bg-amber-500/30',
    tauntText: 'text-amber-100',
    successCard:
      'border-amber-300/30 bg-gradient-to-bl from-amber-500/30 via-orange-500/20 to-yellow-600/20 shadow-amber-500/25',
    successEmoji: '😂',
    decoration: 'confetti',
    celebration: 'confetti',
  },
  birthday: {
    id: 'birthday',
    code: 'b',
    label: 'تولد',
    emoji: '🎂',
    pageGradient: 'from-fuchsia-950 via-purple-900 to-pink-950',
    glow: 'from-fuchsia-400/20 via-pink-400/10 to-transparent',
    card: 'border-fuchsia-300/25 bg-gradient-to-bl from-fuchsia-500/20 via-purple-500/15 to-pink-600/20 shadow-fuchsia-900/25',
    titleGradient: 'from-fuchsia-100 via-pink-50 to-purple-200',
    yesButton:
      'bg-gradient-to-l from-fuchsia-500 to-purple-600 shadow-fuchsia-500/35 hover:from-fuchsia-400 hover:to-purple-500',
    noButton: 'border-fuchsia-300/30 bg-fuchsia-500/20 hover:bg-fuchsia-500/30',
    tauntText: 'text-fuchsia-200',
    successCard:
      'border-fuchsia-300/30 bg-gradient-to-bl from-fuchsia-500/30 via-purple-500/20 to-pink-600/25 shadow-fuchsia-500/25',
    successEmoji: '🎂',
    decoration: 'confetti',
    celebration: 'both',
  },
  proposal: {
    id: 'proposal',
    code: 'p',
    label: 'خواستگاری',
    emoji: '💍',
    pageGradient: 'from-violet-950 via-indigo-900 to-purple-950',
    glow: 'from-violet-400/20 via-indigo-400/10 to-transparent',
    card: 'border-violet-300/25 bg-gradient-to-bl from-violet-500/20 via-indigo-500/15 to-purple-600/20 shadow-violet-900/25',
    titleGradient: 'from-violet-100 via-indigo-50 to-purple-200',
    yesButton:
      'bg-gradient-to-l from-violet-500 to-indigo-600 shadow-violet-500/35 hover:from-violet-400 hover:to-indigo-500',
    noButton: 'border-violet-300/30 bg-violet-500/20 hover:bg-violet-500/30',
    tauntText: 'text-violet-200',
    successCard:
      'border-violet-300/30 bg-gradient-to-bl from-violet-500/30 via-indigo-500/20 to-purple-600/25 shadow-violet-500/25',
    successEmoji: '💍',
    decoration: 'stars',
    celebration: 'hearts',
  },
  surprise: {
    id: 'surprise',
    code: 's',
    label: 'سورپرایز',
    emoji: '🎁',
    pageGradient: 'from-teal-950 via-cyan-900 to-blue-950',
    glow: 'from-teal-400/20 via-cyan-400/10 to-transparent',
    card: 'border-teal-300/25 bg-gradient-to-bl from-teal-500/20 via-cyan-500/15 to-blue-600/20 shadow-teal-900/25',
    titleGradient: 'from-teal-100 via-cyan-50 to-blue-200',
    yesButton:
      'bg-gradient-to-l from-teal-500 to-cyan-600 shadow-teal-500/35 hover:from-teal-400 hover:to-cyan-500',
    noButton: 'border-teal-300/30 bg-teal-500/20 hover:bg-teal-500/30',
    tauntText: 'text-teal-200',
    successCard:
      'border-teal-300/30 bg-gradient-to-bl from-teal-500/30 via-cyan-500/20 to-blue-600/25 shadow-teal-500/25',
    successEmoji: '🎁',
    decoration: 'gifts',
    celebration: 'both',
  },
};

export const THEME_LIST = Object.values(THEMES);

export function getTheme(id: ThemeId): ThemeDefinition {
  return THEMES[id];
}
