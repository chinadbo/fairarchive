import { describe, it, expect } from 'vitest';
import { eventsSchema } from '../src/content.config';

describe('events schema (fairness enforcement)', () => {
  const validBase = {
    date: '2022-12-18',
    category: '判罚争议',
    status: '报道争议',
    title_zh: '标题',
    title_en: 'Title',
    summary_zh: '摘要',
    summary_en: 'Summary',
    tags: ['梅西'],
    sources: [{ label: '媒体A', url: 'https://example.com/a', type: '媒体' }],
  };

  it('accepts a valid event with sources', () => {
    expect(eventsSchema.safeParse(validBase).success).toBe(true);
  });

  it('rejects when sources is empty (fairness: source required)', () => {
    expect(eventsSchema.safeParse({ ...validBase, sources: [] }).success).toBe(false);
  });

  it('rejects invalid status enum', () => {
    expect(eventsSchema.safeParse({ ...validBase, status: '已定罪' }).success).toBe(false);
  });

  it('rejects invalid category enum', () => {
    expect(eventsSchema.safeParse({ ...validBase, category: '胡编' }).success).toBe(false);
  });

  it('rejects malformed source url', () => {
    expect(
      eventsSchema.safeParse({
        ...validBase,
        sources: [{ label: 'x', url: 'not-a-url', type: '媒体' }],
      }).success
    ).toBe(false);
  });

  it('requires response.source when response present', () => {
    expect(
      eventsSchema.safeParse({
        ...validBase,
        response: { who: '足协', text_zh: '回应' },
      }).success
    ).toBe(false);
  });

  it('accepts response with source', () => {
    expect(
      eventsSchema.safeParse({
        ...validBase,
        response: { who: '足协', text_zh: '回应', source: { label: '声明', url: 'https://example.com/r' } },
      }).success
    ).toBe(true);
  });
});
