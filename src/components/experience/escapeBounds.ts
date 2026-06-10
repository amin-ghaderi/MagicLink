export interface Position {
  x: number;
  y: number;
}

export interface RectBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const VIEWPORT_PADDING = 8;
const CARD_PADDING = 8;

export function getViewportBounds(width: number, height: number): RectBounds {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const minX = VIEWPORT_PADDING;
  const minY = VIEWPORT_PADDING;
  const maxX = Math.max(minX, vw - width - VIEWPORT_PADDING);
  const maxY = Math.max(minY, vh - height - VIEWPORT_PADDING);
  return { minX, minY, maxX, maxY };
}

/** Intersection of viewport and container (card) bounds */
export function getSafeBounds(
  container: HTMLElement | null,
  width: number,
  height: number,
): RectBounds {
  const viewport = getViewportBounds(width, height);

  if (!container) return viewport;

  const card = container.getBoundingClientRect();

  const minX = Math.max(viewport.minX, card.left + CARD_PADDING);
  const minY = Math.max(viewport.minY, card.top + CARD_PADDING);
  const maxX = Math.min(viewport.maxX, card.right - width - CARD_PADDING);
  const maxY = Math.min(viewport.maxY, card.bottom - height - CARD_PADDING);

  return {
    minX,
    minY,
    maxX: Math.max(minX, maxX),
    maxY: Math.max(minY, maxY),
  };
}

export function clampToBounds(
  pos: Position,
  width: number,
  height: number,
  bounds: RectBounds,
): Position {
  return {
    x: Math.min(Math.max(pos.x, bounds.minX), bounds.maxX),
    y: Math.min(Math.max(pos.y, bounds.minY), bounds.maxY),
  };
}

export function randomPositionInBounds(
  width: number,
  height: number,
  bounds: RectBounds,
): Position {
  const spanX = Math.max(0, bounds.maxX - bounds.minX);
  const spanY = Math.max(0, bounds.maxY - bounds.minY);
  return clampToBounds(
    {
      x: bounds.minX + Math.random() * spanX,
      y: bounds.minY + Math.random() * spanY,
    },
    width,
    height,
    bounds,
  );
}

export function randomPositionAwayFrom(
  current: Position,
  width: number,
  height: number,
  minDistance: number,
  bounds: RectBounds,
): Position {
  for (let i = 0; i < 48; i++) {
    const next = randomPositionInBounds(width, height, bounds);
    if (Math.hypot(next.x - current.x, next.y - current.y) >= minDistance) {
      return next;
    }
  }
  return randomPositionInBounds(width, height, bounds);
}

export function getButtonCenter(rect: DOMRect): Position {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function distanceBetween(a: Position, b: Position): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
