import { ExperienceLayout } from '@/components/layout/ExperienceLayout';
import { TemplateCard } from '@/components/layout/TemplateCard';
import type { TemplateProps } from '@/types';

export function GreetingTemplate({ link }: TemplateProps) {
  return (
    <ExperienceLayout animation={link.animation ?? 'fade'} gradient="indigo">
      <TemplateCard link={link} badge="✉️ Greeting" />
    </ExperienceLayout>
  );
}
