import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { HeroImage } from '@/components/media/HeroImage';
import { FadeIn } from '@/components/effects/FadeIn';
import { SlideUp } from '@/components/effects/SlideUp';
import { cn } from '@/lib/utils';
import type { LinkButton, LinkRecord } from '@/types';
import Link from 'next/link';

interface TemplateCardProps {
  link: LinkRecord;
  badge?: string;
}

function ActionButtons({ buttons }: { buttons?: LinkButton[] }) {
  if (!buttons?.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {buttons.map((btn) => (
        <Link
          key={btn.label}
          href={btn.href ?? '#'}
          className={cn(buttonVariants({ variant: btn.variant ?? 'primary' }))}
        >
          {btn.label}
        </Link>
      ))}
    </div>
  );
}

export function TemplateCard({ link, badge }: TemplateCardProps) {
  return (
    <div className="w-full space-y-8 text-center">
      {badge && (
        <FadeIn>
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
            {badge}
          </span>
        </FadeIn>
      )}

      <FadeIn delay={100}>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {link.title}
        </h1>
      </FadeIn>

      {link.subtitle && (
        <FadeIn delay={200}>
          <p className="text-lg text-white/70 sm:text-xl">{link.subtitle}</p>
        </FadeIn>
      )}

      {link.image && (
        <SlideUp delay={300}>
          <HeroImage src={link.image} alt={link.title} priority />
        </SlideUp>
      )}

      {link.message && (
        <FadeIn delay={400}>
          <Card className="mx-auto max-w-xl text-left">
            <CardHeader>
              {link.name && <CardDescription>For {link.name}</CardDescription>}
              <CardTitle className="text-lg font-normal leading-relaxed text-white/90">
                {link.message}
              </CardTitle>
            </CardHeader>
            {link.buttons && link.buttons.length > 0 && (
              <CardContent className="flex justify-center pt-2">
                <ActionButtons buttons={link.buttons} />
              </CardContent>
            )}
          </Card>
        </FadeIn>
      )}

      {!link.message && link.buttons && (
        <FadeIn delay={400}>
          <ActionButtons buttons={link.buttons} />
        </FadeIn>
      )}
    </div>
  );
}
