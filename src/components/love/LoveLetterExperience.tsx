'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Confetti } from '@/components/effects/Confetti';
import { Hearts } from '@/components/effects/Hearts';
import { FadeIn } from '@/components/effects/FadeIn';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LoveLetterConfig } from '@/types/loveLetter';
import { GradualLetterText } from './GradualLetterText';

interface LoveLetterExperienceProps {
  config: LoveLetterConfig;
}

export function LoveLetterExperience({ config }: LoveLetterExperienceProps) {
  const [letterDone, setLetterDone] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const showImage = Boolean(config.imageUrl) && letterDone;
  const showCta = letterDone;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-950 via-pink-950 to-violet-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,207,232,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(167,139,250,0.1),_transparent_50%)]" />

      {celebrating && (
        <>
          <Confetti />
          <Hearts />
        </>
      )}

      <main className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col px-5 py-10 sm:py-14">
        {/* Envelope header */}
        <FadeIn>
          <div className="mb-8 text-center">
            <span className="mb-4 inline-block text-4xl sm:text-5xl">💌</span>
            <h1 className="animate-love-title bg-gradient-to-l from-rose-100 via-pink-50 to-violet-200 bg-clip-text text-3xl font-bold leading-relaxed text-transparent sm:text-4xl">
              {config.title}
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <p className="mb-6 text-center text-lg text-rose-200/90 sm:text-xl">
            <span className="text-rose-300/70">برای</span>{' '}
            <span className="font-semibold text-rose-100">{config.recipientName}</span>
            <span className="text-rose-300/70"> عزیز</span>
          </p>
        </FadeIn>

        {/* Letter body */}
        <div
          className={cn(
            'relative flex-1 rounded-2xl border border-rose-300/20 p-6 shadow-2xl shadow-rose-950/40 sm:p-8',
            'bg-gradient-to-bl from-rose-500/10 via-pink-500/8 to-violet-600/10 backdrop-blur-md',
          )}
        >
          <div className="mb-4 h-px bg-gradient-to-l from-transparent via-rose-300/30 to-transparent" />

          <GradualLetterText
            text={config.body}
            startDelay={900}
            onComplete={() => setLetterDone(true)}
          />

          {showImage && config.imageUrl && (
            <FadeIn delay={0}>
              <div className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl shadow-lg ring-1 ring-rose-300/20">
                <Image
                  src={config.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 512px) 100vw, 384px"
                  unoptimized={
                    !config.imageUrl.includes('images.unsplash.com')
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 to-transparent" />
              </div>
            </FadeIn>
          )}

          {showCta && !celebrating && (
            <FadeIn delay={showImage ? 400 : 200}>
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  size="lg"
                  className="bg-gradient-to-l from-rose-500 to-pink-600 px-10 shadow-lg shadow-rose-500/30 hover:from-rose-400 hover:to-pink-500"
                  onClick={() => setCelebrating(true)}
                >
                  {config.ctaLabel}
                </Button>
              </div>
            </FadeIn>
          )}

          {celebrating && (
            <FadeIn>
              <p className="mt-8 text-center text-xl font-medium text-rose-100 sm:text-2xl">
                تا ابد... 💕
              </p>
            </FadeIn>
          )}

          <div className="mt-6 h-px bg-gradient-to-l from-transparent via-rose-300/20 to-transparent" />
        </div>
      </main>
    </div>
  );
}
