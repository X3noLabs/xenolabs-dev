import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://xenolabs.dev',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [tailwind()],
  vite: {
    build: {
      // Never inline scripts into the HTML: the CSP in public/_headers only
      // allows same-origin script files, not inline <script> blocks.
      assetsInlineLimit: 0,
    },
  },
});
