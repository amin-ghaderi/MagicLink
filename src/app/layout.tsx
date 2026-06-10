import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'لحظه‌ساز — لینک‌های تعاملی و شخصی',
  description:
    'لینک‌های تعاملی، عاشقانه و بامزه بساز و بفرست. بدون ثبت‌نام، بدون نصب، بدون ذخیره‌سازی.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
