import Link from 'next/link';
import {
  COPYRIGHT_NOTICE,
  IP_NOTICE,
  LEGAL_BRAND,
  LEGAL_BRAND_FA,
  LEGAL_OWNER,
  LEGAL_YEAR,
} from '@/content/legal';
import { cn } from '@/lib/utils';

const FOOTER_LINKS = [
  { href: '/#about', label: 'درباره محصول' },
  { href: '/legal#privacy', label: 'حریم خصوصی' },
  { href: '/legal#terms', label: 'شرایط استفاده' },
  { href: '/legal', label: 'حقوقی' },
  { href: '/legal#contact', label: 'تماس' },
] as const;

interface SiteFooterProps {
  className?: string;
  compact?: boolean;
}

export function SiteFooter({ className, compact = false }: SiteFooterProps) {
  if (compact) {
    return (
      <footer
        className={cn(
          'border-t border-white/10 bg-black/20 px-4 py-3 text-center backdrop-blur-sm',
          className,
        )}
      >
        <p className="text-xs text-white/45" dir="ltr">
          © {LEGAL_YEAR} {LEGAL_BRAND} ·{' '}
          <Link href="/legal" className="text-white/60 underline-offset-2 hover:text-white/80 hover:underline">
            Legal
          </Link>
        </p>
      </footer>
    );
  }

  return (
    <footer className={cn('border-t border-white/10 bg-black/25 backdrop-blur-md', className)}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        {/* Brand + nav */}
        <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block text-xl font-bold text-white">
              {LEGAL_BRAND_FA} <span className="text-violet-300">✨</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              خلق لحظه‌های کوچک برای آدم‌های مهم زندگی — لینک‌های تعاملی، شخصی و آمادهٔ
              اشتراک.
            </p>
            <p className="text-xs text-white/40" dir="ltr">
              {LEGAL_BRAND}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-white/80">پیوندها</h3>
            <nav className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 transition-colors hover:text-white/90"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-white/80" dir="ltr">
              Copyright
            </h3>
            <p className="whitespace-pre-line text-xs leading-relaxed text-white/50" dir="ltr">
              {COPYRIGHT_NOTICE}
            </p>
          </div>
        </div>

        <div className="mb-10 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent" />

        {/* IP notice */}
        <div className="mb-10 rounded-2xl border border-white/8 bg-white/5 p-6 sm:p-8">
          <h3 className="mb-4 text-sm font-semibold text-white/75" dir="ltr">
            Intellectual Property Notice
          </h3>
          <p className="text-xs leading-relaxed text-white/45 sm:text-sm" dir="ltr">
            {IP_NOTICE}
          </p>
          <Link
            href="/legal"
            className="mt-4 inline-block text-xs text-violet-300/90 transition-colors hover:text-violet-200"
          >
            مطالعهٔ کامل اسناد حقوقی ←
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-center text-xs text-white/40 sm:text-right" dir="ltr">
            © {LEGAL_YEAR} {LEGAL_BRAND}. All rights reserved.
          </p>
          <p className="text-center text-xs text-white/35" dir="ltr">
            Crafted with care by {LEGAL_OWNER}
          </p>
        </div>
      </div>
    </footer>
  );
}
