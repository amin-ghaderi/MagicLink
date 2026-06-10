/** Fixed proximity danger zone (px) — desktop */
export const DANGER_RADIUS = 150;

/** Button scale — shrinks after 10 attempts, never below 0.55 */
export function getNoButtonScale(escapeCount: number): number {
  if (escapeCount < 10) return 1;
  if (escapeCount < 20) {
    return 1 - ((escapeCount - 10) / 10) * 0.18;
  }
  if (escapeCount < 30) {
    return 0.82 - ((escapeCount - 20) / 10) * 0.14;
  }
  return Math.max(0.55, 0.68 - ((escapeCount - 30) / 15) * 0.08);
}

/** Movement transition duration (seconds) — used after instant jump */
export function getEscapeSpeed(escapeCount: number): number {
  if (escapeCount < 20) return 0.32;
  if (escapeCount < 30) return 0.18;
  return Math.max(0.06, 0.18 - ((escapeCount - 30) / 15) * 0.04);
}

/** Minimum jump distance (px) */
export function getMinJumpDistance(escapeCount: number): number {
  if (escapeCount >= 30) return 120;
  if (escapeCount >= 20) return 100;
  return 80;
}
