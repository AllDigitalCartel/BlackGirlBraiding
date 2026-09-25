/**
 * Post-build fixes that Astro's sitemap integration does not cover.
 *
 * 1. /sitemap.xml
 *    @astrojs/sitemap emits sitemap-index.xml and sitemap-0.xml. Plenty of
 *    crawlers, and the seo-forge checker, probe the conventional /sitemap.xml
 *    first and record a 404 when it is missing. Copying the index there costs
 *    nothing and answers both spellings with a real 200 rather than a redirect,
 *    since some crawlers will not follow a redirect for a sitemap.
 */
import { copyFileSync, existsSync } from 'node:fs';

const dist = 'dist';
if (existsSync(`${dist}/sitemap-index.xml`)) {
  copyFileSync(`${dist}/sitemap-index.xml`, `${dist}/sitemap.xml`);
  console.log('post-build: sitemap.xml written from sitemap-index.xml');
} else {
  console.warn('post-build: sitemap-index.xml missing, /sitemap.xml not written');
}
