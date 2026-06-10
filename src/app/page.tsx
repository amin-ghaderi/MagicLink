import Link from 'next/link';
import { FadeIn } from '@/components/effects/FadeIn';
import { LinkGeneratorForm } from '@/components/landing/LinkGeneratorForm';
import { PageShell } from '@/components/layout/PageShell';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildDemoUrl } from '@/lib/linkParams';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    step: '۱',
    title: 'سوالت را بنویس',
    desc: 'سوال، متن دکمه‌ها و پیام موفقیت را وارد کن.',
  },
  {
    step: '۲',
    title: 'لینک بساز',
    desc: 'با یک کلیک لینک کوتاه می‌گیری — همه‌چیز داخل یک پارامتر رمزگذاری‌شده است.',
  },
  {
    step: '۳',
    title: 'بفرست و لذت ببر',
    desc: 'لینک را بفرست. دکمهٔ «نه» فرار می‌کند تا «بله» بزنند!',
  },
];

export default function HomePage() {
  const demoUrl = buildDemoUrl();

  return (
    <PageShell gradient="rose">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
        {/* Hero */}
        <section className="mb-16 text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full border border-pink-300/30 bg-pink-500/15 px-4 py-1.5 text-sm font-medium text-pink-100">
              ✨ نهِ غیرممکن
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              وقتی «نه»
              <span className="bg-gradient-to-l from-pink-300 via-purple-300 to-violet-400 bg-clip-text text-transparent">
                {' '}
                غیرممکنه
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/75">
              لینک‌های تعاملی و بامزه بساز — برای قرار، تولد، پیشنهاد، یا هر سوالی که
              دوست داری فقط یک جواب داشته باشه:{' '}
              <strong className="text-pink-200">بله!</strong>
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
                ساخت لینک
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* Demo preview card */}
        <section className="mb-16">
          <FadeIn delay={100}>
            <Card className="overflow-hidden border-pink-300/20 bg-gradient-to-bl from-pink-500/15 via-purple-500/10 to-violet-600/15">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">نمونهٔ تجربه</CardTitle>
                <CardDescription>
                  سوال، دکمهٔ فراری «نه»، پیام‌های بامزه، و جشن «بله»
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-8 text-center">
                <p className="mb-6 text-2xl font-bold text-pink-100">
                  {`آیا با من قرار می‌ری؟ ❤️`}
                </p>
                <div className="mb-6 flex justify-center gap-4">
                  <span className={cn(buttonVariants({ size: 'lg' }), 'pointer-events-none')}>
                    بله 💖
                  </span>
                  <span
                    className={cn(
                      buttonVariants({ size: 'lg', variant: 'secondary' }),
                      'pointer-events-none opacity-70',
                    )}
                  >
                    نه 🙈
                  </span>
                </div>
                <p className="text-sm text-pink-200/60">دکمهٔ «نه» فرار می‌کند — امتحان کن!</p>
                <Link
                  href={demoUrl}
                  className={cn(buttonVariants({ variant: 'ghost' }), 'mt-4 inline-flex')}
                >
                  باز کردن نمونه ←
                </Link>
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-semibold">چطور کار می‌کند؟</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {STEPS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 100}>
                <Card className="h-full text-center">
                  <CardHeader>
                    <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/25 text-sm font-bold text-violet-200">
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

        {/* Generator form */}
        <section className="mb-12">
          <FadeIn>
            <LinkGeneratorForm />
          </FadeIn>
        </section>

        <footer className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          نهِ غیرممکن — بدون دیتابیس، بدون ثبت‌نام. فقط لینک و لبخند.
        </footer>
      </div>
    </PageShell>
  );
}
