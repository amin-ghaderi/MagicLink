import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalSection } from '@/components/layout/LegalSection';
import { PageShell } from '@/components/layout/PageShell';
import { SiteHeader } from '@/components/layout/SiteHeader';
import {
  CONTACT_INFO,
  COPYRIGHT_NOTICE,
  IP_NOTICE,
  LEGAL_BRAND,
  LEGAL_BRAND_FA,
  LEGAL_OWNER,
  OWNERSHIP_STATEMENT,
  PRIVACY_POLICY,
  TERMS_OF_USE,
} from '@/content/legal';

export const metadata: Metadata = {
  title: 'حقوقی و مالکیت — لحظه‌ساز',
  description:
    'Copyright notice, intellectual property, terms of use, and ownership information for LahzeSaz (لحظه‌ساز) by Amin Ghaderi.',
  robots: { index: true, follow: true },
};

const TOC = [
  { id: 'copyright', label: 'Copyright Notice' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'terms', label: 'Terms of Use' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'ownership', label: 'Ownership Statement' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function LegalPage() {
  return (
    <PageShell gradient="slate" showFooter>
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12 border-b border-white/10 pb-10">
          <p className="mb-2 text-sm text-white/50" dir="ltr">
            {LEGAL_BRAND} / {LEGAL_BRAND_FA}
          </p>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">اسناد حقوقی و مالکیت</h1>
          <p className="text-white/60">
            اطلاعات حقوقی، مالکیت فکری و شرایط استفاده از پلتفرم لحظه‌ساز.
          </p>
        </header>

        <nav className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold text-white/70">فهرست</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {TOC.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-violet-300/90 transition-colors hover:text-violet-200"
                  dir="ltr"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          <LegalSection id="copyright" title="اطلاعیهٔ کپی‌رایت" titleEn="Copyright Notice">
            <span dir="ltr">{COPYRIGHT_NOTICE}</span>
          </LegalSection>

          <LegalSection
            id="ip"
            title="اطلاعیهٔ مالکیت فکری"
            titleEn="Intellectual Property Notice"
          >
            <span dir="ltr">{IP_NOTICE}</span>
          </LegalSection>

          <LegalSection id="terms" title="شرایط استفاده" titleEn="Terms of Use">
            <span dir="ltr">{TERMS_OF_USE}</span>
          </LegalSection>

          <LegalSection id="privacy" title="حریم خصوصی" titleEn="Privacy Policy">
            <span dir="ltr">{PRIVACY_POLICY}</span>
          </LegalSection>

          <LegalSection id="ownership" title="بیانیهٔ مالکیت" titleEn="Ownership Statement">
            <span dir="ltr">{OWNERSHIP_STATEMENT}</span>
          </LegalSection>

          <LegalSection id="contact" title="اطلاعات تماس" titleEn="Contact Information">
            <span dir="ltr">{CONTACT_INFO}</span>
          </LegalSection>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <Link href="/" className="text-sm text-violet-300/90 hover:text-violet-200">
            ← بازگشت به لحظه‌ساز
          </Link>
          <p className="mt-6 text-xs text-white/35" dir="ltr">
            Crafted with care by {LEGAL_OWNER}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
