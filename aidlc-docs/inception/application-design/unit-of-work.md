# Units of Work

## Decomposition Summary

The portfolio is one statically deployed Next.js application divided into three development units. Units are logical delivery boundaries, not independently deployed services. One developer or coding agent completes them sequentially with an approval gate after each applicable design and code stage.

## Unit 1: Content and Application Foundation

### Objective

Create the framework, contracts, content pipeline, and static-generation foundations that every visitor-facing route depends on.

### Responsibilities

- Initialize the supported Next.js, TypeScript, Tailwind CSS, linting, formatting, and test foundation.
- Configure static export and server-only module boundaries.
- Define site configuration and social destination states.
- Define project, post, reading, document, media, metadata, and contribution-data types.
- Implement constrained file sources, schema validation, front-matter handling, and curated MDX compilation.
- Implement content services for listing, detail retrieval, draft filtering, demo preservation, deterministic ordering, reading time, headings, and static slugs.
- Implement route view-model queries and metadata, sitemap, robots, not-found, and canonical configuration foundations.
- Provide isolated fixtures and tests for valid, invalid, draft, demo, empty, and missing content states.

### Owned contracts

- `SiteConfig`, `PublicProfile`, and `DestinationState`
- `ProjectSummary`, `ProjectDetail`, and project schema
- `PostSummary`, `PostDetail`, and post schema
- `ReadingSummary`, `ReadingDetail`, and reading schema
- `PublicDocument` and document configuration schema
- `ProjectMedia` and curated MDX component names
- `ContentError`, validation results, and service interfaces
- Route view models and published-route metadata types

### Owned user stories

- US-010: Maintain content safely through repository files
- US-011: Understand and share any public route

### Supporting responsibilities

Unit 1 supplies types and services used by US-002 through US-009 and build foundations used by US-014.

### Explicit exclusions

- Final editorial page composition
- Interactive project filtering and lightbox behavior
- Pages CMS configuration and complete authoring handbook
- CI workflows and Cloudflare Pages preparation
- External deployment or GitHub contribution fetching

### Completion evidence

- Static framework build succeeds with minimal route scaffolding.
- Content schemas report file and field errors.
- Drafts are absent from production lists and static slugs.
- Demo state is preserved in view models.
- Missing optional values remain explicit and do not create dummy links.
- Metadata factories and published-route discovery are testable.

### Construction stages

- Functional Design: Execute
- NFR Requirements: Execute
- NFR Design: Execute
- Infrastructure Design: Skip; no external resource or delivery mapping belongs to this unit
- Code Generation: Execute

## Unit 2: Portfolio Experience

### Objective

Build the complete responsive editorial interface using Unit 1 contracts and services, including the approved demonstration and empty states.

### Responsibilities

- Establish warm off-white, near-black, and restrained rust or vermilion design tokens.
- Implement typography, spacing, layout rhythm, responsive shell, skip navigation, header, navigation, footer, and not-found presentation.
- Implement the home overview with stable `data-od-id` section identifiers.
- Implement project index, filters, cards, case studies, media frames, gallery, and progressively enhanced lightbox.
- Implement blog index, cards, article layout, curated MDX presentation, and conditional table of contents.
- Implement reading index and optional note presentation with truthful initial empty states.
- Implement document index with truthful initial unavailable state.
- Implement the optional about structure without invented owner copy.
- Implement the working GitHub link, pending LinkedIn, X, and email labels, and inactive contribution boundary presentation.
- Add exactly three visibly labelled demonstration projects and three visibly labelled demonstration posts.
- Implement route and component tests for responsive, keyboard, disclosure, status, pending, empty, and media behavior.

### Owned user stories

- US-001 through US-009
- US-012: Experience a deliberate editorial design
- US-013: Use the complete portfolio accessibly

### Consumed contracts

- All relevant Unit 1 content summaries, details, view models, destination states, metadata contracts, and service results

### Explicit exclusions

- File-system parsing and validation rules
- CI workflows and host-specific configuration
- Authenticated GitHub contribution collection
- Production deployment

### Completion evidence

- Every planned route renders from typed services.
- Three project and three blog demonstrations are conspicuously marked `Demo`.
- Reading and documents use truthful empty states.
- GitHub works everywhere; pending destinations are non-focusable.
- Representative visitor journeys work by keyboard and at narrow and wide widths.
- Reduced motion, media alternatives, and visible focus are implemented.
- Blocking anti-slop constraints pass automated and visual review.

### Construction stages

- Functional Design: Execute
- NFR Requirements: Execute
- NFR Design: Execute
- Infrastructure Design: Skip; the unit is static application presentation only
- Code Generation: Execute

## Unit 3: Quality, Authoring, and Delivery Preparation

### Objective

Make the integrated application maintainable, repeatably verifiable, authorable, and ready for a separately approved static deployment.

### Responsibilities

- Add Pages CMS configuration for supported collections without runtime coupling.
- Document local, GitHub, and CMS content authoring; demo replacement; draft handling; validation; media preparation; and public-document safety.
- Complete unit, component, accessibility, link, content, and integrated static-build checks.
- Add practical automated anti-slop checks for prohibited colors and detectable markup or copy patterns.
- Define quality CI for formatting, linting, type checking, tests, and static build.
- Preserve a dormant, secure future GitHub contribution-fetch boundary and document secret handling without enabling the heatmap.
- Prepare Cloudflare Pages build settings and deployment instructions without connecting or publishing externally.
- Verify static artifact integrity, absence of secrets, zero mandatory runtime cost, and host portability.

### Owned user story

- US-014: Build and prepare the portfolio safely at zero mandatory cost

### Supporting responsibilities

Unit 3 validates the integrated acceptance criteria for every story and completes the owner-facing operational portions of US-010 and US-011.

### Consumed contracts

- Unit 1 content, metadata, validation, and build contracts
- Unit 2 route, component, accessibility, and visual behavior

### Explicit exclusions

- New portfolio features or content claims
- A running content backend
- Live contribution heatmap activation
- Creating secrets, connecting Cloudflare, or deploying production output

### Completion evidence

- All documented quality commands succeed from a clean install.
- Pages CMS configuration represents supported content fields.
- Authoring and public-file guidance is complete.
- CI definitions match the verified local commands.
- Static artifact contains no secret or unintended private document.
- Cloudflare Pages preparation is documented but no external deployment occurs.

### Construction stages

- Functional Design: Skip; it adds no new user-domain behavior beyond Units 1 and 2
- NFR Requirements: Execute
- NFR Design: Execute
- Infrastructure Design: Execute for CI, generated-data boundaries, and static-host preparation
- Code Generation: Execute

## Greenfield Code Organization

Application code belongs at the workspace root; `aidlc-docs/` remains documentation-only.

```text
app/
  about/
  blog/
  docs/
  projects/
  reading/
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  blog/
  documents/
  github/
  home/
  layout/
  projects/
  reading/
  ui/
content/
  blog/
  projects/
  reading/
generated/
lib/
  content/
  metadata/
  services/
  validation/
public/
  documents/
  media/
scripts/
tests/
.github/workflows/
.pages.yml
next.config.ts
package.json
```

### Organization rules

- Route files compose services and feature components; they do not parse files.
- Feature directories own portfolio-specific presentation.
- `components/ui/` contains only genuinely reusable primitives.
- Server-only content and validation modules remain under `lib/` and are never imported by client islands.
- Demonstration entries live in production content collections with `demo: true`; automated fixtures live under tests.
- Generated contribution data has a dedicated ignored or controlled path and remains optional.
- Public documents appear only through explicit configuration.

## Boundary Validation

- **Cohesion**: Unit 1 owns contracts and build-time content; Unit 2 owns visitor presentation; Unit 3 owns integrated quality and delivery preparation.
- **Coupling**: Dependencies move from Unit 3 to the integrated output and from Unit 2 to Unit 1 contracts; Unit 1 does not import later units.
- **Deployment**: All units assemble into one static application.
- **Story coverage**: Every one of fourteen stories has one primary owner.
- **Application Design coverage**: Every identified route, component, service, method boundary, and adapter belongs to a unit.

## Extension Compliance

Resiliency Baseline, Security Baseline, and Property-Based Testing are disabled. Their unit-specific rules are not applicable. Approved core reliability, security, privacy, accessibility, and focused testing requirements remain assigned.
