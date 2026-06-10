import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'نهِ غیرممکن — لینک‌های تعاملی و شخصی',
  description:
    'سوال خود را بپرسید، دکمهٔ نه فرار کند، و فقط «بله» جواب ممکن باشد. بدون ثبت‌نام، بدون ذخیره‌سازی.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
