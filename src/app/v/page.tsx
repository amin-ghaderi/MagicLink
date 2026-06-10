import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ImpossibleNoExperience } from '@/components/experience/ImpossibleNoExperience';
import { parseExperienceParams } from '@/lib/linkParams';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const config = parseExperienceParams(params);

  if (!config) {
    return { title: 'پیام' };
  }

  return {
    title: config.question,
    description: config.question,
  };
}

export default async function ExperiencePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const config = parseExperienceParams(params);

  if (!config) {
    notFound();
  }

  return <ImpossibleNoExperience config={config} />;
}
