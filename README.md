# Muhammad Rohaim — Portfolio

A static-first personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, and
repository-authored Markdown or MDX. The site now includes a CV-backed profile, verified project
summaries, clearly labelled demonstration content, accessible portfolio interactions, guarded
owner-authoring workflows, automated quality checks, and deployment preparation.

No database, runtime CMS, analytics tracker, visitor account, or contact backend is required. The
production site has not been deployed.

## Requirements

- Node.js 22.12 or newer; Node.js 24 LTS is verified
- npm 11 or newer

Run commands from this project directory: the folder containing this README and `package.json`.

## Run locally

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`. Using `npm.cmd` avoids the Windows PowerShell execution-policy error
that can block `npm.ps1`; it does not weaken or change that policy.

## Verify the project

The canonical fail-fast command checks formatting, zero-warning lint, strict types, coverage, the
static production build, Pages CMS parity, artifact integrity, public-document safety, and
detectable design constraints:

```powershell
npm.cmd run verify
```

Install the pinned Chromium build once, then run the real-browser journeys:

```powershell
npm.cmd run playwright:install
npm.cmd run test:e2e
```

The capacity benchmark is deliberately opt-in because it generates 750 temporary records and runs a
production build:

```powershell
npm.cmd run benchmark:content -- --run
```

The static artifact is written to `out/`. Individual checks remain available through `format:check`,
`lint`, `typecheck`, `test`, `test:coverage`, `build`, and the `audit:*` scripts in `package.json`.

## Published routes

- `/` — portfolio overview using CV-backed identity and professional summary
- `/about/` — skills, education, work timeline, and replaceable profile details
- `/projects/` — three verified summaries plus three visibly labelled demonstration projects
- `/projects/[slug]/` — statically generated case studies and accessible media
- `/blog/` and `/blog/[slug]/` — three visibly labelled demonstration articles
- `/reading/` — truthful empty state until genuine reading records are published
- `/docs/` — truthful unavailable state until a document is deliberately made public
- `/robots.txt` and `/sitemap.xml` — static discovery output

The site configuration intentionally leaves unsupported personal details pending. The X destination,
for example, remains visible as a pending link instead of inventing an account.

## Update profile and content

- Profile and social configuration: `src/config/site.ts`
- Projects: `content/projects/*.md` or `content/projects/*.mdx`
- Posts: `content/blog/*.md` or `content/blog/*.mdx`
- Reading records: `content/reading/*.md` or `content/reading/*.mdx`
- Public-document allowlist: `src/config/documents.ts`
- Public document files: `public/documents/`
- Project media: `public/media/projects/`

Every content filename stem must exactly match its lowercase kebab-case `slug`. `draft` and `demo`
are independent: drafts do not publish, while demos remain public with an explicit disclosure. Never
turn a demo into an owner claim merely by changing `demo: false`; replace its title, summary, body,
dates, media, and optional destinations with verified facts.

Complete local, direct-GitHub, and Pages CMS instructions—including schemas, review checks, public
documents, failure recovery, and safe demo replacement—are in
[`docs/authoring.md`](docs/authoring.md).

## Optional owner editor

`.pages.yml` configures Pages CMS as an optional repository editor for projects, posts, reading
metadata, and bounded project media. It does not add an `/admin` route or runtime CMS to the public
site. It cannot edit site identity, workflows, scripts, public documents, or deployment settings,
and it cannot trigger deployment actions. Reading bodies stay read-only until a public
reading-detail route exists.

To use it, sign in to Pages CMS with the GitHub account that can edit this repository, select the
repository, create or edit a draft, review the resulting Git change, and let the same repository
verification run before merging. Repository files and pull requests remain the source of truth.

## CI and deployment preparation

`.github/workflows/quality.yml` runs the canonical verifier, benchmark, artifact handoff, and
browser journeys for pull requests, main-branch pushes, or a manual diagnostic run. It has read-only
repository permission and contains no deployment capability or secret reference.

`.github/workflows/deploy-pages.yml` is a separate manual-only Cloudflare Pages Direct Upload path.
It requires an exact commit SHA, approved HTTPS production origin, existing isolated Pages project,
the `DEPLOY` confirmation value, protected production environment, and environment-scoped Cloudflare
credentials. It has not been dispatched or connected to an external account.

The complete setup, preflight, smoke-test, evidence, and rollback procedure is in
[`docs/deployment.md`](docs/deployment.md). The final production upload must wait for Build and Test
completion and a fresh, explicit permission request immediately before deployment.

## Production origin and public-file safety

Canonical URLs and absolute social-image URLs remain disabled until an approved hostname is supplied
at build time:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-approved-domain.example"
npm.cmd run build
```

Without that variable, local builds deliberately emit no localhost canonical. Everything beneath
`public/` is copied into the downloadable static artifact, so never place credentials, tokens,
identity documents, private records, or other sensitive material there. A document appears on the
site only when both its allowlist entry and public file exist.
