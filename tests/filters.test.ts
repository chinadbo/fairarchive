import { describe, it, expect } from 'vitest';
import { sortByDateDesc, matchesFilters, toNormalized, type NormalizedEvent } from '../src/lib/filters';
import type { CollectionEntry } from 'astro:content';

function mk(id: string, date: string, category: string, status: string, tags: string[], title_zh = id): CollectionEntry<'events'> {
  return {
    id,
    slug: id,
    body: '',
    collection: 'events',
    data: {
      date: new Date(date), category, status,
      title_zh, title_en: id, summary_zh: 's', summary_en: 's',
      tags, sources: [{ label: 'x', url: 'https://example.com', type: '媒体' }],
    },
  } as unknown as CollectionEntry<'events'>;
}

const sample = [
  mk('a', '2022-12-18', '判罚争议', '报道争议', ['梅西']),
  mk('b', '2018-06-16', '裁判执法', '已被质疑', ['阿根廷']),
  mk('c', '2022-12-18', 'FIFA治理', '官方裁定', ['梅西', '阿根廷']),
];

const norm: NormalizedEvent[] = sample.map(toNormalized);

describe('sortByDateDesc', () => {
  it('sorts newest first; stable for same date by id', () => {
    const r = sortByDateDesc(sample);
    expect(r[0].id).toBe('a');
    expect(r[1].id).toBe('c');
    expect(r[2].id).toBe('b');
  });
});

describe('matchesFilters', () => {
  it('category filter', () => {
    expect(norm.filter((e) => matchesFilters(e, { categories: ['裁判执法'] })).map((e) => e.id)).toEqual(['b']);
  });
  it('status filter', () => {
    expect(norm.filter((e) => matchesFilters(e, { statuses: ['官方裁定'] })).map((e) => e.id)).toEqual(['c']);
  });
  it('tag filter', () => {
    expect(norm.filter((e) => matchesFilters(e, { tag: '梅西' })).map((e) => e.id).sort()).toEqual(['a', 'c']);
  });
  it('keyword across zh/en title+summary', () => {
    expect(norm.filter((e) => matchesFilters(e, { q: 'b' })).map((e) => e.id)).toEqual(['b']);
    expect(norm.filter((e) => matchesFilters(e, { q: 'C' })).map((e) => e.id)).toEqual(['c']);
  });
  it('empty filters matches all', () => {
    expect(norm.filter((e) => matchesFilters(e, {})).length).toBe(3);
  });
});

describe('toNormalized', () => {
  it('serializes entry to ISO date + id from loader', () => {
    const n = toNormalized(sample[0]);
    expect(n.id).toBe('a');
    expect(n.date).toBe('2022-12-18T00:00:00.000Z');
  });
});
