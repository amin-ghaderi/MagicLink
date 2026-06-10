'use client';

import { useCallback, useRef } from 'react';
import { ESCAPE_MESSAGES } from '@/data/escapeMessages';
import { shuffleWithSeed } from '@/lib/shuffle';

/**
 * Shuffled deck per session — seeded from link payload so each
 * generated link gets a unique message order. No repeats until
 * all 50 are shown, then reshuffles with a derived seed.
 */
export function useEscapeMessages(seed: number) {
  const deckRef = useRef<string[]>([]);
  const roundRef = useRef(0);

  const refillDeck = useCallback(() => {
    const roundSeed = seed + roundRef.current * 982451653;
    roundRef.current += 1;
    deckRef.current = shuffleWithSeed(ESCAPE_MESSAGES, roundSeed);
  }, [seed]);

  const getNextMessage = useCallback((): string => {
    if (deckRef.current.length === 0) {
      refillDeck();
    }

    const deck = deckRef.current;
    const index = Math.floor(Math.random() * deck.length);
    const [message] = deck.splice(index, 1);
    return message;
  }, [refillDeck]);

  return { getNextMessage };
}
