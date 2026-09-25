# Prompt 2 for Claude Design: typography and header

Paste below the line into Claude Design with the **Black Girls De Braiding**
project open. Re-run `node scripts/build-design-system.mjs` first so the cards
carry the current CSS.

---

Second pass on **Black Girls De Braiding**. The first pass shipped and is live at
https://blackgirlsbraiding.web.app. Two things came back from the client, and one
new asset arrived.

## What the client said

1. **"Font needs to be changed. It's legit fucking up my vision."** Bodoni Moda
   was unreadable for them.
2. They want the type to **mimic their actual logo**, which we now have.

## What I already changed, and why, so you can accept or overrule it

Bodoni Moda was wrong on two counts, not one.

**Readability.** It is a Didone: hairline thin strokes and a 0.460 x-height. I had
also been setting it on small text (h4, FAQ summaries, the price column), where a
Didone is punishing. Two separate faults compounding.

**Brand fit.** The logo's "GIRLS DE BRAIDING" line is a sturdy, low-contrast
Trajan-style roman with bracketed serifs and near-uniform stroke weight. That is
the *opposite* of a Didone. Bodoni was fighting the client's own branding.

As an interim fix, because the site was live and hurting their eyes:

- Swapped to **Lora** (OFL 1.1, 21KB latin subset, one weight, one request).
  0.500 x-height, much lower stroke contrast.
- Reserved the serif for **h1 to h3 only**. h4, FAQ summaries and the price
  column moved to the body sans.
- Fallback metrics measured from the real font files: `size-adjust: 108.1%`,
  `ascent-override: 100.6%`, `descent-override: 27.4%`.

**Lora is a stopgap chosen for readability, not a considered brand decision.
That call is yours.** If a different face serves the logo better, take it, as long
as it clears the constraints below.

## The logo

The real logo is now in the project and in the header and footer. Two lines:

- **"Black"** in a formal gold-gradient script, high contrast, calligraphic.
- **"GIRLS DE BRAIDING"** in gold-gradient roman capitals, sturdy, low contrast,
  Trajan-like.

It is a gold gradient drawn for a black ground. On the white header it lost most
of its contrast, so I put the header on ink, which also flows into the ink hero
below it. **That was a defect fix, not a design decision. If you want a light
header, you need a different treatment of the mark.**

## What I want from you

1. **The display face.** Confirm Lora or replace it. It should feel related to the
   logo's roman capitals without imitating them, and it must be readable at 18px,
   not only at 64px. Cinzel is the obvious Trajan analogue but its lowercase is
   built for titling, so check it in sentence case before committing.
2. **Where the serif is allowed.** I drew the line at h3. Move it if you disagree,
   but small text was half the client's complaint.
3. **The header.** Ink, light, or something else. Whatever you choose has to give
   a gold-gradient mark enough contrast.
4. **Whether the script in the logo should echo anywhere else** on the site, or
   stay unique to the mark. My instinct is to leave it unique.

## Hard constraints, unchanged from the first brief

- All decisions resolve to CSS custom properties in a single `:root` block.
- WCAG 2.1 AA: 4.5:1 body text, 3:1 UI. State the ratios you land on.
- 44px minimum on interactive controls.
- **CLS is currently 0 and must stay there.** Any webfont needs a metric-matched
  fallback. Give me `size-adjust`, `ascent-override` and `descent-override`
  measured from the real file, not estimated. On the last pass the supplied
  `size-adjust` was derived from x-height, which matches apparent size but not
  wrap width; it disagreed with the real face at 42% of viewport widths,
  concentrated in the phone range. Match on **advance width**.
- **One webfont request, self-hosted, OFL or similar.** No CDN. Name the single
  weight to preload; it renders the hero h1, which is the LCP element.
- **No JavaScript.** Every page but the booking form ships zero JS.
- Do not change content, heading structure or semantics.

## Deliver

The full `:root` token block, any component CSS labelled by card, contrast ratios
for every pair you touch, and the font metrics above. I will port it, rebuild, and
re-run the audit: contrast, CLS across a full-page scroll, tap targets, title and
description lengths, schema validity and internal links.
