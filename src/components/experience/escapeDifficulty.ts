/** Danger zone radius (px) — desktop proximity trigger */
export function getDangerRadius(escapeCount: number): number {
  if (escapeCount >= 30) return 120;
  if (escapeCount >= 20) return 110;
  return 100;
}

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

/** Movement transition duration (seconds) */
export function getEscapeSpeed(escapeCount: number): number {
  if (escapeCount < 20) return 0.38;
  if (escapeCount < 30) return 0.2;
  return Math.max(0.07, 0.2 - ((escapeCount - 30) / 15) * 0.05);
}

/** Minimum jump distance (px) — increases at high attempt counts */
export function getMinJumpDistance(escapeCount: number): number {
  if (escapeCount >= 30) return 130;
  if (escapeCount >= 20) return 110;
  return 85;
}
