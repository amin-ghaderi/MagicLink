import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <PageShell gradient="slate">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
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
