# Black Girls De Braiding

Website for **Black Girls De Braiding**, a braiding salon at 4121 Chatelain Rd #202,
Annandale, VA 22003.

- **Live**: https://blackgirlsbraiding.com
- **Stack**: Astro 5, static output, zero JavaScript on every page except the
  mobile nav toggle, the gallery lightbox and the booking form
- **Host**: Firebase Hosting, project `blackgirlsbraiding`
- **Pages**: 23 static HTML pages, 84 photographs, 83 published prices

```bash
npm install
npm run dev      # localhost:4321
npm run build    # -> dist/
npm run ship -- "what changed"   # commit, push to GitHub, deploy to Firebase
```

---

## Deploying

There are two routes and they end in the same place.

**By hand**, which is what has been used so far:

```bash
npm run ship -- "what changed"
```

It commits, pushes to every git remote, then deploys. It refuses to deploy if a
push fails, so GitHub can never be behind what is live.

**By CI**: pushing to `main` builds and deploys via
`.github/workflows/firebase-hosting-merge.yml`. Pull requests get a throwaway
preview URL. This needs one repo secret that has to be minted in the console:

> Firebase Console → gear → Project settings → Service accounts →
> Generate new private key → save the JSON as the repo secret
> `FIREBASE_SERVICE_ACCOUNT_BLACKGIRLSBRAIDING`

The six `PUBLIC_FIREBASE_*` secrets are already set. Until the service account
secret exists, CI still runs and still verifies that the commit builds, and it
skips the deploy with a notice rather than failing. Add the secret and the next
push deploys on its own, with no change to the workflow.

`firebase deploy` alone is also safe: `firebase.json` has a `predeploy` hook that
runs the real build, so the sitemap copy and the heading audit cannot be skipped.

Firestore rules are separate and rarely change:

```bash
firebase deploy --only firestore:rules
```

---

## Where things live

Content is data, not markup. Editing a page usually means editing one of these.

| File | Holds |
|---|---|
| `src/data/site.js` | NAP, hours, deposit, socials, the canonical origin. One source of truth for all of it. |
| `src/data/prices.js` | The client's 98-item price list. 83 published, `MISSING_REFS` lists the rest. |
| `src/data/services.js` | The 11 service families: copy, FAQs, meta, which price groups and photo categories each owns. |
| `src/data/gallery.js` | All 84 photographs with hand-written alt text and a category. |
| `src/styles/tokens.css` | Every colour, type size, space and radius. No component hard-codes a value. |

Build-time helpers in `scripts/`: `lastmod.mjs` dates each route from git history,
`audit-headings.mjs` fails the build on bad H1s, `post-build.mjs` copies the
sitemap, `ship.mjs` is the deploy command above.

---

## Things that will bite you

Every one of these was a real bug. They are written down so they are not
rediscovered.

**The origin is read in two different contexts.** `src/data/site.js` checks
`process.env` *and* `import.meta.env`, and both are needed. Page components run
through Vite and see `import.meta.env`; `astro.config.mjs` imports the same file
in plain Node where `import.meta.env` is undefined, and the sitemap integration
takes its origin from *that* context. Reading only one built canonicals on one
host while the sitemap listed every URL under another.

**The CSP blocks inline scripts.** `script-src 'self'`, so every script must be an
external file. `vite.build.assetsInlineLimit` is `0` to force that. An inline
`<script>` will silently do nothing in production while working fine in dev.

**`<Picture>` breaks height chains.** Astro wraps the `<img>` in a `<picture>`, and
the lightbox adds an `<a>` on top of that. Anything between `.gallery-item` and
the `<img>` needs `display:block; width:100%; height:100%` or the photo overflows
its aspect-ratio box. There are two copies of that rule in `global.css`; both are
marked KEEP.

**Do not let two things describe the same fact.** Nearly every defect found in
this codebase was one fact rendered in two places that drifted apart: hours in
four markups, two offer builders, a price count in the schema and a different one
in `llms.txt`, a gallery category claimed by two services. When you add
something, derive it, do not retype it.

**Monday is deliberately absent from `openingHoursSpecification`.** The salon is
Monday by appointment only, and schema.org cannot express that. Any `opens`/
`closes` pair there is a false claim Google renders as normal hours. The visible
page and the FAQ both say it in words instead.

---

## Outstanding

Nothing blocks the site running. These need the client or the console.

| Item | Needs |
|---|---|
| `www` serves at 200 instead of 301 to the apex | Re-add `www` in the Firebase console as a redirect, or attach it to a second Hosting site whose only rule is a catch-all 301. Note HSTS is `includeSubDomains; preload`, so re-provisioning can hard-fail `www` for up to 24h. |
| CI deploy step | The service account secret above. |
| Price items 35 to 50 | Not legible in anything the client supplied. |
| Instagram in `sameAs` | The current link is a single reel, not a profile. Needs the profile URL. |
| Google Business Profile | No GBP link anywhere. This is the biggest remaining local gap, and the route to reviews. |
| A named person | No `Person` node exists, so "who does box braids near Annandale" has no answer. Needs confirmation of whether Linda braids or manages before writing anything. |
| Real Core Web Vitals | PageSpeed field data is unmeasured. Set `PSI_API_KEY` to a free Google Cloud key. |
| Photos of locs, sew-ins and men's work | Those three pages borrow other styles' photographs and say so. Real photos would let them stop. |

---

## SEO contract

The site is built and audited against 12 pillars: HTTPS & Security, URL
Structure, Robots.txt, XML Sitemap, Crawlability, Indexability, Internal Linking,
Schema Markup, Core Web Vitals, Mobile SEO, Image SEO, AI SEO Readiness.

At last audit, 11 of 12 scored 10.0 against the live site. The exception is HTTPS
& Security at 9.2, from the `www` redirect above.

Two rules the copy has to keep. **No em dashes**, in any of their forms: use a
colon or a full stop. And **write for the customer, not about the website**: no
meta-commentary, no filler, no dated claims.

---

Smart website built by [Render Analytics](https://renderanalytics.net/).
