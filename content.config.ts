import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Shorter title for the <title> tag when the on-page H1 is long. */
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Black Girls De Braiding'),
    tags: z.array(z.string()).default([]),
    /** Gallery slug used as the article's lead image + OG image. */
    heroSlug: z.string().optional(),
    /** Internal tracking only. NEVER render this to the page: it is a note to
     *  us, and the site is client-facing. Query it in the repo, not on screen. */
    draftForClientReview: z.boolean().default(false),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { blog };
