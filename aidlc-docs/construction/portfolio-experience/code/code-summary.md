# Unit 2 Code Summary - Portfolio Experience

## Outcome

Unit 2 implements the complete static visitor experience on top of the approved Unit 1 content and metadata foundation. The site now has a responsive editorial shell, a complete overview, project and blog indexes and details, truthful reading and document states, a replaceable About structure, recovery navigation, route metadata, discovery output, and focused client-side enhancements.

Personal facts that have not been supplied remain generic presentation copy. The six production-visible example records are explicitly marked `demo: true` and state that they are not the owner's work, experience, or opinion.

## Generated Application Areas

- `src/app/`: overview, About, projects, blog, reading, documents, not-found, and sitemap integration
- `src/components/layout/`: shared header, footer, social destinations, and responsive navigation
- `src/components/home/`: complete seven-section overview composition
- `src/components/projects/`: cards, filtering, case studies, gallery, and image lightbox
- `src/components/blog/`: post lists, article layout, and eligible table of contents
- `src/components/reading/`: grouped reading and reusable detail presentation
- `src/components/documents/`: explicit public-document and unavailable states
- `src/components/ui/`: semantic actions, Demo states, empty states, status labels, media, icons, and curated compiled content
- `src/lib/portfolio-experience/`: pure presentation, provenance, filtering, navigation, lightbox, copy, and table-of-contents state

## Content and Assets

- Three demonstration projects under `content/projects/`
- Three demonstration posts under `content/blog/`
- Three distinct local abstract SVG covers under `public/media/projects/`
- No genuine reading records or public documents were invented
- No repository, deployment, client, employment, metric, result, or owner-attributed claim was fabricated

## Static Routes

- Fixed pages: `/`, `/about/`, `/projects/`, `/blog/`, `/reading/`, `/docs/`
- Project details: `/projects/content-system-demo/`, `/projects/data-workflow-demo/`, `/projects/editorial-interface-demo/`
- Blog details: `/blog/accessible-state-demo/`, `/blog/reliable-content-models-demo/`, `/blog/static-boundaries-demo/`
- Framework output: custom not-found page, `/robots.txt`, and `/sitemap.xml`

The reading detail presentation is ready for reuse, but `/reading/[slug]/` is intentionally not active while the collection is empty. Next.js static export requires at least one generated parameter for a dynamic route; activating a fake route would contradict the truthful-content requirement.

## Tests and Verification

- Formatting: Prettier check passed
- Static analysis: ESLint passed with zero warnings
- Types: strict TypeScript check passed
- Tests: 10 files and 58 tests passed across Units 1 and 2
- Coverage: 98.54% statements, 93.58% branches, 97% functions, and 99.22% lines
- Accessibility: representative shell, project-filter, and lightbox DOM states passed axe checks; keyboard and focus transitions have explicit interaction tests
- Capacity: 750 records across three collections validated and built in 8.45 seconds against the 120-second threshold
- Production export: all 16 framework pages generated successfully
- Client scope: navigation ships with the shared shell, project filtering ships only on `/projects/`, and lightbox code ships only on project detail routes
- Output safety: no draft markers, credential patterns, absolute workspace paths, prohibited filler, external placeholder image services, stale temporary origin, or ungated canonical URLs were found
- Origin behavior: without `NEXT_PUBLIC_SITE_URL`, sitemap and canonical URLs remain safely empty; a temporary HTTPS example-origin build verified all 11 eligible sitemap URLs and local social-image fallbacks

A live browser screenshot pass could not run because the connected Computer Use environment reported no browser surface. DOM interaction tests, generated HTML inspection, responsive CSS review, reduced-motion rules, and overflow safeguards passed. A live narrow/wide visual and keyboard pass remains documented for Unit 3.

## Replacement Guidance

- Add verified personal information and social destinations in `src/config/site.ts`.
- Replace each `*-demo.mdx` record with factual content before changing its `demo` flag to `false`.
- Add genuine reading records under `content/reading/`; activate the reading detail route only when at least one eligible body exists.
- Place a deliberately public document under `public/documents/` and list it in `src/config/documents.ts` only after disclosure review.
- Set `NEXT_PUBLIC_SITE_URL` only when the production HTTPS hostname is approved.

## Unit 3 Follow-ups

- Pages CMS and authoring workflow integration
- CI quality and static-build workflow
- Cloudflare Pages delivery preparation without deployment until separately authorized
- Live-browser narrow and wide visual, keyboard, contrast, overflow, and Lighthouse review
- Optional build-time GitHub contribution data only with separate authorization and secret handling

## Extension Compliance

- Resiliency Baseline: N/A; disabled during Requirements Analysis
- Security Baseline: N/A; disabled during Requirements Analysis; core repository safety controls still passed
- Property-Based Testing: N/A; disabled during Requirements Analysis

No enabled extension rule has a blocking finding.
