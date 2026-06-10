import { ExperienceLayout } from '@/components/layout/ExperienceLayout';
import { TemplateCard } from '@/components/layout/TemplateCard';
import type { TemplateProps } from '@/types';

export function FriendshipTemplate({ link }: TemplateProps) {
  return (
    <ExperienceLayout animation={link.animation ?? 'slide'} gradient="sky">
      <TemplateCard link={link} badge="🤝 Friendship" />
    </ExperienceLayout>
  );
}
