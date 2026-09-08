# Code Summary - Content and Application Foundation

## Outcome

Unit 1 establishes a verified static Next.js foundation and the complete build-time content boundary
for US-010 and US-011. It performs no runtime network requests, stores no application data in a
database, and emits no canonical URL until an approved HTTPS origin is configured.

## Generated application code

- Project/tool configuration: `package.json`, `tsconfig.json`, `next.config.ts`,
  `postcss.config.mjs`, `eslint.config.mjs`, `prettier.config.mjs`, `vitest.config.ts`,
  `.gitignore`, and `.prettierignore`
- Minimal static application: `src/app/`
- Typed site and document configuration: `src/config/`
- Domain and serializable view models: `src/lib/content-application-foundation/domain/`
- Safe filesystem adapters: `src/lib/content-application-foundation/source/`
- Zod schemas and aggregated diagnostics: `src/lib/content-application-foundation/validation/`
- Pure publication/content policies: `src/lib/content-application-foundation/policies/`
- Curated front-matter and MDX compilation: `src/lib/content-application-foundation/compilation/`
- Build context, memoization, and bounded work: `src/lib/content-application-foundation/runtime/`
- Content repositories and application services: `src/lib/content-application-foundation/repositories/`
  and `src/lib/content-application-foundation/services/`
- Local default social asset: `public/media/social/default.svg`
- Opt-in capacity harness: `scripts/benchmark-content.mjs`

## Tests

Tests live under `tests/content-application-foundation/` and cover:

- Slug, filename, duplicate, draft, demo, date, ordering, URL, reading, and document policies
- All schema categories and deterministic aggregated diagnostics
- Metadata, canonical, sitemap, robots, and contribution-absence behavior
- Deterministic file discovery and unsupported-file filtering
- Lexical traversal and junction/symbolic-link escape rejection
- Malformed multi-file content aggregation and curated MDX compilation
- Memoized compiler call counts and bounded-work ordering
- Explicit public-document assets, static slugs, null detail behavior, and route-model data leakage

## Verification evidence

- Formatting check: passed
- ESLint with zero warnings: passed
- Strict TypeScript check: passed
- Vitest: 4 files, 22 tests passed
- Core coverage: 100% statements, 100% functions, 100% lines, 92.56% branches
- Static production build: passed
- Exported application routes: `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`
- Output scan: no `draft: true`, GitHub credential patterns, Windows/Linux absolute workspace paths,
  or unexpected application routes detected
- Capacity benchmark: 750 records and 1,000 media references; validation plus production build
  completed in 7,200.28 ms against a 120,000 ms threshold on Node.js 24.19.0, Windows x64, 12
  logical CPUs

## Key decisions

- Dependencies are exactly pinned and the lockfile reports zero known npm audit vulnerabilities.
- ESLint 9.39.5 and TypeScript 6.0.3 are pinned to remain inside the current Next.js lint stack's
  peer ranges.
- File access verifies both lexical and real-path containment and reports workspace-relative paths.
- Expected authoring failures aggregate into stable project-owned diagnostics.
- MDX accepts curated content capabilities only; no arbitrary executable content is permitted.
- Publication state preserves `draft` and `demo` independently, with a hard production draft guard.
- Canonical, sitemap, and absolute Open Graph values are gated on `NEXT_PUBLIC_SITE_URL`.
- Core coverage scope follows the approved NFR design and retains the 90% branch threshold.

## Follow-ups

- Unit 2 owns the complete visitor-facing navigation, indexes, detail routes, accessible media,
  demonstration projects/posts, truthful reading/doc empty states, and editorial visual system.
- Unit 3 owns Pages CMS configuration, complete authoring workflow polish, broader browser and
  accessibility verification, and Cloudflare Pages preparation after separate deployment approval.
- A real public document must not be configured until its contents are deliberately approved for
  public download.
- Authenticated GitHub contribution fetching remains dormant and separately authorized.

## Extension compliance

- Resiliency Baseline: disabled; extension rules were not loaded or enforced.
- Security Baseline: disabled; core path, content, credential, and output safeguards were still
  implemented from approved project requirements.
- Property-Based Testing: disabled; deterministic example and integration tests satisfy the approved
  Unit 1 plan.

No enabled extension has an unresolved finding.
