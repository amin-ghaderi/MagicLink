'use client';

import { useCallback, useState } from 'react';
import { Confetti } from '@/components/effects/Confetti';
import { Hearts } from '@/components/effects/Hearts';
import { FadeIn } from '@/components/effects/FadeIn';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ExperienceConfig } from '@/types/experience';
import { EscapingNoButton } from './EscapingNoButton';
import { getPersianTauntMessage } from './persianMessages';
import { useEscapingButton } from './useEscapingButton';

interface ImpossibleNoExperienceProps {
  config: ExperienceConfig;
}

export function ImpossibleNoExperience({ config }: ImpossibleNoExperienceProps) {
  const [accepted, setAccepted] = useState(false);
  const { buttonRef, isFloating, position, escapeCount, tauntMessage, handleEscape } =
    useEscapingButton();

  const onNoEscape = useCallback(() => {
    handleEscape(getPersianTauntMessage(escapeCount + 1));
  }, [handleEscape, escapeCount]);

  if (accepted) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <Confetti />
        <Hearts />
        <div className="animate-success-pop relative z-10 mx-auto w-full max-w-lg text-center">
          <Card className="border-pink-300/30 bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-violet-600/25 shadow-2xl shadow-pink-500/20">
            <CardContent className="space-y-6 p-10">
              <span className="inline-block text-6xl">💖</span>
              <h2 className="whitespace-pre-line text-3xl font-bold leading-relaxed text-white sm:text-4xl">
                {config.successMessage}
              </h2>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg space-y-8 text-center">
        <FadeIn>
          <span className="inline-block rounded-full border border-pink-300/30 bg-pink-500/15 px-4 py-1.5 text-sm font-medium text-pink-100 backdrop-blur-sm">
            نهِ غیرممکن ✨
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="bg-gradient-to-br from-pink-100 via-white to-purple-200 bg-clip-text text-3xl font-bold leading-relaxed tracking-tight text-transparent sm:text-4xl md:text-5xl">
            {config.question}
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <Card className="border-pink-300/25 bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-violet-600/20 shadow-xl shadow-pink-900/20">
            <CardContent className="space-y-5 p-6 pt-8 sm:p-8">
              <div
                className={cn(
                  'flex min-h-[3.5rem] flex-wrap items-center justify-center gap-4',
                  isFloating && 'min-h-[4rem]',
                )}
              >
                <Button
                  type="button"
                  size="lg"
                  className="min-w-[7rem] bg-gradient-to-l from-pink-500 to-purple-600 px-8 shadow-lg shadow-pink-500/30 hover:from-pink-400 hover:to-purple-500"
                  onClick={() => setAccepted(true)}
                >
                  {config.yesLabel}
                </Button>

                <EscapingNoButton
                  buttonRef={buttonRef}
                  isFloating={isFloating}
                  position={position}
                  label={config.noLabel}
                  onEscape={onNoEscape}
                />
              </div>

              {tauntMessage && (
                <p
                  key={`${tauntMessage}-${escapeCount}`}
                  className={cn(
                    'animate-taunt-pop font-medium text-pink-200',
                    escapeCount >= 5 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
                  )}
                  role="status"
                  aria-live="polite"
                >
                  {tauntMessage}
                </p>
              )}

              {escapeCount > 0 && escapeCount < 8 && (
                <p className="text-xs text-pink-200/50">
                  تلاش برای گرفتن «نه»: {escapeCount.toLocaleString('fa-IR')}
                </p>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
