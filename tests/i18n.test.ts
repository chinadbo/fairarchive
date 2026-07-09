import { describe, it, expect } from 'vitest';
import { localizedTitle, localizedSummary } from '../src/lib/i18n';

const entry = {
  data: { title_zh: '中文标题', title_en: '', summary_zh: '中文摘要', summary_en: 'En summary' },
} as any;

describe('i18n fallback', () => {
  it('zh returns zh field', () => {
    expect(localizedTitle(entry, 'zh')).toEqual({ text: '中文标题', fallback: false });
  });
  it('en missing falls back to zh and flags', () => {
    expect(localizedTitle(entry, 'en')).toEqual({ text: '中文标题', fallback: true });
  });
  it('en present returns en, no fallback', () => {
    expect(localizedSummary(entry, 'en')).toEqual({ text: 'En summary', fallback: false });
  });
});
