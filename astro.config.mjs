import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages project site at https://chinadbo.github.io/fairarchive/
// `base` prefixes generated asset URLs; hand-written internal links are prefixed
// via src/lib/paths.ts (localizedHref) so they resolve under the sub-path.
export default defineConfig({
  site: 'https://chinadbo.github.io',
  base: '/fairarchive',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
      // Astro 7 forbids redirectToDefaultLocale:true when prefixDefaultLocale
      // is false (would cause infinite redirect loops). Set to false — the
      // default locale (zh) is already served at root, so there is nothing to
      // redirect. Brief specified true; changed to false to pass config
      // validation. See task-1-report.md > Concerns.
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
