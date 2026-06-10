import { SiteFooter } from '@/components/layout/SiteFooter';
import { cn } from '@/lib/utils';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'violet' | 'rose' | 'amber' | 'sky' | 'indigo' | 'slate';
  /** Show full legal footer on marketing pages */
  showFooter?: boolean;
}

const gradients = {
  violet: 'from-violet-950 via-purple-900 to-indigo-950',
  rose: 'from-rose-950 via-pink-900 to-purple-950',
  amber: 'from-amber-950 via-orange-900 to-rose-950',
  sky: 'from-sky-950 via-blue-900 to-indigo-950',
  indigo: 'from-indigo-950 via-violet-900 to-purple-950',
  slate: 'from-slate-950 via-slate-900 to-violet-950',
};

export function PageShell({
  children,
  className,
  gradient = 'violet',
  showFooter = false,
}: PageShellProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen flex-col bg-gradient-to-br text-white',
        gradients[gradient],
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex-1">{children}</div>
        {showFooter && <SiteFooter />}
      </div>
    </div>
  );
}
