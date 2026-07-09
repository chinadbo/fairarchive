import { matchesFilters, type NormalizedEvent, type FilterOptions } from '../lib/filters';

export function setupFilter(root: HTMLElement) {
  const data = JSON.parse(root.querySelector('script[type="application/json"]')!.textContent!) as NormalizedEvent[];
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-event-id]'));
  const fCat = root.querySelector<HTMLSelectElement>('#f-cat')!;
  const fStatus = root.querySelector<HTMLSelectElement>('#f-status')!;
  const fTag = root.querySelector<HTMLSelectElement>('#f-tag')!;
  const fQ = root.querySelector<HTMLInputElement>('#f-q')!;

  function apply() {
    const opts: FilterOptions = {
      categories: fCat.value ? [fCat.value] : undefined,
      statuses: fStatus.value ? [fStatus.value] : undefined,
      tag: fTag.value || undefined,
      q: fQ.value || undefined,
    };
    const visible = new Set(data.filter((e) => matchesFilters(e, opts)).map((e) => e.id));
    cards.forEach((c) => {
      c.style.display = visible.has(c.getAttribute('data-event-id')!) ? '' : 'none';
    });
  }
  [fCat, fStatus, fTag, fQ].forEach((el) => el.addEventListener('input', apply));
  apply();
}
