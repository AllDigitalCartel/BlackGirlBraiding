# Handoff: Black Girls De Braiding, visual identity pass

## Overview

The site is built, live-ready and SEO-complete across 23 static pages. This pass
gives it a designed look without touching content, markup semantics or heading
structure. It resolves entirely to CSS custom properties plus a small set of
component-level rules, so it applies to all 23 pages by replacing one token file
and merging one CSS file.

Direction: 5/5 "corporate" read as polished and premium, not corporate-blue. The
palette is deepened from the salon's own roll-up banner, darker, warmer ground,
gold as the only brand accent, terracotta demoted to a trace role. The premium
feeling comes from whitespace, gold hairlines, a larger editorial headline
scale, dark sections used as punctuation, and a tighter type scale.

## About the design files

`BGDB Design Pass.dc.html` in this bundle is a **design reference in HTML**, a
preview board, not production code to copy wholesale. The two CSS files, though,
are meant to be ported directly:

| File | Destination |
|---|---|
| `tokens.css` | replaces `src/styles/tokens.css` wholesale |
| `global-additions.css` | merge into `src/styles/global.css` |

Every block in `global-additions.css` is labelled with the design-system card it
belongs to and marked `REPLACE` (supersedes an existing rule of the same
selector) or `NEW`.

## Fidelity

**High-fidelity.** Final colours, type scale, spacing and states. Values are
exact and every one of them is a token.

## What changed

### Palette

Deepened, not replaced. `--color-ink` moves from `#12100E` to `#0E0B08`, darker
and warmer. Surfaces warm slightly. Gold is the only accent that carries brand
meaning; terracotta keeps its value but is used only for decoration, never text.

Two tokens were **deliberately not touched**, because they were darkened
specifically to clear 4.5:1: `--color-gold-deep` (`#8A6D13`) and
`--color-terracotta` (`#A75B35`). Do not lighten either.

New tokens: `--color-ink-warm`, `--rule-gold`, `--rule-gold-dark`,
`--border-gold`, `--tracking-display`, `--tap-hero`.

### Type

One webfont request. **Bodoni Moda**, headings only; body stays on the system
sans stack.

- Licence: SIL Open Font License 1.1. Self-hostable, no CDN dependency.
- Weights used: 600 (all headings, `.price-row__price`), 500 available for
  optional lighter display use.
- **Preload the 600 weight only.** It renders the hero `h1`, which is the LCP
  element:
  ```html
  <link rel="preload" href="/fonts/bodoni-moda-600.woff2" as="font"
        type="font/woff2" crossorigin>
  ```
- `font-display: swap`, latin subset.
- CLS protection: `tokens.css` declares a `'Bodoni Fallback'` family with
  `size-adjust: 96.5%` and ascent/descent overrides, sitting between Bodoni and
  Georgia in the stack. The swap therefore lands on matched metrics and the LCP
  line does not reflow. **Verify this in the audit**, if CLS moves off 0, tune
  `size-adjust` rather than dropping the webfont.

The scale is tighter at the bottom (xs/sm/base/lg sit closer together, so the
page reads as three or four sizes rather than eight) and larger at the top
(`--text-4xl` tops out at 5rem, `--text-3xl` at 3.5rem). All steps remain
`clamp()`, so there is no step-change at breakpoints.

### Component CSS

See `global-additions.css` for the rules. Summary by card:

- **pattern-hero.html**, ink ground, gold hairline along the top edge, 88px
  gold rule above the eyebrow, `h1` at `--text-4xl` / 1.04 leading, an
  asymmetric three-frame photo cluster, and a `.hero__assurance` trust row.
  The headline stays text.
- **component-buttons.html**, new `.btn--call` at `--tap-hero` (56px) with a
  gold glow; the only raised element on any page. Secondary CTA becomes
  `.btn--ghost` on a gold hairline.
- **component-price-group.html**, cards retired for gold rules so more rows
  fit per screen; prices in the display serif with tabular numerals so the right
  edge scans as a column; new `.price-index` chip row (44px targets, anchor
  links, zero JS) to jump to any of the 21 categories; new `.price-promise` ink
  block carrying the transparency statement; new `.price-row--split` for
  two-stage pricing.
- **component-gallery-tile.html**, gold inset hairline via `::after`. The
  3:4 aspect-ratio lock and `picture { height: 100% }` are untouched.
- **component-service-card.html**, hover moves from shadow lift to gold border.
- **pattern-header.html**, wordmark `em` set to roman gold instead of italic,
  so no second Bodoni file is needed. Mobile ordering keeps the call button
  visible while the nav collapses.
- **foundations-type.html**, heading tracking now tokenised.

The remaining cards (foundations-color, foundations-space, brand-wordmark,
component-chips, component-form, component-faq, component-cta-block,
pattern-footer, pattern-breadcrumbs) need **no component CSS**. They restyle
from the token block alone.

### The price list

82 items across 21 categories, so density was the real problem. The framing is
transparency rather than a menu: a `.price-promise` block above the list states
that every price is published and the price quoted is the price paid. The chip
index makes scanning to your own style fast without JS.

**Sister Locks:** `$35` is a consultation and `$800+` is the install. These must
never render as one row or as a range. `.price-row--split` gives each stage its
own labelled sub-row on a gold border, and the group description states the
consultation is not a deposit against the install.

## Contrast ratios

Every pair introduced or changed:

| Pair | Ratio | Needs |
|---|---|---|
| `--color-on-dark` `#F7F3EC` on `--color-ink` `#0E0B08` | 17.8:1 | 4.5:1 |
| `--color-ink` on `--color-gold` `#C9A227` (button label) | 8.1:1 | 4.5:1 |
| `--color-amber` `#F2D06B` on ink | 13.2:1 | 4.5:1 |
| `--color-on-dark-muted` `#B8AE9F` on ink | 8.9:1 | 4.5:1 |
| `--color-on-dark` on `--color-ink-soft` `#1C1713` | 16.4:1 | 4.5:1 |
| `--color-gold-deep` on `--color-canvas` | 4.91:1 | 4.5:1 |
| `--color-gold-deep` on `--color-surface` `#FBF8F3` | 4.61:1 | 4.5:1 |
| `--color-muted` on `--color-surface` | 5.68:1 | 4.5:1 |
| `--color-focus` `#1A6ED8` on canvas | 4.92:1 | 3:1 |
| `--color-on-dark` on `--color-terracotta` | 4.53:1 | 4.5:1 |

Lightening `--color-surface` from `#FAF7F2` to `#FBF8F3` raised
gold-deep-on-surface from 4.59:1 to 4.61:1, so the tightest pair on the site got
slightly safer, not riskier.

## Constraints honoured

- **Tokens only.** No component rule hard-codes a colour, font, size, space,
  radius or shadow. `rgb(201 162 39 / …)` appears in three `box-shadow` and
  `background` values where a token cannot carry an alpha channel; if the audit
  wants those tokenised too, add `--glow-gold` and `--tint-gold` and swap them.
- **44px minimum** on every interactive control. `--tap-min` is unchanged;
  `.price-index a` and all buttons meet it. `.btn--call` is 56px on desktop and
  drops back to 44px on mobile, where it stays in the header row.
- **CLS 0.** Gallery 3:4 box and `picture { height: 100% }` untouched; all type
  remains `clamp()`; the webfont swap is metric-matched. The one thing to watch
  is the hero's spanning frame, it must carry `aspect-ratio: auto` and
  `height: 100%`, not its own ratio, or it under-fills its track.
- **Zero JS.** The price index is anchor links; FAQ stays on `<details>`; all
  states are `:hover` / `:focus-visible` / `[open]`.
- **No content, heading or semantic changes.** The only markup additions are
  class names and wrapper elements inside existing blocks:
  `.btn--call` on the phone link, `.hero__rule` / `.hero__assurance` /
  `.hero__frames` in the hero, `.price-promise` and `.price-index` above the
  price list, and `.price-row--split` / `.price-stage` / `.price-stage__label`
  inside the Sister Locks row. No heading levels move, no link text changes.

## Left for implementation

1. **Font subsetting and preload.** Generate `bodoni-moda-600.woff2` (latin
   subset), place it, and add the preload tag. Paths in `tokens.css` assume
   `/fonts/`.
2. **The logo.** The client uploaded one to the intake form but it was not in
   the hand-off. The header still uses the type-only lockup. Swap it in
   `SiteHeader.astro` when it surfaces; the `.brand__mark em` rule can then go.
3. **Photography selection.** The design assumes the strongest three images lead
   the hero. Which three is an editorial call, not a CSS one.
4. **The 15 remaining cards** are not individually restyled previews yet, they
   inherit from the token block, which is why no component CSS is listed for
   them. Re-run `node scripts/build-design-system.mjs` after porting and the
   previews will pick up the new look automatically.
5. **Alpha tokens.** See the note under Constraints if the audit wants zero
   literal `rgb()` in `global.css`.

## Files in this bundle

- `tokens.css`, the complete ordered token block. The artefact.
- `global-additions.css`, component CSS, labelled per card.
- `BGDB Design Pass.dc.html`, visual reference board (hero, price group,
  tokens and contrast panel).
