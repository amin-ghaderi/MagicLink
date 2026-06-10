export interface LiveTemplate {
  id: string;
  emoji: string;
  title: string;
  description: string;
  buildHref: string;
  buildLabel: string;
  accent: 'pink' | 'rose';
}

export interface ComingSoonTemplate {
  id: string;
  emoji: string;
  title: string;
}

export const LIVE_TEMPLATES: LiveTemplate[] = [
  {
    id: 'impossible-no',
    emoji: '😂',
    title: 'نهِ غیرممکن',
    description: 'از کسی یک سؤال بپرس...\nاما اجازه نده راحت بهت نه بگه 😏',
    buildHref: '/no#generator',
    buildLabel: 'ساخت لینک',
    accent: 'pink',
  },
  {
    id: 'love-letter',
    emoji: '💌',
    title: 'نامه عاشقانه',
    description: 'یک نامه اختصاصی بساز\nو با یک لینک برایش بفرست ❤️',
    buildHref: '/love#generator',
    buildLabel: 'ساخت نامه',
    accent: 'rose',
  },
];

export const COMING_SOON_TEMPLATES: ComingSoonTemplate[] = [
  { id: 'gift-box', emoji: '🎁', title: 'جعبه هدیه' },
  { id: 'birthday', emoji: '🎂', title: 'تولد' },
  { id: 'countdown', emoji: '⏳', title: 'شمارش معکوس' },
  { id: 'secret', emoji: '🤫', title: 'پیام مخفی' },
];

export const HOW_IT_WORKS = [
  { step: '۱', icon: '🎨', title: 'قالب را انتخاب کن', desc: 'از میان تجربه‌های آماده، قالب مناسب لحظه‌ات را برگزین.' },
  { step: '۲', icon: '✏️', title: 'محتوای خودت را وارد کن', desc: 'متن، نام و جزئیات را شخصی‌سازی کن — همه‌چیز در لینک می‌ماند.' },
  { step: '۳', icon: '📤', title: 'لینک را ارسال کن', desc: 'لینک را برای کسی که دوستش داری بفرست و لحظه را بساز.' },
];

export const BENEFITS = [
  { icon: '⚡', title: 'بدون ثبت‌نام', desc: 'همین الان شروع کن — نیازی به حساب کاربری نیست.' },
  { icon: '🔒', title: 'بدون ذخیره اطلاعات', desc: 'محتوایت فقط داخل لینک است؛ هیچ دیتابیسی وجود ندارد.' },
  { icon: '📱', title: 'مناسب موبایل', desc: 'تجربه‌ها برای گوشی طراحی شده‌اند.' },
  { icon: '🚀', title: 'آماده اشتراک‌گذاری', desc: 'یک لینک — در واتساپ، تلگرام یا هر جایی که بخواهی.' },
];
