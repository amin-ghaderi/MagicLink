'use client';

import { useCallback, useRef } from 'react';
import { shuffleWithSeed } from '@/lib/shuffle';

/**
 * Shuffle-bag: shuffle the pool, consume one-by-one, reshuffle when empty.
 * No duplicate until all messages have been shown.
 */
export function useShuffleBagMessages(messages: readonly string[], seed?: number) {
  const deckRef = useRef<string[]>([]);
  const roundRef = useRef(0);
  const seedRef = useRef(seed ?? Math.floor(Math.random() * 1_000_000));

  const refillDeck = useCallback(() => {
    const roundSeed = seedRef.current + roundRef.current * 982451653;
    roundRef.current += 1;
    deckRef.current = shuffleWithSeed(messages, roundSeed);
  }, [messages]);

  const getNextMessage = useCallback((): string => {
    if (deckRef.current.length === 0) {
      refillDeck();
    }
    const message = deckRef.current.pop();
    if (!message) {
      refillDeck();
      return deckRef.current.pop() ?? messages[0];
    }
    return message;
  }, [messages, refillDeck]);

  return { getNextMessage };
}
