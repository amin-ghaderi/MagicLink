import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LoveLetterExperience } from '@/components/love/LoveLetterExperience';
import { parseLoveLetterParams } from '@/lib/templates/loveLetterParams';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const config = parseLoveLetterParams(params);

  if (!config) {
    return { title: 'نامه' };
  }

  return {
    title: config.title,
    description: `نامه برای ${config.recipientName}`,
  };
}

export default async function LoveLetterViewPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const config = parseLoveLetterParams(params);

  if (!config) {
    notFound();
  }

  return <LoveLetterExperience config={config} />;
}
