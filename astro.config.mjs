import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.js';
import { lastmodFor } from './scripts/lastmod.mjs';

export default defineConfig({
  site: site.origin,
  output: 'static',
  trailingSlash: 'always',          // one canonical URL shape, no /x vs /x/ duplicates
  build: { format: 'directory', inlineStylesheets: 'auto' },
  // Astro inlines small <script> blocks into the HTML by default. That would
  // require 'unsafe-inline' in script-src, which defeats the CSP. Force every
  // executable script to an external file so script-src 'self' is sufficient.
  vite: { build: { assetsInlineLimit: 0 } },
  compressHTML: true,
  image: {
    // AVIF first, WebP fallback, JPEG last — emitted with srcset by <Picture>.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const p = new URL(item.url).pathname;
        // Real modification date from git. Omitted rather than guessed when a
        // route has no traceable source, since Google ignores a lastmod it
        // cannot trust.
        const lm = lastmodFor(p);
        if (lm) item.lastmod = lm;
        if (p === '/') item.priority = 1.0;
        else if (p === '/services/' || p === '/prices/' || p === '/book/') item.priority = 0.9;
        else if (p.startsWith('/services/')) item.priority = 0.8;
        else if (p === '/gallery/' || p === '/contact/' || p === '/about/') item.priority = 0.7;
        else if (p.startsWith('/blog/')) item.priority = 0.6;
        else item.priority = 0.5;
        return item;
      },
    }),
  ],
});
