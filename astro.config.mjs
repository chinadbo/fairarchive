import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages project site at https://chinadbo.github.io/fairarchive/
// `base` prefixes generated asset URLs; hand-written internal links are prefixed
// via src/lib/paths.ts (localizedHref) so they resolve under the sub-path.
export default defineConfig({
  site: 'https://chinadbo.github.io',
  base: '/fairarchive',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
