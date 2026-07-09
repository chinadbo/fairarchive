import type { CollectionEntry } from 'astro:content';

export type FilterOptions = {
  categories?: string[];
  statuses?: string[];
  tag?: string;
  q?: string;
};

// Plain serializable shape: injected into FilterBar.client as JSON and reused
// by matchesFilters, so server (tests) and client share ONE filter definition.
export type NormalizedEvent = {
  id: string;
  date: string; // ISO string (serializable for the client)
  category: string;
  status: string;
  tags: string[];
  title_zh: string;
  title_en: string;
  summary_zh: string;
  summary_en: string;
};

export function matchesFilters(e: NormalizedEvent, opts: FilterOptions): boolean {
  const { categories, statuses, tag, q } = opts;
  if (categories?.length && !categories.includes(e.category)) return false;
  if (statuses?.length && !statuses.includes(e.status)) return false;
  if (tag && !e.tags.includes(tag)) return false;
  if (q && q.trim()) {
    const needle = q.trim().toLowerCase();
    const hay = [e.title_zh, e.title_en, e.summary_zh, e.summary_en].join(' ').toLowerCase();
    if (!hay.includes(needle)) return false;
  }
  return true;
}

export function toNormalized(entry: CollectionEntry<'events'>): NormalizedEvent {
  return {
    id: entry.id,
    date: entry.data.date.toISOString(),
    category: entry.data.category,
    status: entry.data.status,
    tags: entry.data.tags,
    title_zh: entry.data.title_zh,
    title_en: entry.data.title_en,
    summary_zh: entry.data.summary_zh,
    summary_en: entry.data.summary_en,
  };
}

export function sortByDateDesc(events: CollectionEntry<'events'>[]): CollectionEntry<'events'>[] {
  return [...events].sort((a, b) => {
    const da = a.data.date.getTime();
    const db = b.data.date.getTime();
    if (db !== da) return db - da;
    return a.id.localeCompare(b.id);
  });
}
