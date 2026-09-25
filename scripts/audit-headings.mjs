/**
 * Heading quality audit.
 *
 * Structure alone was never the problem. Two regressions got through by
 * passing a structural check while reading badly:
 *
 *   1. A copy rewrite stripped the target keyword out of five h1s.
 *   2. Fixing that bolted keywords onto the front or back of headings,
 *      producing "Our braiding prices, all of them" and "Annandale braids
 *      that turn heads", which pass a keyword check and read like SEO.
 *
 * So this checks BOTH: the keyword must be there, and it must not look
 * welded on. Run with `node scripts/audit-headings.mjs`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const KW = ['braid','braiding','knotless','box braid','twist','cornrow','loc','crochet',
            'weave','sew-in','annandale','virginia','salon','price','hair','kids','cost'];
const GENERIC = new Set(['recent work','our work','gallery','services','prices','contact',
  'about','faq','faqs','questions','more','learn more','overview','phone','email','map',
  'quick answers','what we do','welcome','introduction']);

/** Phrasings that read as a keyword welded onto a sentence. */
const WELDED = [
  [/,\s*(all of them|and more|etc)\.?$/i,        'trailing fragment'],
  [/^(Annandale|Virginia|VA)\s+\w/i,             'location bolted to the front'],

  [/\b(\w+)\s+\1\b/i,                            'word repeated back to back'],
  [/^(Our|The)\s+\w+\s+(page|section|list)\b/i,  'names the page instead of the content'],
];

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});

const strip = (h) => h.replace(/<[^>]+>/g, '')
  .replace(/&amp;/g,'&').replace(/&#39;|&rsquo;/g,"'").replace(/&nbsp;/g,' ')
  .replace(/\s+/g,' ').trim();

let fails = [];
const seenH1 = new Map();

for (const file of walk('dist').sort()) {
  const s = readFileSync(file, 'utf8');
  const page = '/' + file.replace(/^dist\/?/,'').replace(/index\.html$/,'');
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(s);
  const body = s.replace(/<(script|style|svg|head)[^>]*>[\s\S]*?<\/\1>/g, '');

  const hs = [...body.matchAll(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/g)]
    .map((m) => ({ lvl: +m[1], hidden: /visually-hidden/.test(m[2]), text: strip(m[3]) }));

  const h1s = hs.filter((h) => h.lvl === 1);
  if (h1s.length !== 1) fails.push(`${page}: ${h1s.length} h1`);
  let prev = 0;
  for (const h of hs) {
    if (prev && h.lvl > prev + 1) fails.push(`${page}: heading skip h${prev}->h${h.lvl}`);
    prev = h.lvl;
  }
  if (!h1s.length) continue;
  const h1 = h1s[0].text;

  (seenH1.get(h1.toLowerCase()) ?? seenH1.set(h1.toLowerCase(), []).get(h1.toLowerCase())).push(page);

  if (!noindex) {
    if (!KW.some((k) => h1.toLowerCase().includes(k))) fails.push(`${page}: h1 has no keyword -> "${h1}"`);
    for (const [re, why] of WELDED)
      if (re.test(h1)) fails.push(`${page}: h1 ${why} -> "${h1}"`);

    // A location comma-appended with no preposition reads as a directory entry
    // ("Braiding gallery, Annandale VA"). The same words led by a preposition
    // are an ordinary sentence ("Knotless Braids in Annandale, Virginia") and
    // are fine, which is why this is not a plain regex on the location.
    const commaAppended = /,\s*(Annandale|Virginia|VA)\b/i.test(h1);
    const prepositionLed = /\b(in|near|at|around|serving|from)\s+(Annandale|Virginia)/i.test(h1);
    if (commaAppended && !prepositionLed)
      fails.push(`${page}: h1 appends the location without a preposition -> "${h1}"`);
    const title = strip((s.match(/<title>([\s\S]*?)<\/title>/) || [,''])[1]).split('|')[0].trim();
    if (title.toLowerCase() === h1.toLowerCase()) fails.push(`${page}: h1 identical to title`);
  }
  for (const h of hs)
    if ((h.lvl === 2 || h.lvl === 3) && !h.hidden && GENERIC.has(h.text.toLowerCase()))
      fails.push(`${page}: generic h${h.lvl} -> "${h.text}"`);
}
for (const [h, pages] of seenH1) if (pages.length > 1) fails.push(`duplicate h1 "${h}" on ${pages.join(', ')}`);

console.log(fails.length ? 'HEADING FAILURES:\n  ' + fails.join('\n  ') : 'Headings: no failures');
process.exit(fails.length ? 1 : 0);
