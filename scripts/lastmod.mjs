/**
 * Real per-page lastmod, from git.
 *
 * The sitemap previously stamped `new Date()` on every build, which told Google
 * that all 22 pages changed every time we deployed. Google's own guidance is
 * that a lastmod it cannot trust gets ignored entirely, so an inaccurate value
 * is worse than none. This maps each route to the source files it is actually
 * built from and reports the newest commit touching any of them.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';

const gitDate = (file) => {
  if (!existsSync(file)) return null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || null;
  } catch { return null; }
};

const newest = (...files) => {
  const dates = files.flat().map(gitDate).filter(Boolean).sort();
  return dates.length ? new Date(dates[dates.length - 1]) : null;
};

const posts = existsSync('src/content/blog')
  ? readdirSync('src/content/blog').filter((f) => f.endsWith('.md')).map((f) => `src/content/blog/${f}`)
  : [];

/**
 * Deliberately EXCLUDES the layout, header, footer and stylesheets. Restyling
 * the shell does not change what a page says, and folding those in collapses
 * every route to the same date, which is the same lie as `new Date()` wearing a
 * better disguise. Only sources that change the page's CONTENT count.
 */

export function lastmodFor(pathname) {
  const p = pathname.replace(/\/+$/, '/') || '/';
  if (p === '/')            return newest('src/pages/index.astro', 'src/data/services.js', 'src/data/prices.js', 'src/data/gallery.js');
  if (p === '/about/')      return newest('src/pages/about.astro');
  if (p === '/prices/')     return newest('src/pages/prices.astro', 'src/data/prices.js');
  if (p === '/gallery/')    return newest('src/pages/gallery.astro', 'src/data/gallery.js');
  if (p === '/book/')       return newest('src/pages/book.astro', 'src/data/services.js', 'src/data/prices.js');
  if (p === '/contact/')    return newest('src/pages/contact.astro');
  if (p === '/services/')   return newest('src/pages/services/index.astro', 'src/data/services.js', 'src/data/prices.js');
  if (p === '/blog/')       return newest('src/pages/blog/index.astro', posts);

  const post = p.match(/^\/blog\/(.+)\/$/);
  if (post) return newest(`src/content/blog/${post[1]}.md`, 'src/pages/blog/[...id].astro');

  if (p.startsWith('/services/')) return newest('src/pages/services/[slug].astro', 'src/data/services.js', 'src/data/prices.js', 'src/data/gallery.js');
  return null;
}
