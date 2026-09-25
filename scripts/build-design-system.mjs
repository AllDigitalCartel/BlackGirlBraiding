/**
 * Builds the /design-sync bundle: one standalone, self-contained preview file
 * per component, each opening with a `@dsCard` marker so the Claude Design
 * pane indexes it automatically.
 *
 * Each preview inlines tokens.css + global.css, so what Claude Design sees is
 * byte-for-byte the CSS the live site ships. Re-run after changing either:
 *   node scripts/build-design-system.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { site } from '../src/data/site.js';
import { priceGroups, formatPrice } from '../src/data/prices.js';
import { services } from '../src/data/services.js';

const OUT = 'design-system';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const tokens = readFileSync('src/styles/tokens.css', 'utf8');
const logoB64 = readFileSync('scripts/logo-b64.txt', 'utf8').trim();
const global = readFileSync('src/styles/global.css', 'utf8').replace("@import './tokens.css';", '');

const page = ({ card, title, note, body, pad = true }) => `<!-- @dsCard group="${card.group}" -->
<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}, Black Girls De Braiding</title>
<style>
${tokens}
${global}
  body { display:block; ${pad ? 'padding: var(--space-6);' : ''} background: var(--color-canvas); }
  .ds-h { font-family: var(--font-body); font-size: var(--text-xs); font-weight: var(--weight-semibold);
          letter-spacing: var(--tracking-wide); text-transform: uppercase;
          color: var(--color-muted); margin-bottom: var(--space-4); }
  .ds-note { font-size: var(--text-sm); color: var(--color-text-muted); max-width: 62ch; margin-bottom: var(--space-6); }
  .ds-row { display:flex; flex-wrap:wrap; gap: var(--space-4); align-items:center; margin-bottom: var(--space-6); }
  .ds-sw { border:var(--border-hair); border-radius: var(--radius-md); overflow:hidden; width: 9.5rem; }
  .ds-sw i { display:block; height:4.5rem; }
  .ds-sw b { display:block; padding: var(--space-2) var(--space-3); font-size: var(--text-xs);
             font-family: var(--font-mono); font-weight: var(--weight-normal); }
  .ds-sw b span { display:block; color: var(--color-text-muted); }
</style>
</head>
<body>
<p class="ds-h">${title}</p>
${note ? `<p class="ds-note">${note}</p>` : ''}
${body}
</body>
</html>
`;

const files = [];
const add = (path, opts) => { writeFileSync(`${OUT}/${path}`, page(opts)); files.push(path); };

/* ---------------- Foundations ---------------- */
const swatches = [
  ['--color-ink', 'Ink', 'Body text, dark sections'],
  ['--color-gold', 'Gold', 'Primary action, brand'],
  ['--color-gold-bright', 'Gold bright', 'Hover state'],
  ['--color-gold-deep', 'Gold deep', 'Links, eyebrows'],
  ['--color-amber', 'Amber', 'Accent on dark'],
  ['--color-terracotta', 'Terracotta', 'Warm secondary'],
  ['--color-surface', 'Surface', 'Alternating sections'],
  ['--color-surface-alt', 'Surface alt', 'Image placeholders'],
  ['--color-border', 'Border', 'Hairlines, card edges'],
  ['--color-muted', 'Muted', 'Secondary text'],
];
add('foundations-color.html', {
  card: { group: 'Foundations' },
  title: 'Colour',
  note: `The client requested no specific colours. This palette is sampled from the salon's own roll-up banner (black ground, gold gradient wordmark, yellow accent, warm terracotta) as seen in the supplied photographs. Brand feel is 5/5 &ldquo;corporate&rdquo; per the intake form. <strong>Every value is defined once in <code>src/styles/tokens.css</code>.</strong>`,
  body: `<div class="ds-row">${swatches.map(([v, n, u]) =>
    `<div class="ds-sw"><i style="background:var(${v})"></i><b>${n}<span>${v}</span><span>${u}</span></b></div>`).join('')}</div>
  <p class="ds-note"><strong>Contrast, every pair verified against WCAG 2.1 AA (4.5:1 body text):</strong>
     ink on canvas 18.98:1 &middot; muted on canvas 5.98:1 &middot; gold-deep on canvas 4.91:1 &middot;
     gold-deep on surface 4.59:1 &middot; ink on gold button 7.85:1 &middot; on-dark on ink 17.16:1 &middot;
     amber on ink 12.67:1 &middot; on-dark on terracotta 4.53:1 &middot; focus ring on canvas 4.92:1 (needs 3:1).
     <code>--color-gold-deep</code> and <code>--color-terracotta</code> were darkened from the raw banner
     samples specifically to clear 4.5:1, keep them at or below these values when restyling.</p>`,
});

add('foundations-type.html', {
  card: { group: 'Foundations' },
  title: 'Type scale',
  note: 'Fluid <code>clamp()</code> scale, sizes interpolate with viewport width so there is no step-change at breakpoints and no layout shift. System-first font stacks mean zero webfont requests and zero font-swap CLS at launch.',
  body: `
  <h1>Protective braiding, done with care</h1>
  <h2>Braiding prices, published in full</h2>
  <h3>Knotless Braids</h3>
  <h4>What to expect</h4>
  <p class="lede">Lede, knotless braids, box braids, boho curls, twists, cornrows and locs, installed at a tension your scalp can live with.</p>
  <p>Body, box braids are named for the neat square sections they are parted into, and a good box braid lives or dies by those partings.</p>
  <p class="eyebrow">Eyebrow / Annandale, Virginia</p>
  <p class="muted">Muted, secondary and supporting copy.</p>
  <p style="font-family:var(--font-mono);font-size:var(--text-sm)">--font-display: serif stack &nbsp;·&nbsp; --font-body: system sans</p>`,
});

add('foundations-space.html', {
  card: { group: 'Foundations' },
  title: 'Spacing, radius & elevation',
  note: '4px base scale. <code>--section-y</code> is fluid so vertical rhythm scales with the viewport.',
  body: `
  <div class="ds-row" style="align-items:flex-end">
    ${[1,2,3,4,5,6,7,8,9,10].map(n =>
      `<div style="text-align:center"><div style="width:2rem;height:var(--space-${n});background:var(--color-gold)"></div>
       <small style="font-family:var(--font-mono);font-size:10px">${n}</small></div>`).join('')}
  </div>
  <div class="ds-row">
    ${['sm','md','lg','xl','pill'].map(r =>
      `<div style="width:6rem;height:4rem;background:var(--color-surface);border:var(--border-hair);border-radius:var(--radius-${r});display:grid;place-items:center;font-family:var(--font-mono);font-size:11px">${r}</div>`).join('')}
  </div>
  <div class="ds-row">
    ${['sm','md','lg'].map(s =>
      `<div style="width:8rem;height:5rem;background:var(--color-canvas);border-radius:var(--radius-lg);box-shadow:var(--shadow-${s});display:grid;place-items:center;font-family:var(--font-mono);font-size:11px">shadow-${s}</div>`).join('')}
  </div>`,
});

/* ---------------- Brand ---------------- */
add('brand-wordmark.html', {
  card: { group: 'Brand' },
  title: 'Logo',
  note: `The client's actual logo, supplied after the first design pass. Two lines: <strong>"Black"</strong> in a formal gold-gradient script, and <strong>"GIRLS DE BRAIDING"</strong> in gold-gradient roman capitals that are sturdy, low-contrast and Trajan-like, NOT a Didone. The display typeface should feel related to those capitals. The mark is a gold gradient drawn for a black ground, which is why the site header now sits on ink; on white it loses most of its contrast.`,
  body: `
  <div style="display:grid;gap:var(--space-6)">
    <div style="background:var(--color-ink);padding:var(--space-8);border-radius:var(--radius-lg);text-align:center">
      <img src="data:image/png;base64,${logoB64}" alt="Black Girls De Braiding" style="max-width:min(100%,30rem);height:auto;margin:0 auto" />
      <p style="color:var(--color-on-dark-muted);font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;margin-top:var(--space-4)">On ink, its native ground</p>
    </div>
    <div style="background:var(--color-canvas);border:var(--border-hair);padding:var(--space-8);border-radius:var(--radius-lg);text-align:center">
      <img src="data:image/png;base64,${logoB64}" alt="Black Girls De Braiding on white" style="max-width:min(100%,30rem);height:auto;margin:0 auto" />
      <p class="muted" style="font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;margin-top:var(--space-4)">On white, contrast collapses</p>
    </div>
    <div>
      <p class="ds-h">Current header lockup</p>
      <div style="background:var(--color-ink);padding:var(--space-5);border-radius:var(--radius-md)">
        <img src="data:image/png;base64,${logoB64}" alt="" style="height:40px;width:auto;display:block" />
        <span style="display:block;font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;color:var(--color-on-dark-muted);margin-top:var(--space-1)">Annandale, Virginia</span>
      </div>
    </div>
  </div>`,
});

/* ---------------- Components ---------------- */
add('component-buttons.html', {
  card: { group: 'Components' },
  title: 'Buttons',
  note: `Minimum height is <code>--tap-min</code> (44px) so every button clears the WCAG 2.5.5 / mobile-SEO tap-target floor. Primary is always the phone call, the client's stated primary call to action.`,
  body: `
  <div class="btn-row" style="margin-bottom:var(--space-6)">
    <a class="btn btn--primary" href="#">Call (571) 705-9809</a>
    <a class="btn btn--secondary" href="#">Request an appointment</a>
    <a class="btn btn--primary" href="#">See all services</a>
  </div>
  <div style="background:var(--color-ink);padding:var(--space-6);border-radius:var(--radius-lg)">
    <div class="btn-row">
      <a class="btn btn--primary" href="#">Call (571) 705-9809</a>
      <a class="btn btn--ghost" href="#" style="color:var(--color-on-dark)">Request an appointment</a>
    </div>
  </div>
  <div style="max-width:20rem;margin-top:var(--space-6)">
    <a class="btn btn--primary btn--block" href="#">Block / full width</a>
  </div>`,
});

add('component-service-card.html', {
  card: { group: 'Components' },
  title: 'Service card',
  note: 'Used on the homepage, the services index and the related-services rail. The whole card is one click target via a stretched pseudo-element on the title link.',
  body: `<div class="grid grid--3">${services.slice(0, 3).map(s => `
    <article class="card"><div class="card__body">
      <h3 class="card__title"><a href="#">${s.name}</a></h3>
      <p class="card__meta">${s.short}</p>
      <p class="card__foot">${s.duration} &nbsp;·&nbsp; lasts ${s.lasts}</p>
    </div></article>`).join('')}</div>`,
});

const g = priceGroups.find(x => x.slug === 'knotless-braids');
add('component-price-group.html', {
  card: { group: 'Components' },
  title: 'Price group',
  note: `Renders the client's price list. 82 of their 98 numbered items are live; items 35&ndash;50 were not legible in the supplied material. Prices are data, never markup, the same source feeds the page, the JSON-LD offer catalog and llms.txt.`,
  body: `<div style="max-width:34rem"><section class="price-group">
    <header class="price-group__head"><h3>${g.name}</h3>
      <p class="muted" style="font-size:var(--text-sm)">${g.blurb}</p></header>
    <ul class="price-list">${g.items.map(i => `
      <li class="price-row">
        <span class="price-row__name">${i.name}${i.note ? `<span class="price-row__note">${i.note}</span>` : ''}</span>
        <span class="price-row__price">${formatPrice(i)}</span>
      </li>`).join('')}</ul></section></div>`,
});

add('component-gallery-tile.html', {
  card: { group: 'Components' },
  title: 'Gallery tile',
  note: `Locked to a 3:4 box so the grid never shifts while photos load. Astro emits AVIF &rarr; WebP &rarr; JPEG with srcset; every tile carries written alt text. The <code>&lt;picture&gt;</code> wrapper must keep <code>height:100%</code> or the photo overflows the box.`,
  body: `<div class="gallery-grid" style="max-width:44rem">${[
    ['Knotless Braids','#3a3128'],['Boho Braids','#4a3b2c'],['Box Braids','#2e2a26'],['Cornrows','#453a2f']
  ].map(([c, bg]) => `
    <figure class="gallery-item">
      <div style="width:100%;height:100%;background:linear-gradient(160deg,${bg},var(--color-ink));
                  display:grid;place-items:center;color:var(--color-on-dark-muted);font-size:var(--text-xs)">photo</div>
      <figcaption style="opacity:1">${c}</figcaption>
    </figure>`).join('')}</div>`,
});

add('component-chips.html', {
  card: { group: 'Components' },
  title: 'Filter chips',
  note: 'Category jump-links on the price list and gallery. Real anchors, not JS filters, so every category is crawlable and linkable.',
  body: `<ul class="chips">
    <li><a class="chip" href="#" aria-current="true">All 84</a></li>
    ${['Knotless Braids','Boho Braids','Box Braids','Senegalese Twist','Cornrows','Kids Braids']
      .map(c => `<li><a class="chip" href="#">${c}</a></li>`).join('')}
  </ul>`,
});

add('component-form.html', {
  card: { group: 'Components' },
  title: 'Booking form fields',
  note: `The secondary call to action. Writes to Firestore (create-only, server-validated). Labels are always visible, errors are announced via <code>aria-invalid</code> + <code>aria-describedby</code>, and inputs meet the 44px tap-target floor.`,
  body: `<form style="max-width:30rem" class="stack-lg" onsubmit="return false">
    <div class="field"><label for="a">Your name <span aria-hidden="true">*</span></label>
      <input id="a" type="text" value="Linda A." /></div>
    <div class="field"><label for="b">Phone number <span aria-hidden="true">*</span></label>
      <input id="b" type="tel" inputmode="tel" />
      <p class="hint">We will call this number to confirm your appointment.</p></div>
    <div class="field"><label for="c">Which style would you like? <span aria-hidden="true">*</span></label>
      <select id="c"><option>Choose a style…</option><option>Medium Knotless, Midback</option></select></div>
    <div class="field"><label for="d">Phone number <span aria-hidden="true">*</span></label>
      <input id="d" type="tel" aria-invalid="true" aria-describedby="e" value="12" />
      <p class="error" id="e">Please enter a phone number we can reach you on.</p></div>
    <div class="field"><label for="f">Anything else we should know?</label><textarea id="f"></textarea></div>
    <button class="btn btn--primary btn--block" type="submit">Send my request</button>
    <p class="form-status form-status--ok">Thank you, your request is with us. We will call you back to confirm.</p>
    <p class="form-status form-status--err">Something went wrong. Please call us instead and we will book you in straight away.</p>
  </form>`,
});

add('component-faq.html', {
  card: { group: 'Components' },
  title: 'FAQ accordion',
  note: 'Native <code>&lt;details&gt;</code>, no JavaScript, keyboard accessible for free, and the answer text is in the HTML for crawlers even when collapsed. Mirrored into FAQPage JSON-LD on every page that uses it.',
  body: `<div class="faq" style="max-width:44rem">
    <details open><summary>Do knotless braids damage your edges?</summary>
      <div><p>Not when they are installed correctly. Because there is no knot pulling at the root, knotless braids place much less tension on the hairline than knotted box braids.</p></div></details>
    <details><summary>How long do knotless braids take?</summary>
      <div><p>Between four and seven hours depending on the size and length you choose.</p></div></details>
    <details><summary>How much do braids cost?</summary>
      <div><p>Most protective styles land between $150 and $300 depending on size and length.</p></div></details>
  </div>`,
});

add('component-cta-block.html', {
  card: { group: 'Components' },
  title: 'Conversion block',
  note: 'Appears at the foot of every page. Primary action is the phone call; secondary is the booking form, matching the client&rsquo;s stated primary and secondary calls to action exactly.',
  pad: false,
  body: `<section class="section section--ink"><div class="container container--narrow" style="text-align:center">
    <p class="eyebrow">Book an appointment</p>
    <h2 style="margin-top:var(--space-3)">Ready to book your braids?</h2>
    <p class="lede" style="margin:var(--space-4) auto 0">Call Linda and the team to check availability, talk through sizes and lengths, or get a straight answer on price.</p>
    <div class="btn-row" style="justify-content:center;margin-top:var(--space-6)">
      <a class="btn btn--primary" href="#">Call (571) 705-9809</a>
      <a class="btn btn--ghost" href="#">Request an appointment</a>
    </div>
    <p class="muted" style="margin-top:var(--space-5);font-size:var(--text-sm)">
      Second line: (571) 400-8270 &nbsp;·&nbsp; ${site.address.street}, ${site.address.locality}, ${site.address.region}</p>
  </div></section>`,
});

add('pattern-header.html', {
  card: { group: 'Patterns' },
  title: 'Site header',
  note: 'Sticky, with the phone number as a permanent action. Collapses to a disclosure menu below 60rem; the call button stays visible at every width because it is the primary conversion.',
  pad: false,
  body: `<header class="site-header"><div class="container site-header__inner">
    <a class="brand" href="#"><span>
      <span class="brand__mark"><em>Black Girls</em> De Braiding</span>
      <span class="brand__sub">Annandale, Virginia</span></span></a>
    <nav class="nav" aria-label="Primary"><ul>
      ${['Services','Prices','Gallery','About','Hair Care','Contact'].map((n, i) =>
        `<li><a href="#"${i === 1 ? ' aria-current="page"' : ''}>${n}</a></li>`).join('')}
    </ul></nav>
    <div class="header-cta"><a class="btn btn--primary" href="#">Call (571) 705-9809</a></div>
  </div></header>
  <div style="padding:var(--space-6)"><p class="muted">Page content sits beneath the sticky header.</p></div>`,
});

add('pattern-footer.html', {
  card: { group: 'Patterns' },
  title: 'Site footer',
  note: 'Carries NAP (name, address, phone) consistently on every page, a direct local-SEO signal, plus internal links into the top service pages.',
  pad: false,
  body: `<footer class="site-footer"><div class="container">
    <div class="footer-grid">
      <section><h2>Black Girls De Braiding</h2><p>${site.tagline}</p>
        <p style="margin-top:var(--space-4)"><a class="btn btn--primary" href="#">Call (571) 705-9809</a></p></section>
      <section><h3>Visit us</h3><address style="font-style:normal"><a href="#">${site.address.street}<br />${site.address.locality}, ${site.address.region} ${site.address.postalCode}</a></address>
        <ul class="footer-list" style="margin-top:var(--space-4)"><li><a href="#">(571) 705-9809</a></li><li><a href="#">(571) 400-8270</a></li></ul></section>
      <section><h3>Popular services</h3><ul class="footer-list">
        ${services.slice(0, 5).map(s => `<li><a href="#">${s.name}</a></li>`).join('')}</ul></section>
      <section><h3>Opening hours</h3><ul class="footer-list">
        ${site.hoursDisplay.map(h => `<li>${h.label}<br /><span style="color:var(--color-on-dark)">${h.value}</span></li>`).join('')}</ul></section>
    </div>
    <div class="footer-bottom"><p>&copy; ${new Date().getFullYear()} Black Girls De Braiding. All rights reserved.</p></div>
  </div></footer>`,
});

add('pattern-hero.html', {
  card: { group: 'Patterns' },
  title: 'Homepage hero',
  note: 'The LCP surface. The headline is the LCP element (text, not an image) so largest paint does not wait on a network image; the first two photographs load eagerly with <code>fetchpriority=high</code> and the rest are lazy.',
  pad: false,
  body: `<section class="section"><div class="container">
    <div class="grid grid--2" style="align-items:center;gap:var(--space-9)">
      <div class="stack-lg">
        <p class="eyebrow">Annandale, Virginia &nbsp;·&nbsp; Ten years of braiding</p>
        <h1>Protective braiding, done with care that shows.</h1>
        <p class="lede">Knotless braids, box braids, boho curls, twists, cornrows and locs, installed at a tension your scalp can live with, and priced openly so you know the number before you sit down.</p>
        <div class="btn-row"><a class="btn btn--primary" href="#">Call (571) 705-9809</a>
          <a class="btn btn--secondary" href="#">Request an appointment</a></div>
      </div>
      <div class="gallery-grid" style="grid-template-columns:repeat(2,1fr)">
        ${['#3a3128','#4a3b2c','#2e2a26','#453a2f'].map(bg => `<figure class="gallery-item">
          <div style="width:100%;height:100%;background:linear-gradient(160deg,${bg},var(--color-ink))"></div></figure>`).join('')}
      </div>
    </div></div></section>`,
});

add('pattern-breadcrumbs.html', {
  card: { group: 'Patterns' },
  title: 'Breadcrumbs',
  note: 'Rendered on every page below the top level, and mirrored into BreadcrumbList JSON-LD so Google can show the path instead of a raw URL in results.',
  pad: false,
  body: `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol>
    <li><a href="#">Home</a></li><li><a href="#">Services</a></li>
    <li><span aria-current="page">Knotless Braids</span></li></ol></div></nav>`,
});

writeFileSync(`${OUT}/README.md`, `# Design system bundle, Black Girls De Braiding

${files.length} standalone preview files for \`/design-sync\`. Each opens with a
\`@dsCard\` marker so the Claude Design pane indexes it automatically, and each
inlines the live \`tokens.css\` + \`global.css\`, so what you see here is exactly
what the site ships.

## The one rule

**All colour, type, spacing, radius and elevation live in \`src/styles/tokens.css\`.**
No component hard-codes a value. Rewriting that one file restyles all 23 pages
without touching a single page, component, schema block or SEO tag.

## Cards

| Group | File |
|---|---|
${files.map(f => `| ${f.startsWith('foundations') ? 'Foundations' : f.startsWith('brand') ? 'Brand' : f.startsWith('pattern') ? 'Patterns' : 'Components'} | \`${f}\` |`).join('\n')}

## Regenerate

\`\`\`bash
node scripts/build-design-system.mjs
\`\`\`

Run this after editing \`tokens.css\` or \`global.css\` so the previews never drift
from the live site.

## Open questions for the design pass

1. **Logo**, the client uploaded a logo to the intake form but it was not in the
   hand-off. The header currently uses a type-only lockup derived from their
   roll-up banner. Swap it in \`SiteHeader.astro\`.
2. **Webfont**, the site ships system fonts for zero render-blocking cost and
   zero font-swap CLS. If a brand serif is introduced, self-host it, preload the
   one above-the-fold weight, and set \`font-display: swap\`.
3. **Palette**, derived from the salon's banner, not from a client brief; they
   answered "No" to colour and font requests. Confirm before it becomes canon.
`);

console.log(`design-system/: ${files.length} previews + README.md`);
