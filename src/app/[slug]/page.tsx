import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSlugs } from '@/lib/contentLoader';
import { resolveSlug } from '@/lib/slugResolver';
import { getTemplate, hasTemplate } from '@/lib/templateRegistry';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const link = resolveSlug(slug);

  if (!link) {
    return { title: 'Not Found — Magic Link' };
  }

  return {
    title: `${link.title} — Magic Link`,
    description: link.subtitle ?? link.message ?? link.title,
    openGraph: {
      title: link.title,
      description: link.subtitle ?? link.message,
      images: link.image ? [{ url: link.image }] : undefined,
    },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const link = resolveSlug(slug);

  if (!link) {
    notFound();
  }

  if (!hasTemplate(link.template)) {
    notFound();
  }

  const Template = getTemplate(link.template)!;
  return <Template link={link} />;
}
