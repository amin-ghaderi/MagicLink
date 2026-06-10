import { ExperienceLayout } from '@/components/layout/ExperienceLayout';
import { TemplateCard } from '@/components/layout/TemplateCard';
import type { TemplateProps } from '@/types';

export function BirthdayTemplate({ link }: TemplateProps) {
  return (
    <ExperienceLayout animation={link.animation ?? 'confetti'} gradient="amber">
      <TemplateCard link={link} badge="🎂 Birthday Surprise" />
    </ExperienceLayout>
  );
}
