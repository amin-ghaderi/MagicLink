import { ExperienceLayout } from '@/components/layout/ExperienceLayout';
import { TemplateCard } from '@/components/layout/TemplateCard';
import type { TemplateProps } from '@/types';

export function DateTemplate({ link }: TemplateProps) {
  return (
    <ExperienceLayout animation={link.animation ?? 'hearts'} gradient="rose">
      <TemplateCard link={link} badge="💕 Date Invitation" />
    </ExperienceLayout>
  );
}
