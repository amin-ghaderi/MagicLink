import { ExperienceLayout } from '@/components/layout/ExperienceLayout';
import { TemplateCard } from '@/components/layout/TemplateCard';
import type { TemplateProps } from '@/types';

export function AnniversaryTemplate({ link }: TemplateProps) {
  return (
    <ExperienceLayout animation={link.animation ?? 'fade'} gradient="violet">
      <TemplateCard link={link} badge="💍 Anniversary" />
    </ExperienceLayout>
  );
}
