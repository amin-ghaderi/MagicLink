'use client';

import { ESCAPE_MESSAGES } from '@/data/escapeMessages';
import { useShuffleBagMessages } from './useShuffleBagMessages';

/** Desktop flee taunts — shuffle-bag, no repeats until pool exhausted */
export function useEscapeMessages(seed: number) {
  return useShuffleBagMessages(ESCAPE_MESSAGES, seed);
}
