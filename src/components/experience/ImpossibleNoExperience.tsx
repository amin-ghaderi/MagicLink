'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Confetti } from '@/components/effects/Confetti';
import { Hearts } from '@/components/effects/Hearts';
import { FadeIn } from '@/components/effects/FadeIn';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getTheme } from '@/lib/themes';
import { MOBILE_NO_RESPONSES } from '@/data/mobileNoResponses';
import { useEscapeMessages } from '@/hooks/useEscapeMessages';
import { useInteractionMode } from '@/hooks/useInteractionMode';
import { useShuffleBagMessages } from '@/hooks/useShuffleBagMessages';
import type { ExperienceConfig } from '@/types/experience';
import { ExperienceShell } from './ExperienceShell';
import { EscapingNoButton } from './EscapingNoButton';
import { MobileNoButton } from './MobileNoButton';
import { MobileResponseMessage } from './MobileResponseMessage';
import { useEscapingButton } from './useEscapingButton';

interface ImpossibleNoExperienceProps {
  config: ExperienceConfig;
}

export function ImpossibleNoExperience({ config }: ImpossibleNoExperienceProps) {
  const [accepted, setAccepted] = useState(false);
  const boundsContainerRef = useRef<HTMLDivElement>(null);
  const theme = useMemo(() => getTheme(config.theme), [config.theme]);
  const mode = useInteractionMode();

  // Desktop: fleeing taunts
  const { getNextMessage: getDesktopMessage } = useEscapeMessages(config.seed);
  // Mobile: conversational responses
  const { getNextMessage: getMobileMessage } = useShuffleBagMessages(
    MOBILE_NO_RESPONSES,
    config.seed + 31_337,
  );

  const [mobileResponse, setMobileResponse] = useState<string | null>(null);
  const [mobileTapCount, setMobileTapCount] = useState(0);

  const getDesktopEscapeMessage = useCallback(() => getDesktopMessage(), [getDesktopMessage]);

  const desktop = useEscapingButton({
    mode,
    boundsContainerRef,
    onEscape: getDesktopEscapeMessage,
  });

  const handleMobileNoTap = useCallback(() => {
    setMobileTapCount((c) => c + 1);
    setMobileResponse(getMobileMessage());
  }, [getMobileMessage]);

  const isDesktop = mode === 'desktop';
  const displayMessage = isDesktop ? desktop.tauntMessage : mobileResponse;
  const messageKey = isDesktop ? desktop.escapeCount : mobileTapCount;

  if (accepted) {
    return (
      <ExperienceShell theme={theme} showDecorations={false}>
        <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16">
          {(theme.celebration === 'confetti' || theme.celebration === 'both') && (
            <Confetti />
          )}
          {(theme.celebration === 'hearts' || theme.celebration === 'both') && <Hearts />}
          <div className="animate-success-pop relative z-10 mx-auto w-full max-w-md text-center">
            <Card className={cn('shadow-2xl backdrop-blur-md', theme.successCard)}>
              <CardContent className="space-y-6 p-10 sm:p-12">
                <span className="inline-block text-7xl">{theme.successEmoji}</span>
                <h2 className="whitespace-pre-line text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                  {config.successMessage}
                </h2>
              </CardContent>
            </Card>
          </div>
        </div>
      </ExperienceShell>
    );
  }

  return (
    <ExperienceShell theme={theme}>
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12 sm:py-16">
        <div className="w-full max-w-md space-y-10 text-center">
          <FadeIn>
            <h1
              className={cn(
                'bg-gradient-to-bl bg-clip-text text-3xl font-bold leading-relaxed tracking-tight text-transparent sm:text-4xl md:text-[2.75rem]',
                theme.titleGradient,
              )}
            >
              {config.question}
            </h1>
          </FadeIn>

          <FadeIn delay={150}>
            <Card
              ref={boundsContainerRef}
              className={cn(
                'relative overflow-visible shadow-2xl backdrop-blur-md',
                theme.card,
              )}
            >
              <CardContent className="space-y-6 p-7 sm:p-9">
                <div
                  className={cn(
                    'relative flex min-h-[3.5rem] flex-wrap items-center justify-center gap-4',
                    isDesktop && desktop.isFloating && 'min-h-[4rem]',
                  )}
                >
                  <Button
                    type="button"
                    size="lg"
                    className={cn(
                      'relative z-10 min-w-[7.5rem] px-8 text-base shadow-lg',
                      theme.yesButton,
                    )}
                    onClick={() => setAccepted(true)}
                  >
                    {config.yesLabel}
                  </Button>

                  {isDesktop ? (
                    <EscapingNoButton
                      buttonRef={desktop.buttonRef}
                      isFloating={desktop.isFloating}
                      position={desktop.position}
                      label={config.noLabel}
                      className={theme.noButton}
                      scale={desktop.scale}
                      transitionDuration={desktop.transitionDuration}
                      instantMove={desktop.instantMove}
                      onForceEscape={desktop.triggerEscape}
                    />
                  ) : (
                    <MobileNoButton
                      label={config.noLabel}
                      className={theme.noButton}
                      onTap={handleMobileNoTap}
                    />
                  )}
                </div>

                {displayMessage &&
                  (isDesktop ? (
                    <p
                      key={`${displayMessage}-${messageKey}`}
                      className={cn(
                        'animate-taunt-pop text-base font-medium sm:text-lg',
                        theme.tauntText,
                        desktop.escapeCount >= 10 && 'text-lg sm:text-xl',
                      )}
                      role="status"
                      aria-live="polite"
                    >
                      {displayMessage}
                    </p>
                  ) : (
                    <MobileResponseMessage
                      message={displayMessage}
                      tapCount={messageKey}
                      className={theme.tauntText}
                    />
                  ))}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </ExperienceShell>
  );
}
