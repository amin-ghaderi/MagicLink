/** Love Letter template — compact URL payload keys */
export interface LoveLetterPayload {
  /** نام مخاطب */
  n: string;
  /** عنوان نامه */
  t: string;
  /** متن نامه */
  b: string;
  /** لینک عکس (اختیاری) */
  i?: string;
  /** متن دکمه پایانی */
  c: string;
}

export interface LoveLetterConfig {
  recipientName: string;
  title: string;
  body: string;
  imageUrl?: string;
  ctaLabel: string;
}

export const DEFAULT_LOVE_LETTER: LoveLetterConfig = {
  recipientName: 'عزیزم',
  title: 'نامه‌ای از ته دل 💌',
  body:
    'هر کلمه‌ای که اینجا می‌نویسم، از جایی عمیق توی دلم میاد.\n\nتو برای من فقط یک نام نیستی — توی هر روزم رنگ و معنا هستی.\n\nممنونم که هستی.',
  imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a57590ae?w=800&q=80',
  ctaLabel: 'قلب من مال توئه 💖',
};
