# Roaming for Applications microsite

Static PEI microsite for **Roaming for Applications: Federating Edge Platforms Across Telecom Operators**.

## Stack

- Astro 7
- Tailwind CSS 4
- SCSS
- Astro Content Collections
- Pages CMS for repository-backed content editing
- GitHub Pages deployment

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Run the complete quality suite (Astro/TypeScript checks, unit tests, production build, and browser tests):

```bash
npx playwright install chromium # first run only
npm test
```

For faster feedback while developing:

```bash
npm run test:unit
npm run test:unit:watch
npm run test:integration # run after npm run build
npm run test:e2e        # run after npm run build
```

## Content

Content is stored in `src/content/`:

- `docs/` — project documents and references
- `milestones/` — project lifecycle and deliverables
- `minutes/` — meeting minutes
- `team/` — students, advisors and collaborators

See [`CONTENT_MANAGEMENT.md`](./CONTENT_MANAGEMENT.md) for Pages CMS instructions.

## Meeting minutes

Minutes support three modes through frontmatter:

```yaml
mode: markdown # website version
mode: pdf      # PDF-only
mode: hybrid   # website + PDF
pdf: /documents/minutes/minute-02.pdf
```

PDFs uploaded through Pages CMS are stored under `public/documents/`.

## Team photos

Student photos can be uploaded through Pages CMS and are stored under `public/images/team/`.
The public Team page reserves a large portrait area for each student. Advisors and collaborators
use a text-only layout.

## Visual identity

The microsite uses a network and edge-cloud palette:

- cool slate — light canvas and surfaces
- deep navy — dark canvas and infrastructure surfaces
- infrastructure blue — primary brand
- indigo and cyan — signal accents

The federation motif connects independent operator platforms through shared interfaces.
