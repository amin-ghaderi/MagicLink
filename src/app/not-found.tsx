import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <PageShell gradient="slate">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 text-6xl">🔗</span>
        <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
        <p className="mb-8 max-w-md text-white/70">
          This magic link doesn&apos;t exist yet. Check the URL or add a new entry to{' '}
          <code className="rounded bg-white/10 px-2 py-0.5 text-sm">content/links.json</code>.
        </p>
        <Link href="/" className={buttonVariants()}>
          Back to home
        </Link>
      </div>
    </PageShell>
  );
}
