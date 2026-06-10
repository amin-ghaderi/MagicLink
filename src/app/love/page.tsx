import Link from 'next/link';
import { FadeIn } from '@/components/effects/FadeIn';
import { LoveLetterForm } from '@/components/love/LoveLetterForm';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PageShell } from '@/components/layout/PageShell';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildLoveLetterDemoUrl } from '@/lib/templates/loveLetterParams';
import { cn } from '@/lib/utils';

const STEPS = [
  { step: '۱', title: 'نامه‌ات را بنویس', desc: 'نام، عنوان، متن و دکمهٔ پایانی را وارد کن.' },
  { step: '۲', title: 'لینک بساز', desc: 'همه‌چیز داخل یک URL کوتاه رمزگذاری می‌شود.' },
  { step: '۳', title: 'بفرست با عشق', desc: 'لینک را بفرست و منتظر لحظهٔ خاص بمان.' },
];

export default function LoveLetterLandingPage() {
  const demoUrl = buildLoveLetterDemoUrl();

  return (
    <PageShell gradient="rose">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
        <section className="mb-16 text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full border border-rose-300/30 bg-rose-500/15 px-4 py-1.5 text-sm font-medium text-rose-100">
              💌 نامه عاشقانه
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              نامه‌ای که
              <span className="bg-gradient-to-l from-rose-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">
                {' '}
                از دل میاد
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/75">
              یک نامهٔ دیجیتال شخصی بساز — با انیمیشن، عکس و دکمهٔ پایانی. فقط یک لینک
              بفرست و احساساتت را منتقل کن.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={demoUrl} className={cn(buttonVariants({ size: 'lg' }))}>
                مشاهدهٔ نمونه
              </Link>
              <Link
                href="#generator"
                className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
              >
                ساخت نامه
              </Link>
            </div>
          </FadeIn>
        </section>

        <section className="mb-16">
          <FadeIn delay={100}>
            <Card className="border-rose-300/20 bg-gradient-to-bl from-rose-500/10 via-pink-500/8 to-violet-600/10">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">نمونهٔ تجربه</CardTitle>
                <CardDescription>
                  عنوان متحرک، متن تدریجی، عکس و جشن پایانی
                </CardDescription>
              </CardHeader>
            </Card>
          </FadeIn>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-semibold">چطور کار می‌کند؟</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {STEPS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 100}>
                <Card className="h-full text-center">
                  <CardHeader>
                    <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/25 text-sm font-bold text-rose-200">
                      {item.step}
                    </span>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <FadeIn>
            <LoveLetterForm />
          </FadeIn>
        </section>

        <footer className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <Link href="/" className="text-rose-300/80 hover:text-rose-200">
            ← بازگشت به لحظه‌ساز
          </Link>
        </footer>
      </div>
    </PageShell>
  );
}
