import { cn } from '@/lib/utils';

interface LegalSectionProps {
  id: string;
  title: string;
  titleEn?: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalSection({ id, title, titleEn, children, className }: LegalSectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <div className="mb-4 flex flex-wrap items-baseline gap-3">
        <h2 className="text-xl font-semibold text-white/90 sm:text-2xl">{title}</h2>
        {titleEn && (
          <span className="text-sm text-white/40" dir="ltr">
            {titleEn}
          </span>
        )}
      </div>
      <div className="whitespace-pre-line text-sm leading-relaxed text-white/60 sm:text-base">
        {children}
      </div>
    </section>
  );
}
