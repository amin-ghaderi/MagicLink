/** Temporary visual debugging — remove or set false when done */
export const ESCAPE_DEBUG = true;

export function logEscapeDebug(payload: {
  device: 'desktop' | 'mobile';
  reason: string;
  pointer?: { x: number; y: number };
  button?: { left: number; top: number; centerX: number; centerY: number };
  distance?: number;
  dangerRadius?: number;
}) {
  if (!ESCAPE_DEBUG) return;
  console.log('[NO-button escape]', payload);
}
