import { ExperienceLayout } from '@/components/layout/ExperienceLayout';
import { TemplateCard } from '@/components/layout/TemplateCard';
import type { TemplateProps } from '@/types';

export function CustomTemplate({ link }: TemplateProps) {
  return (
    <ExperienceLayout animation={link.animation ?? 'none'} gradient="slate">
      <TemplateCard link={link} badge="✨ Custom Experience" />
    </ExperienceLayout>
  );
}
