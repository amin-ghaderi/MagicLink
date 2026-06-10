'use client';

import { useEffect, useState } from 'react';
import type { ThemeDefinition } from '@/lib/themes';

interface FloatingItem {
  id: number;
  left: number;
  delay: number;
  size: number;
  char: string;
}

const DECORATION_CHARS: Record<ThemeDefinition['decoration'], string[]> = {
  hearts: ['♥', '💕', '❤️'],
  confetti: ['✨', '🎉', '⭐'],
  sparkles: ['✨', '💫', '⭐'],
  stars: ['⭐', '✨', '💫'],
  gifts: ['🎁', '🎀', '✨'],
};

interface ThemeDecorationsProps {
  theme: ThemeDefinition;
}

export function ThemeDecorations({ theme }: ThemeDecorationsProps) {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const chars = DECORATION_CHARS[theme.decoration];
    const generated = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 6,
      size: 14 + Math.random() * 18,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
    setItems(generated);
  }, [theme.decoration]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40">
      {items.map((item) => (
        <span
          key={item.id}
          className="animate-float-heart absolute bottom-0"
          style={{
            left: `${item.left}%`,
            fontSize: item.size,
            animationDelay: `${item.delay}s`,
            animationDuration: `${5 + Math.random() * 4}s`,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
