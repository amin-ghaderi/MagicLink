import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ImpossibleNoExperience } from '@/components/experience/ImpossibleNoExperience';
import { PageShell } from '@/components/layout/PageShell';
import { parseExperienceParams } from '@/lib/linkParams';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const config = parseExperienceParams(params);

  if (!config) {
    return { title: 'لینک نامعتبر — نهِ غیرممکن' };
  }

  return {
    title: `${config.question} — نهِ غیرممکن`,
    description: config.question,
  };
}

export default async function ExperiencePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const config = parseExperienceParams(params);

  if (!config) {
    notFound();
  }

  return (
    <PageShell gradient="rose">
      <ImpossibleNoExperience config={config} />
    </PageShell>
  );
}
