'use client';

import { useEffect, useState } from 'react';

export type InteractionMode = 'desktop' | 'mobile';

/**
 * Desktop: mouse / fine pointer (hover capable).
 * Mobile: touch-primary devices (phones, tablets).
 */
export function useInteractionMode(): InteractionMode {
  const [mode, setMode] = useState<InteractionMode>('desktop');

  useEffect(() => {
    const query = window.matchMedia('(hover: none) and (pointer: coarse)');

    const update = () => {
      setMode(query.matches ? 'mobile' : 'desktop');
    };

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return mode;
}
