import Link from 'next/link';
import { FadeIn } from '@/components/effects/FadeIn';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageShell } from '@/components/layout/PageShell';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BENEFITS,
  COMING_SOON_TEMPLATES,
  HOW_IT_WORKS,
  LIVE_TEMPLATES,
} from '@/data/platformTemplates';
import { buildDemoUrl } from '@/lib/linkParams';
import { buildLoveLetterDemoUrl } from '@/lib/templates/loveLetterParams';
import { cn } from '@/lib/utils';

const ACCENT_STYLES = {
  pink: {
    card: 'border-pink-300/25 bg-gradient-to-bl from-pink-500/15 via-purple-500/10 to-violet-600/15 hover:border-pink-300/40',
    emoji: 'bg-pink-500/20',
    button: 'from-pink-500 to-violet-600 shadow-pink-500/25 hover:from-pink-400 hover:to-violet-500',
  },
  rose: {
    card: 'border-rose-300/25 bg-gradient-to-bl from-rose-500/15 via-pink-500/10 to-violet-600/15 hover:border-rose-300/40',
    emoji: 'bg-rose-500/20',
    button: 'from-rose-500 to-pink-600 shadow-rose-500/25 hover:from-rose-400 hover:to-pink-500',
  },
} as const;

export function PlatformHome() {
  const demoUrls: Record<string, string> = {
    'impossible-no': buildDemoUrl(),
    'love-letter': buildLoveLetterDemoUrl(),
  };

  return (
    <PageShell gradient="violet">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <section className="relative py-16 text-center sm:py-24 md:py-28">
          <FadeIn>
            <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-64 max-w-lg rounded-full bg-violet-500/20 blur-3xl" />
          </FadeIn>
          <FadeIn>
            <h1 className="relative mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              لحظه‌ساز{' '}
              <span className="inline-block animate-pulse" aria-hidden>
                ✨
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="relative mx-auto mb-4 max-w-2xl text-xl leading-relaxed text-white/85 sm:text-2xl">
              برای آدم‌هایی که می‌خواهند
              <br />
              یک لحظهٔ خاص خلق کنند.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="relative mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              لینک‌های تعاملی، عاشقانه و بامزه
              <br />
              بدون ثبت‌نام و بدون نصب.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="relative flex flex-wrap justify-center gap-4">
              <a href="#templates" className={cn(buttonVariants({ size: 'lg' }))}>
                مشاهده قالب‌ها
              </a>
              <a
                href="#templates"
                className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
              >
                ساخت اولین لینک
              </a>
            </div>
          </FadeIn>
        </section>

        {/* Available templates */}
        <section id="templates" className="scroll-mt-20 py-12 sm:py-16">
          <FadeIn>
            <h2 className="mb-3 text-center text-3xl font-bold sm:text-4xl">قالب‌های آماده</h2>
            <p className="mb-10 text-center text-white/60">یکی را انتخاب کن و لینک اختصاصی بساز</p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {LIVE_TEMPLATES.map((template, i) => {
              const styles = ACCENT_STYLES[template.accent];
              const demoUrl = demoUrls[template.id];

              return (
                <FadeIn key={template.id} delay={i * 100}>
                  <Card
                    className={cn(
                      'h-full transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/30',
                      styles.card,
                    )}
                  >
                    <CardHeader className="space-y-4 pb-4">
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl',
                            styles.emoji,
                          )}
                        >
                          {template.emoji}
                        </span>
                        <div className="text-right">
                          <CardTitle className="text-2xl">{template.title}</CardTitle>
                          <CardDescription className="mt-2 whitespace-pre-line text-base leading-relaxed text-white/70">
                            {template.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3 pt-0">
                      <Link
                        href={template.buildHref}
                        className={cn(
                          buttonVariants({ size: 'lg' }),
                          'bg-gradient-to-l text-base',
                          styles.button,
                        )}
                      >
                        {template.buildLabel}
                      </Link>
                      <Link
                        href={demoUrl}
                        className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
                      >
                        مشاهده نمونه
                      </Link>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Coming soon */}
        <section className="py-12 sm:py-16">
          <FadeIn>
            <h2 className="mb-3 text-center text-2xl font-semibold text-white/80 sm:text-3xl">
              به زودی
            </h2>
            <p className="mb-8 text-center text-sm text-white/50">قالب‌های جدید در راه‌اند</p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {COMING_SOON_TEMPLATES.map((template, i) => (
              <FadeIn key={template.id} delay={i * 80}>
                <Card className="border-white/5 bg-white/5 opacity-60">
                  <CardHeader className="items-center text-center">
                    <span className="mb-2 text-3xl grayscale">{template.emoji}</span>
                    <CardTitle className="text-base font-medium text-white/70">
                      {template.title}
                    </CardTitle>
                    <span className="mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                      به زودی
                    </span>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 sm:py-16">
          <FadeIn>
            <h2 className="mb-10 text-center text-3xl font-bold">چطور کار می‌کند؟</h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 100}>
                <Card className="h-full border-violet-300/15 bg-white/5 text-center">
                  <CardHeader>
                    <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-2xl">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium text-violet-300">{item.step}</span>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-white/60">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* About / Benefits */}
        <section id="about" className="scroll-mt-20 py-12 sm:py-16">
          <FadeIn>
            <h2 className="mb-3 text-center text-3xl font-bold">چرا لحظه‌ساز؟</h2>
            <p className="mb-10 text-center text-white/60">ساده، امن و آمادهٔ اشتراک</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 80}>
                <Card className="h-full border-violet-300/15 bg-gradient-to-bl from-violet-500/10 to-transparent text-center">
                  <CardHeader>
                    <span className="mx-auto mb-2 text-3xl">{benefit.icon}</span>
                    <CardTitle className="text-base">{benefit.title}</CardTitle>
                    <CardDescription className="text-sm text-white/60">
                      {benefit.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 text-center">
          <p className="mb-2 text-lg font-semibold text-white/90">لحظه‌ساز</p>
          <p className="text-sm leading-relaxed text-white/50">
            خلق لحظه‌های کوچک
            <br />
            برای آدم‌های مهم زندگی.
          </p>
        </footer>
      </div>
    </PageShell>
  );
}
