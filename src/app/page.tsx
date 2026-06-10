import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAllLinks, getAllTemplates } from '@/lib/contentLoader';
import { FadeIn } from '@/components/effects/FadeIn';

export default function HomePage() {
  const links = getAllLinks();
  const templates = getAllTemplates();

  return (
    <PageShell gradient="slate">
      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <section className="mb-20 text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-violet-500/20 px-4 py-1.5 text-sm font-medium text-violet-300">
              ✨ Magic Link
            </span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
              Personalized pages,
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                one magical link
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
              Magic Link is a lightweight platform for creating beautiful interactive web
              experiences — date invitations, birthday surprises, greetings, and more. Every page
              is driven by a simple JSON file and shared via a unique URL.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/homa" className={cn(buttonVariants({ size: 'lg' }))}>
                View sample page
              </Link>
              <Link
                href="#samples"
                className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}
              >
                Browse all samples
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Add to JSON',
                desc: 'Define your page in content/links.json with a slug, template, and content.',
              },
              {
                step: '2',
                title: 'Push to GitHub',
                desc: 'Commit your changes. Vercel automatically deploys on every push.',
              },
              {
                step: '3',
                title: 'Share the link',
                desc: 'Send your unique URL — like /sara-birthday — to anyone, anywhere.',
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 100}>
                <Card className="h-full">
                  <CardHeader>
                    <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">
                      {item.step}
                    </span>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Templates */}
        <section className="mb-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">Available templates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, i) => (
              <FadeIn key={template.id} delay={i * 80}>
                <Card>
                  <CardHeader>
                    <span className="text-2xl">{template.emoji}</span>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Sample links */}
        <section id="samples">
          <h2 className="mb-8 text-center text-2xl font-semibold">Sample links</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {links.map((link, i) => (
              <FadeIn key={link.slug} delay={i * 80}>
                <Link href={`/${link.slug}`}>
                  <Card className="transition-all hover:border-violet-400/30 hover:bg-white/10">
                    <CardHeader>
                      <CardDescription className="capitalize">{link.template}</CardDescription>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm text-violet-300">/{link.slug} →</span>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <footer className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          Magic Link — JSON-driven personalized pages. Push to GitHub, deploy on Vercel.
        </footer>
      </div>
    </PageShell>
  );
}
