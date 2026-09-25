# Prompt for Claude Design

Paste everything below the line into Claude Design, with the
**Black Girls De Braiding** design-system project open.

---

You are designing the visual identity for **Black Girls De Braiding**, a hair
braiding salon at 4121 Chatelain Rd #202, Annandale, Virginia. The site is
already built, live-ready and SEO-complete, 23 static pages. What it does not
have is a designed look. That is your job.

This design-system project already contains 17 preview cards covering
Foundations (colour, type, spacing), Brand, 8 Components and 4 Patterns. Each
card inlines the exact CSS the production site ships, so what you see is what
visitors see. Work with these cards, restyle them, do not replace them.

## The business

Ten years of braiding, and braiding only, not a general salon with a braid
menu. Family-run; Linda manages. Their stated mission is "to make our customers
happy," and their stated advantages are their environment, their price and their
customer service.

Clients are Black women, men and children across Northern Virginia. Many sit in
the chair for four to eight hours, so the shop is somewhere you spend real time,
not somewhere you pass through. Prices are published in full and never moved on
the day, that honesty is a brand value, not just a policy, and the price list
should feel like a proud statement rather than fine print.

## Direction

On the intake form they asked for **5 out of 5 "corporate"** rather than "small
business," and named no competitor sites they admire. Read "corporate" as
*polished, confident and premium*, not cold, corporate-blue or generic. This
should look like a salon that knows exactly what it is worth.

They answered "No" to colour and font requests, so the current palette is
sampled from their own roll-up banner, which appears in their photographs: black
ground, gold gradient script wordmark, a yellow accent wedge, warm terracotta.
That is a real brand signal and a reasonable starting point, but it is my
inference, not their instruction. **You may take it further or move away from
it, provided it still reads as theirs.**

The photography is the strongest asset: 84 real photographs of real clients,
warm skin tones, gold and honey braid colours, salon interiors. Design around
that warmth. Let the work be the hero.

## Hard constraints, these are not stylistic

Breaking any of these breaks something already verified and shipped.

1. **All design decisions must resolve to CSS custom properties.** Every colour,
   font, size, space, radius and shadow lives in a single `:root` block. No
   component may hard-code a value. This is what lets your design apply to all
   23 pages at once.
2. **WCAG 2.1 AA, 4.5:1 for body text, 3:1 for UI.** Every pair is currently
   verified. `--color-gold-deep` and `--color-terracotta` were *specifically
   darkened* from the raw banner samples to clear 4.5:1, if you lighten them,
   re-check. State the ratios you land on.
3. **44px minimum on every interactive control** (`--tap-min`). Tap-target size
   is a mobile-SEO ranking input here, not only an accessibility nicety.
4. **No layout shift.** CLS is currently exactly 0. Gallery tiles are locked to
   a 3:4 `aspect-ratio` box and the `<picture>` wrapper must keep
   `height: 100%`, or photos overflow. Type uses `clamp()` so there is no
   step-change at breakpoints. Keep all three.
5. **Fonts.** The site ships system stacks, zero webfont requests, zero
   font-swap reflow. You may introduce a brand typeface, but it must be
   self-hostable, and say which single weight should be preloaded for
   above-the-fold text. Do not propose anything that can only load from a
   third-party CDN.
6. **No JavaScript.** Every page but the booking form ships zero JS. Hover,
   focus, open/closed and the mobile nav are all CSS or native `<details>`.
   Design nothing that needs a script.
7. **Do not change** heading structure, semantic elements, link text, or any
   content. Those carry the SEO work.

## Priorities

The phone call is the primary conversion, the client's own stated primary call
to action. The call button must be the most confident element on screen at every
breakpoint, including mobile, where it stays visible while the nav collapses.
The booking form is secondary and should read as the calmer alternative.

In order of impact: **the homepage hero**, **the price list**, **the gallery
grid**, then the service pages. The hero headline is currently the LCP element ,
keep the largest painted thing as text rather than making it an image.

## What to deliver

1. Restyle all 17 cards so they read as one designed system.
2. A single consolidated `:root { … }` token block containing every final value.
   This is the artefact that gets ported, so make it complete and ordered.
3. For anything that needs more than a token change, a new component variant, a
   changed layout, a decorative treatment, give the specific CSS and name the
   card it belongs to.

## When you are finished

Hand back to Claude Code with a summary containing:

- The final `:root` token block, complete and copy-pasteable.
- Any component-level CSS changes, each labelled with its card filename.
- Contrast ratios for every text/background pair you changed or introduced.
- If you added a typeface: its name, licence, the weights used, and which single
  weight to preload.
- Anything you deliberately left for implementation rather than solving here.

Claude Code will port the token block into `src/styles/tokens.css` and the
component CSS into `src/styles/global.css`, rebuild, and re-run the full audit ,
CLS, contrast, tap targets, title and description lengths, schema validity and
internal links, to confirm the design did not regress anything.
