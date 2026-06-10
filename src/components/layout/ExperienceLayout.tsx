import { AnimationWrapper } from '@/components/effects/AnimationWrapper';
import { PageShell } from '@/components/layout/PageShell';
import type { AnimationType } from '@/types';

interface ExperienceLayoutProps {
  children: React.ReactNode;
  animation?: AnimationType;
  gradient?: 'violet' | 'rose' | 'amber' | 'sky' | 'indigo' | 'slate';
}

export function ExperienceLayout({
  children,
  animation = 'none',
  gradient = 'violet',
}: ExperienceLayoutProps) {
  return (
    <PageShell gradient={gradient}>
      <AnimationWrapper type={animation} />
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16">
        {children}
      </main>
    </PageShell>
  );
}
