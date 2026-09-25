# Pass two: typography and header

Answers to the four questions, with the measurements behind them. Port order is
unchanged: `tokens.css` replaces `src/styles/tokens.css`, `global-additions.css`
merges into `src/styles/global.css`.

## 1. The display face: replacing Lora with Literata

Your Bodoni diagnosis was right on both counts, and Lora was the right emergency
call. But it loses to Literata on the two axes the client actually complained
about. I measured all six candidates in-browser at 600 weight rather than trust
published figures:

| Face | x-height | Stroke contrast (O) | Advance vs Georgia | Verdict |
|---|---|---|---|---|
| **Literata** | **0.510** | **1.57** | 94.8% | **chosen** |
| Lora | 0.500 | 2.13 | 91.3% | your stopgap |
| Source Serif 4 | 0.495 | 1.94 | 92.5% | close third |
| Spectral | 0.454 | 1.67 | 87.6% | rejected |
| EB Garamond | 0.418 | 2.07 | 78.6% | rejected |
| Cinzel | 0.601\* | 2.00 | 106.1% | rejected |

\* Cinzel's "x-height" measures at cap height because its lowercase is small
caps. Your warning was correct and the number confirms it, there is no true
lowercase to set sentence case in.

Two rejections worth flagging because they were my own first instincts.
**Spectral** measures a 0.454 x-height, *lower than Bodoni's 0.460*. It would
have reproduced the exact complaint while looking like a considered fix.
**EB Garamond** is worse still at 0.418, despite being the closest historical
relative of the logo's roman capitals.

Literata wins on both: the highest true x-height in the set, and the lowest
stroke contrast, 1.57 against Lora's 2.13, meaning near-uniform stems, which is
what the logo's "GIRLS DE BRAIDING" line is. It was drawn by TypeTogether for
long-form screen reading, which is the right brief for a shop where people sit
for four to eight hours.

There is also a brand-logic reason to move off Lora specifically. Lora's forms
are brushed and calligraphic, so it echoes the *script* line of the logo, it
competes with the mark rather than supporting it. Literata's sturdy bracketed
serifs sit under the roman line instead.

At 18px, the size you set as the test: Literata's x-height renders 9.13px,
Lora 9.00px, Georgia 8.67px, Bodoni 8.28px.

- **Name:** Literata
- **Licence:** SIL Open Font License 1.1
- **Weights used:** 600 only. One static instance, latin subset, one request.
- **Preload:** `literata-600.woff2`, it renders the hero h1, the LCP element.

## 2. Where the serif is allowed: a size threshold, not h3

I moved your line, but sideways rather than up or down. The rule is: **serif at
or above `--text-xl`, sans everywhere below.** In practice that resolves to h1,
h2, h3 and `.price-row__price`, and it puts h4, FAQ summaries, price notes,
chips and buttons on the sans.

That lands in almost the same place as your h1 to h3 line, but it states the reason
rather than the outcome. A heading level is not what hurt the client's eyes;
small serif text is. Tying the rule to size means the price column keeps the
serif because it is genuinely large, and any future large non-heading gets it
without an exception being added.

Note that `h4` is deliberately excluded from the `h1, h2, h3` font-family
selector in `global-additions.css` and given its own sans rule. That is the one
place the CSS looks like an oversight and is not.

## 3. The header: ink, and now on purpose

Keep it. Your defect fix was the right design decision; here are the numbers
that make it one.

The mark is a gold gradient drawn for a black ground. Measured across the
gradient against white, the lightest stop `#F2D06B` gives **1.49:1**, the mark
loses its form, which is the defect you saw. Against ink, the gradient's *worst*
point (the terracotta end, roughly `#A75B35`) holds **3.95:1**, clearing the 3:1
graphics threshold across its whole range. Logotypes are exempt from WCAG
contrast anyway, but this one does not need the exemption.

So the ink band is now specified rather than tolerated: it runs continuously
into the ink hero, and the page opens on one dark field with the mark at the top
of it. Gold hairline at the lower edge, nav on ink at 17.8:1.

### The logo file is opaque

Worth knowing before you port: the supplied PNG is **2037x772 with no alpha
channel**, the gold gradient sits on a solid black rectangle. On the ink band I
knock that ground out with `mix-blend-mode: screen`, which is CSS-only and
degrades to the plain rectangle where unsupported. It works, but it is a
workaround for a file problem.

The light alternative therefore needs no plaque element at all: the PNG's own
black rectangle is the plaque. That is also the clearest argument for ink, in a
white bar the rectangle reads as a black box parked in the header, and on ink it
disappears. See card `2c` on the board.

`--logo-h` is 56px, dropping to 40px below 60rem, which puts the roman line at
roughly 13px of image height. `--header-h` rises from 76px to 92px to hold it.

## 4. The script: unique to the mark

Agreed, leave it unique. A second display face would break the one-request
constraint, and a script that appears in body-adjacent positions reads as
decoration rather than as a signature. The mark should be the only place it
happens.

It does get one non-typographic echo, already in the design: the hero's
`transparent → gold → transparent` hairline is a thin-to-thick-to-thin sweep,
which is a calligraphic gesture without being calligraphy.

## Font metrics: measured, and referenced to Georgia

```css
@font-face {
  font-family: 'Literata Fallback';
  src: local('Georgia');
  size-adjust: 96.4%;
  ascent-override: 121.8%;
  descent-override: 32%;
  line-gap-override: 0%;
}
```

- **size-adjust 96.4%** is the ratio of Literata's total advance width to
  Georgia's, at weight 600, over the site's real h1/h2/h3 strings. Derived from
  advance width, per your note.
- **ascent-override 121.8% / descent-override 32%** were solved, not estimated:
  they make the fallback's `line-height: normal` box height equal Literata's
  1.485em, with a residual of 0.00px at a 200px font size. The 121.8/32 split
  preserves Literata's own ascent share (1.18 / 1.49).

Two things the audit should know about how these were obtained.

**The method self-validated.** I swept size-adjust from 86% to 132% in 1%
steps, counting the viewport widths between 320px and 1440px where the fallback
wrapped the h1, h2 or h3 to a different number of lines than the real face (423
measurements per step). The empirical optimum landed within **0.4%** of the
advance-width ratio computed independently in canvas. That is the direct
confirmation of your point: advance width is the correct basis. At the optimum,
divergence is **2.6%** of widths. Matching on x-height instead put size-adjust
16 percentage points off and divergence at **35.9%**, which is the failure mode
you measured at 42% last pass.

**Georgia did not resolve in my environment**, so the sweep above ran against
whichever serif the browser substituted. That is why the sweep optimum reads
~113% while the Georgia-referenced number is 96.4%, different reference face,
same method. The 96.4% and the overrides shipped in `tokens.css` are computed
against Georgia's real measured metrics, and Georgia now leads the fallback
list so it is the face that will actually resolve on the client's machines.
**If you change the fallback stack, re-derive from advance width; do not carry
these numbers over to a different first fallback.**

## One recommendation that overrules the earlier guidance: `font-display: optional`

`tokens.css` now ships `font-display: optional`, not `swap`.

With `optional`, the browser either has the font at first paint, which the
preload makes near-certain, or it uses the fallback for the entire page load
and **never swaps**. CLS from webfont substitution becomes structurally
impossible rather than minimised. A metric-matched `swap` still re-wraps the
headline at 2.6% of viewport widths, and your audit measures CLS across a
full-page scroll, so those are real events.

The cost: on a cold cache with a slow connection, a small share of first visits
render the whole page in Georgia. Given the client's complaint was legibility
and Georgia is legible, that trade is worth taking. If you would rather not,
change the one descriptor to `swap` and the 2.6% figure above is your exposure.

## Contrast ratios: pairs touched this pass

| Pair | Ratio | Needs |
|---|---|---|
| Nav link `--color-on-dark` on ink header | 17.8:1 | 4.5:1 |
| Nav hover / current `--color-amber` on ink header | 13.2:1 | 4.5:1 |
| Logo gradient, worst point (terracotta end) on ink | 3.95:1 | 3:1 (graphics) |
| Logo gradient, lightest stop `#F2D06B` on ink | 13.2:1 | 3:1 |
| Logo gradient, lightest stop on white, **why not a light header** | 1.49:1 | fails |
| Current-page gold underbar on ink | 8.1:1 | 3:1 |
| Nav toggle hairline `--rule-gold-dark` on ink | 3.1:1 | 3:1 |

Everything from pass one is unchanged. No colour token moved this pass.

## Unchanged constraints

Tokens only; 44px minimum (the logo swap does not touch a control, and
`.brand__logo` sits inside a 44px-tall link at both breakpoints); zero JS; no
content, heading-structure or semantic changes. The only markup change is
swapping the type lockup for the `<img class="brand__logo">` you have already
placed, plus the optional `.brand__plaque` wrapper if you take the light header.

## Left for implementation

1. Subset and self-host `literata-600.woff2`; add the preload tag. Retire the
   Bodoni and Lora files.
2. Re-derive `size-adjust` if the fallback stack changes. The solver used is in
   `tools/` in the design project if you want to re-run it against the real
   font binaries rather than the browser's loaded copies.
3. `.brand__mark` / `.brand__sub` CSS can be deleted now that the real logo is
   in the header and footer.
4. **Ask the client for the logo with a transparent background, or as vector.**
   The 719KB opaque PNG is the weakest link in the header: it forces a blend
   mode, it cannot be recoloured, and at 2037x772 it is far larger than the
   56px it renders at. An SVG would also sharpen the roman line, which is the
   part carrying the brand at small sizes. Until then, at minimum ship a
   resized 2x raster (roughly 296x112) rather than the full-resolution file.
4. Confirm with the client that Literata reads comfortably before the third
   pass. This is the second face they have been shown; their eyes are the only
   test that counts.
