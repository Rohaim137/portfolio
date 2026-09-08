# Rohaim Portfolio

A static-first personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, and
repository-authored Markdown or MDX content.

The current implementation contains the validated content and metadata foundation. Visitor-facing
portfolio routes and demonstration content are added in the next unit; deployment preparation is a
later unit.

## Requirements

- Node.js 22.12 or newer (Node.js 24 LTS is verified)
- npm 11 or newer

## Local commands

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000` while the development server is running.

Quality and production commands:

```powershell
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
```

The static production artifact is written to `out/`.

The capacity benchmark is deliberately opt-in because it creates 750 temporary content records and
runs a production build:

```powershell
npm run benchmark:content -- --run
```

## Content locations

- Projects: `content/projects/*.md` or `content/projects/*.mdx`
- Posts: `content/blog/*.md` or `content/blog/*.mdx`
- Reading records: `content/reading/*.md` or `content/reading/*.mdx`
- Site and social configuration: `src/config/site.ts`
- Explicit public-document manifest: `src/config/documents.ts`
- Public document assets: `public/documents/`

Every content filename stem must exactly match its lowercase kebab-case `slug`. Required front
matter differs by collection and is validated before route models are released. Errors are reported
together with stable codes, source paths, and field paths.

## Drafts and demonstration content

`draft` and `demo` are independent Boolean fields:

- `draft: true` excludes a record from ordinary lists and static detail routes. Production builds
  reject attempts to enable draft inclusion.
- `demo: true` keeps the record public but preserves a presentation-visible demonstration state.
- To replace a demonstration with genuine work, update its factual content and set `demo: false`.
- A draft demonstration remains excluded because `demo` never overrides `draft`.

No minimum demonstration count is enforced by the ongoing content pipeline.

## Publishing content

1. Add a Markdown or MDX file to the appropriate collection.
2. Give it an explicit slug matching the filename.
3. Fill every required front-matter field and use real ISO `YYYY-MM-DD` calendar dates.
4. Use HTTPS for external web destinations.
5. Run `npm run typecheck`, `npm test`, and `npm run build`.
6. Review the generated `out/` directory before committing and deploying.

MDX is curated. Content cannot use import/export statements, scripts, raw HTML, executable URL
protocols, inline event handlers, arbitrary JavaScript expressions, or undeclared components.

## Public documents and secrets

Files under `public/` are copied into the downloadable static artifact. Never place private records,
credentials, access tokens, salary information, identity documents, or other sensitive material
there.

A document is listed only when it appears in `src/config/documents.ts` and the corresponding file
exists beneath `public/documents/`. Files are never published by directory enumeration.

Environment and secret files are excluded by `.gitignore`. GitHub contribution data is optional,
read-only generated data; the application performs no authenticated or browser-time GitHub fetch.

## Production origin

Canonical URLs, absolute social-image URLs, and sitemap entries remain disabled until the production
hostname is approved. Configure it only at build time with an HTTPS origin:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-approved-domain.example"
npm run build
```

Without this setting, the local build remains valid and does not emit misleading localhost
canonicals.
