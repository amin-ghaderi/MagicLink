import { getLinkBySlug } from '@/lib/contentLoader';
import type { LinkRecord } from '@/types';

const RESERVED_SLUGS = new Set(['api', '_next', 'favicon.ico']);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug);
}

export function resolveSlug(slug: string): LinkRecord | null {
  if (isReservedSlug(slug)) return null;
  return getLinkBySlug(slug) ?? null;
}
