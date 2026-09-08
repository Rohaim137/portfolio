# Code Generation Plan - Content and Application Foundation

## Authority and Location

This document is the single source of truth for Unit 1 Code Generation.

- **Workspace root**: `/home/muhammadrohaim/Downloads/port`
- **Application and configuration code**: Workspace root only, primarily under `src/`
- **Unit implementation namespace**: `src/lib/content-application-foundation/`
- **Tests**: `tests/content-application-foundation/`
- **Documentation summary**: `aidlc-docs/construction/content-application-foundation/code/`
- **Forbidden application location**: `aidlc-docs/`

## Unit Context

- **Unit**: Unit 1 - Content and Application Foundation
- **Primary stories**: US-010 and US-011
- **Supporting contracts**: Typed content, social, metadata, and build foundations for US-002 through US-009 and US-014
- **Dependencies on earlier units**: None
- **Dependents**: Unit 2 consumes schemas, services, view models, metadata, and route foundations; Unit 3 consumes commands, tests, authoring contracts, and static output.
- **Database entities**: None
- **Network API**: None
- **Runtime service**: None

## Expected Interfaces

- Typed site configuration and exhaustive active or pending social destinations
- Project, post, reading, document, media, metadata, and optional contribution-data types
- Constrained file source, validation registry, policy engine, MDX compiler boundary, repositories, query service, and metadata service
- Published list, detail lookup, static slug, grouped reading, public document, and home view-model functions
- Stable project-owned `ContentError` and aggregated diagnostic report

## Planning Checklist

- [x] Read Unit 1 definition, story map, dependencies, Functional Design, NFR Requirements, and NFR Design.
- [x] Confirm Unit 1 is ready for code generation.
- [x] Confirm application and documentation target directories.
- [x] Map exact generation steps to Unit 1 stories and design artifacts.
- [x] Identify API, database, frontend, and deployment activities as not applicable or deferred where appropriate.
- [x] Create the numbered executable generation sequence below.
- [x] Log the approval prompt before requesting approval.
- [x] Obtain explicit approval of the complete generation plan.

## Numbered Generation Sequence

### Step 1: Toolchain and dependency resolution

- [x] Reconfirm Node.js and npm versions and inspect the workspace for changes made after planning.
- [x] Query stable package metadata and official compatibility guidance for the selected Next.js, React, TypeScript, Tailwind CSS, Vitest, schema, front-matter, and MDX packages.
- [x] Resolve one compatible stable dependency set without prereleases or forced peer overrides.
- [x] Create `package.json` and `package-lock.json` at the workspace root.
- [x] Create a project-appropriate `.gitignore` before the first GitHub push.

**Story mapping**: US-010, US-014 support

### Step 2: Greenfield project and static-export configuration

- [x] Create `tsconfig.json`, `next.config.ts`, PostCSS or Tailwind configuration as required by the selected stable release, ESLint configuration, Prettier configuration, Vitest configuration, and coverage thresholds.
- [x] Create the minimal `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/not-found.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts` needed to validate the static foundation.
- [x] Add stable scripts for development, formatting check, linting, type checking, unit tests, coverage, capacity benchmark, and static build.

**Story mapping**: US-011, US-014 support

### Step 3: Domain contracts and configuration

- [x] Create Unit 1 domain types under `src/lib/content-application-foundation/domain/`.
- [x] Create typed site configuration with the verified GitHub URL and pending LinkedIn, X, and email states.
- [x] Create discriminated unions for publication, destinations, validation, media, and optional contribution data.
- [x] Keep serializable view-model types separate from server-only adapters.

**Story mapping**: US-010; supports US-002 through US-009

### Step 4: Safe source and path adapters

- [x] Create server-only collection scanning and safe file-reading adapters under `src/lib/content-application-foundation/source/`.
- [x] Enforce configured roots, supported extensions, deterministic enumeration, traversal rejection, and symbolic-link containment.
- [x] Return workspace-relative diagnostic paths.

**Story mapping**: US-010

### Step 5: Schemas and aggregated diagnostics

- [x] Create schemas under `src/lib/content-application-foundation/validation/` for site, project, post, reading, document, media, and generated contribution data.
- [x] Create stable project-owned diagnostic codes, collector, sorting, grouping, and terminal formatting.
- [x] Aggregate detectable issues instead of stopping at the first content error.

**Story mapping**: US-010

### Step 6: Pure business policies

- [x] Implement slug syntax and filename agreement, duplicate indexing, visibility, ISO calendar validation, deterministic ordering, URL protocol rules, reading detail eligibility, document path rules, and social destination resolution.
- [x] Implement the production guard that forbids draft inclusion.
- [x] Preserve `demo` state without enforcing a permanent demo-count invariant.

**Story mapping**: US-010; supports US-003, US-005, US-007 through US-009

### Step 7: Curated content compilation

- [x] Implement front-matter extraction and the MDX safety inspection boundary.
- [x] Implement the selected compatible build-time Markdown or MDX compiler adapter.
- [x] Reject imports, exports, scripts, unsafe raw HTML, executable URLs, and undeclared components.
- [x] Derive headings with deterministic anchors and reading-time estimates.

**Story mapping**: US-010; supports US-004 and US-006

### Step 8: Build context, memoization, and bounded work

- [x] Implement `BuildContext`, process-scoped content-fingerprint memoization, and a bounded work scheduler.
- [x] Ensure concurrency never changes result or diagnostic order.
- [x] Expose test instrumentation without leaking it into route models.

**Story mapping**: US-010, US-014 support

### Step 9: Content repositories and application services

- [x] Implement project, blog, reading, and document repositories.
- [x] Implement published list, featured or latest list, detail lookup, static slug, grouping, and explicit empty-result behavior.
- [x] Implement `PortfolioQueryService` and dormant `ContributionDataReader` with no network access.

**Story mapping**: US-010; supports US-002 through US-009

### Step 10: Metadata and discovery services

- [x] Implement index and detail metadata factories, local social-image fallback, canonical gating, sitemap entries, and robots definition.
- [x] Connect the minimal route scaffold to validated site configuration and discovery services without adding Unit 2 presentation.

**Story mapping**: US-011

### Step 11: Business logic unit tests

- [x] Create focused tests under `tests/content-application-foundation/` for every business-rule category.
- [x] Cover success and relevant negative cases for slugs, duplicates, drafts, demos, dates, ordering, URLs, reading eligibility, documents, metadata, and contribution absence.
- [x] Verify timezone, locale, wall-clock, file-order, and network independence.

**Story mapping**: US-010, US-011

### Step 12: Adapter and service integration tests

- [x] Test traversal and symbolic-link escape, unsupported files, malformed front matter, aggregated errors, curated compilation, caching call counts, bounded work, public-document assets, and static slugs.
- [x] Use temporary directories or isolated fixtures; never modify real content collections.
- [x] Verify that route-facing models contain no secrets or absolute paths.

**Story mapping**: US-010, US-011, US-014 support

### Step 13: Capacity benchmark harness

- [x] Create an opt-in script that generates temporary deterministic fixtures for 250 records per collection and 1,000 media references.
- [x] Measure validation and production build time separately from dependency installation.
- [x] Report environment, fixture size, elapsed time, and the 120-second threshold.

**Story mapping**: US-014 support

### Step 14: Unit verification

- [x] Run formatting, linting, strict type checking, Unit 1 tests, core branch coverage, and the static production build.
- [x] Run or explicitly document the capacity benchmark result for the provided environment.
- [x] Inspect static output for draft content, secret values, absolute paths, and unexpected routes.
- [x] Resolve every Unit 1 failure before declaring generation complete.

**Story mapping**: US-010, US-011, US-014 support

### Step 15: Documentation and handoff summary

- [x] Create or update the workspace `README.md` with supported local commands and Unit 1 content foundations.
- [x] Create `aidlc-docs/construction/content-application-foundation/code/code-summary.md` listing generated code, tests, decisions, verification evidence, and known Unit 2 or Unit 3 follow-ups.
- [x] Mark US-010 and US-011 implemented for Unit 1 and update AIDLC state.

**Story mapping**: US-010, US-011

## Explicitly Not Applicable in Unit 1

- **API layer generation and tests**: No application network API is required.
- **Database repository and migrations**: Content is repository-backed; no database exists.
- **Visitor frontend component generation**: Owned by Unit 2. Unit 1 creates only minimal route scaffolding needed to validate static integration.
- **Deployment artifacts**: Owned by Unit 3. Unit 1 creates static-export-compatible configuration only.
- **Authenticated GitHub fetch**: Deferred and separately authorized; Unit 1 defines only an optional read-only data contract.

## Files and Directories Expected

```text
package.json
package-lock.json
tsconfig.json
next.config.ts
eslint.config.mjs
vitest.config.ts
src/app/
src/config/
src/lib/content-application-foundation/
tests/content-application-foundation/
scripts/benchmark-content.mjs
README.md
aidlc-docs/construction/content-application-foundation/code/code-summary.md
```

Exact leaf filenames may be refined during implementation only when required by the selected stable libraries; responsibilities and step scope may not expand without plan approval.

## Story Completion Conditions

### US-010

- Typed validated content loads deterministically.
- Drafts, demos, invalid content, missing optional data, public documents, and author diagnostics satisfy approved rules.
- Owner-facing local commands and content foundations are documented.

### US-011

- Fixed and eligible detail routes have validated metadata inputs.
- Sitemap, robots, local social assets, and canonical gating are implemented.
- Unknown, draft, and ineligible details resolve predictably.

## Plan Validation

- The plan has fifteen sequential steps with explicit checkboxes and story mappings.
- Application code paths remain outside `aidlc-docs/`.
- Documentation-only artifacts remain inside `aidlc-docs/`.
- Unit dependencies and service boundaries match the approved unit and design artifacts.
- Database, API, frontend, and deployment exclusions are explicit rather than silently omitted.
- No Mermaid or ASCII architecture diagram is present.

## Extension Compliance

All optional extensions are disabled. Extension-specific code-generation requirements are not applicable; approved core security, reliability, accessibility-supporting contracts, and tests remain in the plan.
