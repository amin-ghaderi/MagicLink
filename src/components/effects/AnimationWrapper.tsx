'use client';

import type { AnimationType } from '@/types';
import { Confetti } from './Confetti';
import { Hearts } from './Hearts';

interface AnimationWrapperProps {
  type?: AnimationType;
}

export function AnimationWrapper({ type = 'none' }: AnimationWrapperProps) {
  if (type === 'confetti') return <Confetti />;
  if (type === 'hearts') return <Hearts />;
  return null;
}
