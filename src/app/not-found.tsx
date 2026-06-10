import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <PageShell gradient="slate" showFooter>
      <SiteHeader />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <span className="mb-4 text-6xl">🔗</span>
        <h1 className="mb-4 text-3xl font-bold">صفحه پیدا نشد</h1>
        <p className="mb-8 max-w-md text-white/70">
          این لینک معتبر نیست یا پارامترهایش ناقص است. از لحظه‌ساز یک لینک جدید بسازید.
        </p>
        <Link href="/" className={buttonVariants()}>
          بازگشت به خانه
        </Link>
      </div>
    </PageShell>
  );
}
