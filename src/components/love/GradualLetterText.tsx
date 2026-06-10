'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GradualLetterTextProps {
  text: string;
  className?: string;
  startDelay?: number;
  onComplete?: () => void;
}

export function GradualLetterText({
  text,
  className,
  startDelay = 0,
  onComplete,
}: GradualLetterTextProps) {
  const [visible, setVisible] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const speed = text.length > 400 ? 18 : 28;

    const tick = () => {
      index += 1;
      setVisible(text.slice(0, index));
      if (index < text.length) {
        timer = window.setTimeout(tick, speed);
      } else {
        onComplete?.();
      }
    };

    let timer = window.setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, started, onComplete]);

  return (
    <p
      className={cn(
        'whitespace-pre-line text-base leading-loose text-rose-50/95 sm:text-lg',
        className,
      )}
    >
      {visible}
      {started && visible.length < text.length && (
        <span className="animate-pulse text-rose-200">|</span>
      )}
    </p>
  );
}
