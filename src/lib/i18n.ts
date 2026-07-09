import type { CollectionEntry } from 'astro:content';

export type Lang = 'zh' | 'en';

export type Localized = { text: string; fallback: boolean };

export function localizedField(
  entry: Pick<CollectionEntry<'events'>, 'data'>,
  field: 'title' | 'summary',
  lang: Lang
): Localized {
  const zh = entry.data[`${field}_zh` as 'title_zh'];
  const en = entry.data[`${field}_en` as 'title_en'];
  if (lang === 'zh') return { text: zh, fallback: false };
  if (en && en.trim()) return { text: en, fallback: false };
  return { text: zh, fallback: true };
}

export const localizedTitle = (e: Pick<CollectionEntry<'events'>, 'data'>, lang: Lang) =>
  localizedField(e, 'title', lang);
export const localizedSummary = (e: Pick<CollectionEntry<'events'>, 'data'>, lang: Lang) =>
  localizedField(e, 'summary', lang);
