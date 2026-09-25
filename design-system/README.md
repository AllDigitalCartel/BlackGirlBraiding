# Design system bundle, Black Girls De Braiding

16 standalone preview files for `/design-sync`. Each opens with a
`@dsCard` marker so the Claude Design pane indexes it automatically, and each
inlines the live `tokens.css` + `global.css`, so what you see here is exactly
what the site ships.

## The one rule

**All colour, type, spacing, radius and elevation live in `src/styles/tokens.css`.**
No component hard-codes a value. Rewriting that one file restyles all 23 pages
without touching a single page, component, schema block or SEO tag.

## Cards

| Group | File |
|---|---|
| Foundations | `foundations-color.html` |
| Foundations | `foundations-type.html` |
| Foundations | `foundations-space.html` |
| Brand | `brand-wordmark.html` |
| Components | `component-buttons.html` |
| Components | `component-service-card.html` |
| Components | `component-price-group.html` |
| Components | `component-gallery-tile.html` |
| Components | `component-chips.html` |
| Components | `component-form.html` |
| Components | `component-faq.html` |
| Components | `component-cta-block.html` |
| Patterns | `pattern-header.html` |
| Patterns | `pattern-footer.html` |
| Patterns | `pattern-hero.html` |
| Patterns | `pattern-breadcrumbs.html` |

## Regenerate

```bash
node scripts/build-design-system.mjs
```

Run this after editing `tokens.css` or `global.css` so the previews never drift
from the live site.

## Open questions for the design pass

1. **Logo**, the client uploaded a logo to the intake form but it was not in the
   hand-off. The header currently uses a type-only lockup derived from their
   roll-up banner. Swap it in `SiteHeader.astro`.
2. **Webfont**, the site ships system fonts for zero render-blocking cost and
   zero font-swap CLS. If a brand serif is introduced, self-host it, preload the
   one above-the-fold weight, and set `font-display: swap`.
3. **Palette**, derived from the salon's banner, not from a client brief; they
   answered "No" to colour and font requests. Confirm before it becomes canon.
