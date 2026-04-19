import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    cat: z.string(),                          // 'language' | 'cs' | 'devops' | ...
    sub: z.string(),                          // 'java' | 'db' | 'containers' | ...
    tags: z.array(z.string()).default([]),
    readMin: z.number().optional(),
    pinned: z.boolean().default(false),
    series: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
