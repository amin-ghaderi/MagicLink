const TIER_1 = [
  'ولش کن 😏',
  'تقریباً گرفتمت!',
  'نه دیگه 🙈',
  'دوباره امتحان کن 🤭',
  'نشد که نشد 😄',
];

const TIER_2 = [
  'هنوز ادامه داری؟ 😂',
  'دکمهٔ نه فراریه!',
  'جواب فقط بله‌ست ❤️',
  'خیلی سمجتی!',
  'نه گفتن سخته، نه؟ 😆',
];

const TIER_3 = [
  'دیگه قبول کن دیگه 😆',
  'اینقدر نه نگو!',
  'خسته شدم فرار کنم 🤭',
  'فقط بله رو بزن دیگه!',
  'دیگه بسه دیگه 😂',
  'تو برنده شدی، من فرارم! 🏃',
];

const FINAL_MESSAGE = 'این دیگه زیاده! فقط بله رو بزن 😆';

function pickRandom(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

/** Returns a taunt message; humor escalates with each escape. */
export function getPersianTauntMessage(escapeCount: number): string {
  if (escapeCount >= 8) return FINAL_MESSAGE;
  if (escapeCount >= 5) return pickRandom(TIER_3);
  if (escapeCount >= 3) return pickRandom(TIER_2);
  return pickRandom(TIER_1);
}
