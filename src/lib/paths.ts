// Centralized base-path handling so internal links resolve whether the site is
// served at the domain root (no base) or under a project Pages sub-path
// (base set, e.g. '/fairarchive/'). Astro exposes the configured base as
// import.meta.env.BASE_URL, normalized with leading + trailing slashes:
//   no base  -> '/'
//   base set -> '/fairarchive/'
const BASE = import.meta.env.BASE_URL as string;

// Prefix a site-relative path (e.g. '/about', '/zh/', '/event/xyz') with the
// configured base so the link resolves under a project Pages sub-path.
export function localizedHref(path: string): string {
  if (path === '/') return BASE; // BASE already carries a trailing slash
  return `${BASE.replace(/\/$/, '')}${path}`;
}

// Strip the base prefix from a full request pathname so language-switch logic
// can operate on the site-relative path (e.g. '/zh/about') regardless of base.
export function stripBase(pathname: string): string {
  if (BASE !== '/' && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length);
    if (rest === '') return '/';
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}
