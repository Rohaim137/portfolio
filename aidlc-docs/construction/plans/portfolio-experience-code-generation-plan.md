# Code Generation Plan - Portfolio Experience

## Authority and Location

This document is the single source of truth for Unit 2 Code Generation.

- **Workspace root**: `C:\Users\RBTG\Downloads\port\port`
- **Application and configuration code**: Workspace root only, primarily under `src/`
- **Route code**: `src/app/`
- **Presentation components**: `src/components/`
- **Unit presentation helpers**: `src/lib/portfolio-experience/`
- **Public demonstration assets**: `public/media/projects/`
- **Production-visible demonstration content**: `content/projects/` and `content/blog/`
- **Tests**: `tests/portfolio-experience/`
- **Documentation summary**: `aidlc-docs/construction/portfolio-experience/code/`
- **Forbidden application location**: `aidlc-docs/`

## Unit Context

- **Unit**: Unit 2 - Portfolio Experience
- **Primary stories**: US-001 through US-009, US-012, and US-013
- **Supporting stories**: US-010, US-011, and US-014
- **Dependency**: Approved Unit 1 schemas, content services, view models, metadata, discovery, and destination contracts
- **Database entities**: None
- **Network API**: None
- **Runtime service**: None
- **Infrastructure Design**: Skipped by the approved unit plan

## Expected Interfaces

- Static route components for home, projects, blog, reading, documents, About, and not found
- Shared shell, navigation, footer, action, status, demo, empty-state, and media components
- Client islands for narrow navigation, project filtering, and image lightbox only
- Pure presentation-state, generic-copy, project-filter, navigation-state, lightbox-state, and table-of-contents helpers
- Curated compiled-content renderer consuming Unit 1 output
- Three demonstration projects, three demonstration posts, and three local SVG covers

## Planning Checklist

- [x] Read the Unit 2 definition, story map, dependencies, Functional Design, NFR Requirements, and NFR Design.
- [x] Confirm Unit 1 is approved and supplies all required contracts.
- [x] Confirm Unit 2 Infrastructure Design is not applicable.
- [x] Inspect current application, content, public asset, and test structure.
- [x] Correct the active workspace-root record in `aidlc-state.md`.
- [x] Identify exact application, content, asset, test, and documentation locations.
- [x] Map generation steps to stories and approved requirements.
- [x] Identify API, database, migration, authenticated integration, and deployment work as not applicable.
- [x] Create and validate the numbered generation sequence.
- [x] Log the complete plan approval prompt.
- [x] Obtain explicit approval of the complete Unit 2 Code Generation plan.

## Numbered Generation Sequence

### Step 1: Baseline verification and compatible test dependencies

- [x] Reinspect the `unit2` working tree and pinned Unit 1 toolchain before application edits.
- [x] Resolve stable DOM component-testing, user-interaction, DOM-environment, and accessibility-test packages compatible with the pinned React, TypeScript, and Vitest versions.
- [x] Add only required development dependencies without prereleases, forced peer overrides, or runtime UI packages.
- [x] Extend Vitest configuration with separate Unit 1 and Unit 2 coverage scopes while preserving Unit 1 thresholds.
- [x] Run the Unit 1 regression suite after dependency changes.

**Story mapping**: US-013; US-014 support

### Step 2: Presentation state and generic-copy helpers

- [x] Create `src/lib/portfolio-experience/` with pure helpers for profile presentation, demo provenance, collection state, project filtering, table-of-contents eligibility, navigation state, and lightbox state.
- [x] Centralize generic replaceable site-state copy without storing it as verified profile data.
- [x] Ensure helpers consume Unit 1 domain models and remain server-safe unless explicitly used by a client island.

**Story mapping**: US-002 through US-009, US-012, US-013

### Step 3: Editorial tokens and responsive global foundations

- [x] Replace the minimal foundation stylesheet with the approved warm canvas, near-black text, muted rust accent, typography, spacing, rule, focus, surface, and layout tokens.
- [x] Add semantic base styles, narrow-width overflow protection, visible focus, reduced motion, prose, media, and two-pixel pressed behavior.
- [x] Preserve the prohibited-color, gradient, icon, card, filler-copy, and accent-usage constraints.

**Story mapping**: US-001, US-012, US-013

### Step 4: Local demonstration covers and shared icons

- [x] Create three distinct local abstract SVG project covers under `public/media/projects/`.
- [x] Create only the small local monoline `currentColor` SVG icon components required by navigation, external actions, filters, and media controls.
- [x] Verify assets contain no scripts, external requests, third-party branding, fabricated screenshots, or personal claims.

**Story mapping**: US-003, US-004, US-012

### Step 5: Replaceable demonstration content

- [x] Create exactly three substantive `demo: true` project MDX records covering a web experience, content system, and data workflow.
- [x] Create exactly three substantive `demo: true` blog MDX records covering static architecture, accessible interfaces, and reliable content modeling.
- [x] Use generic impersonal wording with no owner attribution, client claim, employment claim, result, metric, repository, or live deployment.
- [x] Ensure slugs match filenames and all content passes Unit 1 validation and curated MDX rules.

**Story mapping**: US-002 through US-006, US-010 support, US-012

### Step 6: Shared truthful-state and action components

- [x] Create shared `DemoBadge`, `DemoDisclosure`, `StatusLabel`, `EmptyState`, `ActionLink`, `PendingDestination`, `SectionHeader`, `MediaFrame`, and local icon primitives under `src/components/ui/`.
- [x] Add stable purpose-based `data-testid` values to interactive elements.
- [x] Enforce native semantics, non-color state communication, valid-link-only behavior, and concise generic copy.

**Story mapping**: US-002 through US-009, US-012, US-013

### Step 7: Responsive application shell and navigation island

- [x] Create `SiteHeader`, `PrimaryNavigation`, narrow navigation enhancement, `SiteFooter`, and `SocialDestinations` under `src/components/layout/`.
- [x] Update `src/app/layout.tsx` with skip navigation, shared landmarks, shell composition, and validated metadata.
- [x] Implement current-route state, Escape close, focus restoration, route-selection close, and desktop-layout reset without persistent storage.
- [x] Render the verified GitHub destination and pending LinkedIn, X, and Email states consistently.

**Story mapping**: US-001, US-009, US-011 support, US-013

### Step 8: Complete home overview

- [x] Replace the minimal `src/app/page.tsx` scaffold with the complete editorial home composition using `HomePageViewModel`.
- [x] Implement introduction, focus, featured projects, latest writing, reading, GitHub, and social sections with stable `data-od-id` values.
- [x] Render configured profile fields when present and generic replaceable site-state copy when absent.
- [x] Preserve Demo disclosures, truthful reading and contribution states, and the verified GitHub action.

**Story mapping**: US-002, US-003, US-005, US-007, US-009, US-012, US-013

### Step 9: Project index, cards, and local filtering

- [x] Create project feature components under `src/components/projects/`.
- [x] Add `src/app/projects/page.tsx` using the Unit 1 projects index query.
- [x] Implement one project-type plus one technology selection using AND semantics, result announcements, category toggle, and reset.
- [x] Distinguish a true empty collection from zero filter matches.
- [x] Ensure the initial index renders exactly three visibly labelled demonstration projects.

**Story mapping**: US-003, US-012, US-013

### Step 10: Project details, inline gallery, and lightbox

- [x] Add `src/app/projects/[slug]/page.tsx` with static params, metadata, and not-found handling.
- [x] Create structured case-study, project action, inline gallery, and image-lightbox components.
- [x] Keep video inline and images usable without modal enhancement.
- [x] Implement accessible modal naming, valid index boundaries, arrow navigation, Escape close, focus containment, focus restoration, and reduced-motion behavior.

**Story mapping**: US-004, US-011 support, US-012, US-013

### Step 11: Blog index, articles, and curated MDX presentation

- [x] Create blog feature components under `src/components/blog/`.
- [x] Add `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx` with static params, metadata, and not-found handling.
- [x] Render reverse-ordered post summaries with date, reading time, tags, and Demo disclosure.
- [x] Create the curated compiled-content component map and readable article layout.
- [x] Render table-of-contents navigation only for opted-in articles with at least three eligible headings.

**Story mapping**: US-005, US-006, US-011 support, US-012, US-013

### Step 12: Reading, documents, About, and recovery routes

- [x] Create reading components and `src/app/reading/page.tsx`; provide reusable detail presentation, but activate `src/app/reading/[slug]/page.tsx` only when at least one genuine eligible detail exists because static export rejects an empty parameter set.
- [x] Create document components and `src/app/docs/page.tsx` with a truthful initial unavailable state and no fake actions.
- [x] Create `src/app/about/page.tsx` with replaceable generic content and no invented biography; keep it outside default navigation while profile data is empty.
- [x] Refine `src/app/not-found.tsx` with accessible recovery links into valid portfolio areas.

**Story mapping**: US-001, US-007, US-008, US-011 support, US-012, US-013

### Step 13: Discovery, route, and metadata integration

- [x] Connect all new index and eligible detail routes to Unit 1 metadata factories.
- [x] Confirm sitemap output includes fixed and published detail routes while excluding drafts and unavailable details.
- [x] Preserve canonical gating and local social-image fallback.
- [x] Verify all route components use query or detail services rather than content infrastructure modules.

**Story mapping**: US-001, US-011; US-014 support

### Step 14: Pure presentation and state tests

- [x] Add tests under `tests/portfolio-experience/` for generic-profile selection, demo provenance, collection states, filter semantics, table-of-contents eligibility, navigation transitions, and lightbox index transitions.
- [x] Cover success, negative, empty, first, last, single-item, reset, and deterministic-order cases.
- [x] Confirm generic fallbacks never become verified profile values.

**Story mapping**: US-002 through US-009, US-013

### Step 15: Component interaction and accessibility tests

- [x] Test shell landmarks, skip link, current route, narrow navigation keyboard behavior, and pending destinations.
- [x] Test Demo disclosure, home empty states, project filters, result announcements, optional actions, article structure, and table-of-contents behavior.
- [x] Test lightbox naming, native-dialog focus containment, arrow movement, Escape close, trigger focus restoration, and reduced-motion treatment.
- [x] Run compatible automated DOM accessibility checks on representative route and component states.

**Story mapping**: US-001 through US-009, US-012, US-013

### Step 16: Unit verification and static output review

- [x] Run formatting, zero-warning lint, strict type checking, Unit 1 regressions, Unit 2 tests, and the combined coverage gate.
- [x] Run a static production build and confirm every planned index and eligible detail route exports successfully.
- [x] Inspect route-specific client chunks and confirm only approved client islands ship feature JavaScript.
- [x] Inspect static output for drafts, secrets, absolute paths, fabricated claims, prohibited copy, external placeholder services, and unexpected routes.
- [x] Perform representative narrow and wide keyboard, focus, reduced-motion, and overflow review where the environment permits.

**Story mapping**: US-001 through US-013; US-014 support

### Step 17: Documentation and handoff summary

- [x] Update `README.md` with replaceable personal content, demo replacement, route, and Unit 2 test guidance.
- [x] Create `aidlc-docs/construction/portfolio-experience/code/code-summary.md` listing generated code, content, assets, tests, verification evidence, and Unit 3 follow-ups.
- [x] Mark Unit 2 stories and stage progress only after all verification succeeds.

**Story mapping**: US-001 through US-013; US-014 support

## Explicitly Not Applicable in Unit 2

- **API generation and testing**: No runtime application API exists.
- **Database repository and migrations**: Content remains repository-backed and build-time validated.
- **Runtime cache, queue, or worker**: No runtime workload or service dependency exists.
- **Authenticated GitHub integration**: Contribution data remains dormant and separately authorized.
- **Pages CMS and CI workflows**: Owned by Unit 3.
- **Cloudflare configuration or deployment**: Owned by Unit 3 and requires separate approval.

## Expected Files and Directories

```text
content/blog/
content/projects/
public/media/projects/
src/app/about/
src/app/blog/
src/app/docs/
src/app/projects/
src/app/reading/
src/components/blog/
src/components/documents/
src/components/github/
src/components/home/
src/components/layout/
src/components/projects/
src/components/reading/
src/components/ui/
src/lib/portfolio-experience/
tests/portfolio-experience/
aidlc-docs/construction/portfolio-experience/code/code-summary.md
```

Exact leaf filenames may be refined only to satisfy the approved component boundaries or resolved stable library requirements. Responsibilities and step scope may not expand without plan approval.

## Story Completion Conditions

- US-001 through US-009 render their complete visitor journeys from Unit 1 models.
- US-012 satisfies every blocking editorial and anti-slop constraint.
- US-013 provides semantic, keyboard-operable, reduced-motion-aware behavior with automated evidence.
- Supporting US-010 and US-011 behavior preserves replaceable content and route metadata contracts.
- Unit 2 remains statically exportable with no runtime service or deployment mutation.

## Plan Validation

- The plan contains seventeen sequential steps with explicit checkboxes and story mappings.
- Application code, content, tests, and assets remain outside `aidlc-docs/`.
- Documentation-only output remains inside `aidlc-docs/`.
- Every primary Unit 2 story maps to implementation and verification steps.
- Database, API, infrastructure, authenticated integration, CMS, CI, and deployment exclusions are explicit.
- No Mermaid or ASCII diagram is present.
