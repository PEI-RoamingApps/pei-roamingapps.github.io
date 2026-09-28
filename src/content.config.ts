import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const status = z.enum(['planned', 'in-progress', 'done']);

const milestones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/milestones' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    status,
    start: z.date().optional(),
    end: z.date().optional(),
    summary: z.string(),
    deliverables: z.array(z.object({ title: z.string(), status: z.string() })).default([]),
    // Optional public Canva deck rendered inline on the milestone detail page.
    canvaPresentation: z.object({
      title: z.string(),
      embedUrl: z.string().url(),
    }).optional(),
    presentations: z.array(z.object({ title: z.string(), href: z.string().optional() })).default([]),
    reports: z.array(z.object({ title: z.string(), href: z.string().optional() })).default([]),
  }),
});

const minutes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/minutes' }),
  schema: z.object({
    index: z.number(),
    date: z.date(),
    subject: z.string(),
    attendees: z.array(z.string()).default([]),
    summary: z.string().optional(),
    scheduled: z.boolean().default(false),
    mode: z.enum(['markdown', 'pdf', 'hybrid']).default('markdown'),
    pdf: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    group: z.enum(['student', 'advisor', 'collaborator']).default('student'),
    affiliation: z.string().optional(),
    initials: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    role: z.string(),
    focus: z.string().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    order: z.number(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['vision', 'architecture', 'requirements', 'presentations', 'reports', 'research', 'compliance']),
    milestone: z.string().optional(),
    state: z.string(),
    file: z.string().optional(),
    href: z.string().optional(),
    format: z.string().default('MD'),
    order: z.number().default(0),
  }),
});

export const collections = { milestones, minutes, team, docs };
