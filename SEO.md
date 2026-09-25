# SEO implementation

Every item on the brief, and where it is implemented. All claims below are verified
against the built output in `dist/`, not asserted.

## HTTPS & security

Firebase Hosting terminates TLS and redirects HTTP→HTTPS automatically. On top of
that, `firebase.json` sets on every response:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Content-Security-Policy`, `default-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'self'`, `form-action 'self'`, `upgrade-insecure-requests`;
  `connect-src` opened only to the Firestore endpoints the booking form needs
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`, geolocation, mic, camera, payment, USB, FLoC all denied
- `Cross-Origin-Opener-Policy: same-origin`

Firestore rules make `bookingRequests` **create-only**: submissions cannot be read,
updated or deleted from the client, and every field is type- and length-validated
server-side.

## URL structure

Lowercase, hyphenated, keyword-bearing, no query strings, no dates, shallow.
`trailingSlash: 'always'` in Astro **and** `"trailingSlash": true` in `firebase.json`,
so `/x` and `/x/` can never both resolve and there is no redirect hop before content.

10 legacy-shape 301s are pre-registered (`/shop`, `/pricing`, `/booking`,
`/portfolio`, `/about-us`, `/contact-us`, …) so any link the client has already
shared resolves in one hop.

## Robots.txt

Generated at `src/pages/robots.txt.js` so the `Sitemap:` directive always matches the
origin the build was made for. `/404/` disallowed. AI crawlers, GPTBot,
OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended,
Applebot-Extended, CCBot, are allowed **explicitly**, since discovery is the goal.

## XML sitemap

`@astrojs/sitemap`. 22 URLs, `/404/` filtered out, `lastmod` stamped at build.
Priority is set deliberately rather than left flat: home 1.0; `/services/`,
`/prices/`, `/book/` 0.9; service detail 0.8; `/gallery/`, `/contact/`, `/about/` 0.7;
blog 0.6.

## Crawlability

Every page is real static HTML, content is in the source, not assembled by script.
Verified: **zero JavaScript files load on any page except `/book/`** (3.6 KB there).
Navigation, breadcrumbs, filter chips and gallery categories are all real `<a href>`
anchors, not JS handlers.

Audit result: **0 broken internal links, 0 orphan pages.**

## Indexability

One `<link rel="canonical">` per page, absolute, HTTPS, trailing-slashed, derived from
a single `origin` constant. `robots` meta is `index, follow, max-snippet:-1,
max-image-preview:large, max-video-preview:-1` everywhere except `/404/`, which is
`noindex, nofollow`.

**Zero duplicate titles and zero duplicate descriptions across all 23 pages.** Every
title renders ≤65 characters and every description falls in 110–165, verified on
rendered text, after HTML-entity decoding.

## Internal linking

Every page reachable within two clicks of home. Descriptive anchor text throughout ,
no "click here". Service pages cross-link to their price groups, gallery categories
and four related services; gallery categories link back to the matching service page.

Inbound internal links: `/prices/` 81, `/book/` 60, `/services/` 59, `/gallery/` 58,
`/contact/` 47, weight concentrated on the conversion pages.

## Schema markup

One JSON-LD `@graph` per page. Every node carries a stable `@id` so nodes cross-
reference instead of duplicating. All blocks parse as valid JSON, verified.

| Type | Count | Where |
|---|---|---|
| `HairSalon` + `LocalBusiness` | 23 | every page, NAP, geo, hours, areaServed, payment |
| `WebSite` / `WebPage` | 23 / 23 | every page |
| `BreadcrumbList` | 21 | every page below top level |
| `FAQPage` | 16 | home, prices, all 11 services, 3 blog posts |
| `Service` + `AggregateOffer` + `OfferCatalog` | 11 | each service page, priced from real data |
| `BlogPosting` | 3 | blog posts |
| `OfferCatalog` | 1 | `/prices/`, all 82 items as `Offer` nodes |
| `ImageGallery` | 1 | `/gallery/` |
| `ReserveAction` | 1 | `/book/` |
| `ItemList`, `AboutPage`, `ContactPage`, `Blog` | 5 | respective pages |

## Core Web Vitals

Measured on the built output in-browser:

| Metric | Result |
|---|---|
| **CLS** | **0**, measured across a full-page scroll, 0 shift events |
| Total transfer, first paint | 142 KB (5 requests) |
| JavaScript executed | **0 bytes** on every page but `/book/` |
| DOMContentLoaded | 75 ms |
| CSS | one 14 KB stylesheet |

How it is held:

- **CLS**, every image ships `width`/`height`; gallery tiles are locked to a 3:4
  `aspect-ratio` box; type uses `clamp()` so there is no breakpoint step-change; system
  fonts mean no font-swap reflow.
- **LCP**, the hero LCP element is *text*, so largest paint never waits on a network
  image. The first two photographs are `loading="eager"` + `fetchpriority="high"`; the
  other 248 are lazy.
- **INP**, one ~15-line inline script site-wide (the mobile nav toggle). The 542 KB
  Firebase SDK is a dynamic import fired **on form submit only**, confirmed not
  preloaded and not `modulepreload`ed.
- Immutable one-year cache on hashed assets and images; `must-revalidate` on HTML.

## Mobile SEO

Responsive `width=device-width` viewport that **does not block zoom**. All interactive
controls meet a 44 px minimum via `--tap-min`. Single-column reflow under 60 rem with a
disclosure nav, the call button stays visible at every width because it is the primary
conversion. Phone numbers are `tel:` links; the address links to Google Maps.

## Image SEO

All 84 client photographs were re-encoded, EXIF-stripped, orientation-baked, capped at
1600 px and **renamed from `1000006342.jpg` to descriptive slugs** like
`knotless-braids-small-long-side.jpg`.

Across the build: **266 `<img>` elements, 266 with written alt text, 266 with
`width`/`height`, 266 with `srcset`, 266 backed by AVIF *and* WebP sources.** Zero
exceptions. Alt text is written per photograph, never derived from the filename and
never left empty. Average delivered image weight is 34 KB.

## AI SEO readiness

- **`/llms.txt`**, a generated plain-text brief carrying the facts an answer engine
  quotes: identity, address, phone, hours, differentiators, every service with price
  and duration, the full price list, and a page index. Generated from the same data as
  the pages, so it cannot drift.
- AI crawlers allowed explicitly in `robots.txt`.
- Content is answer-shaped: 16 `FAQPage` blocks written as direct question/answer
  pairs, prices stated as literal figures in prose rather than in images, and service
  pages that state duration, longevity and cost as extractable facts.
- Semantic HTML throughout, one `<h1>` per page, no heading-level jumps
  (verified across all 23 pages), real `<address>`, `<time>`, `<table>` elements.
