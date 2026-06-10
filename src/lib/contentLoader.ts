import linksData from '@/content/links.json';
import templatesData from '@/content/templates.json';
import type { LinkRecord, TemplateMeta } from '@/types';

const links = linksData as LinkRecord[];
const templates = templatesData as TemplateMeta[];

export function getAllLinks(): LinkRecord[] {
  return links;
}

export function getLinkBySlug(slug: string): LinkRecord | undefined {
  return links.find((link) => link.slug === slug);
}

export function getAllSlugs(): string[] {
  return links.map((link) => link.slug);
}

export function getAllTemplates(): TemplateMeta[] {
  return templates;
}

export function getTemplateMeta(id: string): TemplateMeta | undefined {
  return templates.find((t) => t.id === id);
}
