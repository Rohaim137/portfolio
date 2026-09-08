# NFR Requirements - Content and Application Foundation

## Scope

These requirements govern Unit 1's static framework, configuration, content schemas, validation, Markdown or MDX compilation, publication visibility, view models, metadata, and discovery behavior.

## Scalability

- **U1-NFR-001**: The content architecture shall support at least 250 projects, 250 posts, 250 reading items, and 250 document records without changing schemas, route composition contracts, or storage architecture.
- **U1-NFR-002**: Validation and static generation shall support at least 1,000 local media references across those records.
- **U1-NFR-003**: Collection processing shall be linear or near-linear in record and body size; it shall not repeatedly scan complete collections for each record.
- **U1-NFR-004**: Slug uniqueness detection shall use collection-level indexing rather than pairwise comparison.
- **U1-NFR-005**: Growth beyond the envelope may require build optimization, but shall not require a runtime database for ordinary portfolio use.

## Build Performance

- **U1-NFR-006**: On the provided environment, a clean validation and production build using generated fixtures at the stated 250-record-per-collection envelope shall complete within 120 seconds, excluding dependency installation.
- **U1-NFR-007**: Normal development validation for the initial content set shall produce feedback quickly enough for interactive authoring, with a target under five seconds outside initial framework startup.
- **U1-NFR-008**: Repeated compilation within one build shall reuse parsed or compiled results where safe rather than compiling the same source independently for metadata, indexes, and details.
- **U1-NFR-009**: Performance tests shall report environment, record count, media-reference count, elapsed time, and pass or fail threshold.

## Availability and Degraded Inputs

- **U1-NFR-010**: Empty project, blog, reading, or document collections are valid and shall not prevent a build.
- **U1-NFR-011**: Missing optional metadata or media shall resolve to typed absence and shall not fail unrelated routes.
- **U1-NFR-012**: Missing generated GitHub contribution data is valid and shall not fail validation or build.
- **U1-NFR-013**: Invalid required content, duplicate slugs, unsafe paths, or missing explicitly configured public documents shall block accepted production output.
- **U1-NFR-014**: A validation failure shall leave existing source content unchanged and shall not emit a partially accepted content manifest.
- **U1-NFR-015**: Unit 1 shall have no runtime network or service dependency, so deployed static content remains available independently of CMS or GitHub API status.

## Security and Privacy

- **U1-NFR-016**: Repository authors are trusted to edit source, but paths, front matter, URLs, MDX constructs, public-document references, and generated data shall be treated as potentially malformed.
- **U1-NFR-017**: File access shall remain within configured content or public-document roots after path normalization and real-path resolution where applicable.
- **U1-NFR-018**: External web destinations shall permit secure HTTP URLs only; email shall use its explicitly supported destination type.
- **U1-NFR-019**: The content compiler shall reject arbitrary imports, exports, scripts, and unsupported executable MDX constructs.
- **U1-NFR-020**: No token, API key, private credential, environment value, absolute local path, or secret-bearing object shall enter serializable route models or static output.
- **U1-NFR-021**: Public documents shall require explicit manifest entries and successful asset verification.
- **U1-NFR-022**: Content rendered into HTML shall use framework and React escaping defaults; approved rich constructs shall come only from the curated component map.
- **U1-NFR-023**: Unit tests shall cover traversal, unsupported protocol, unsafe MDX, missing document, and secret-boundary cases.

## Reliability and Reproducibility

- **U1-NFR-024**: The same committed sources, configuration, dependency lockfile, runtime major version, and build mode shall produce equivalent routes, ordering, slugs, metadata, and discovery output.
- **U1-NFR-025**: Business logic and tests shall not depend on wall-clock time, local timezone, locale-specific collation, or network availability.
- **U1-NFR-026**: Calendar dates shall preserve authored day semantics across timezones.
- **U1-NFR-027**: Validation errors shall be sorted deterministically by collection, relative path, field, and stable error code.
- **U1-NFR-028**: Expected content mistakes shall produce domain diagnostics rather than unhandled stack traces.
- **U1-NFR-029**: A missing or excluded detail slug shall resolve predictably to not found.
- **U1-NFR-030**: Automated tests shall prove empty, valid, invalid, draft, demo, duplicate, missing, and optional-data scenarios.

## Maintainability and Testability

- **U1-NFR-031**: TypeScript strict checking shall apply to application and test code.
- **U1-NFR-032**: Collection schemas, source access, transformation, ordering, metadata, and route composition contracts shall remain separated and independently testable.
- **U1-NFR-033**: Validation, visibility, ordering, slug, destination, public-document, and metadata modules shall achieve at least 90 percent branch coverage.
- **U1-NFR-034**: Every business-rule category in Unit 1 Functional Design shall have at least one positive and one relevant negative automated test.
- **U1-NFR-035**: Tests shall use temporary or in-memory sources and shall not mutate genuine content directories.
- **U1-NFR-036**: Dependencies shall be pinned by the committed npm lockfile and installed reproducibly with `npm ci` in clean environments.
- **U1-NFR-037**: Public service interfaces shall use explicit return types and discriminated unions for active, pending, success, failure, and optional states.
- **U1-NFR-038**: Server-only modules shall be structurally isolated from client-importable modules.

## Diagnostic Usability

- **U1-NFR-039**: Expected validation diagnostics shall group by collection and file.
- **U1-NFR-040**: Each issue shall show the workspace-relative file, optional field path, stable error code, and concise corrective message.
- **U1-NFR-041**: Diagnostics shall avoid exposing machine-specific absolute paths where a relative path is sufficient.
- **U1-NFR-042**: Expected authoring errors shall not require reading a stack trace to identify the source and correction.
- **U1-NFR-043**: Unexpected internal failures may include a stack trace in development but shall retain the operation and source context.

## Static Compatibility

- **U1-NFR-044**: Public routes, metadata, sitemap, and robots output shall be compatible with Next.js static export.
- **U1-NFR-045**: Unit 1 shall not require middleware, server actions, request-time headers, runtime file reads, or dynamic server endpoints for visitor functionality.
- **U1-NFR-046**: Generated route models shall be serializable across the build-rendered and client-island boundary.
- **U1-NFR-047**: Canonical URLs shall remain absent until a valid production site origin is configured.

## Technology Support

- **U1-NFR-048**: Production dependencies shall use stable releases verified through official documentation at implementation time.
- **U1-NFR-049**: The project shall support the available Node.js 22.23.2 environment and an active LTS Node.js line; Node.js 24 is the preferred clean-build baseline as of this decision.
- **U1-NFR-050**: Prerelease framework, compiler, styling, and test packages are prohibited unless a later approved design explicitly requires one.
- **U1-NFR-051**: Exact resolved versions shall be pinned in `package-lock.json`; version ranges in `package.json` must not substitute for clean-lockfile installation.
- **U1-NFR-052**: Framework security patches shall be applied within the selected supported major line before the initial release.

## Quality Gates

- Schema and business-rule tests pass.
- Branch coverage meets U1-NFR-033 for the specified core modules.
- The 250-record-per-collection build fixture meets the 120-second target.
- Type checking, linting, formatting checks, tests, and static production build succeed.
- Static output contains no drafts, secret values, unexpected absolute paths, or unconfigured public-document entries.
- Repeated builds produce identical route sets and deterministic content ordering.

## Traceability

- Scalability and performance: NFR-006 through NFR-009, NFR-015, NFR-019
- Security and privacy: NFR-010 through NFR-014, FR-032, FR-040, AC-012
- Reliability and diagnostics: NFR-015 through NFR-019, FR-022, AC-007
- Static delivery and cost: NFR-020 through NFR-022, AC-001, AC-013, AC-014
- Functional rules: BR-001 through BR-062
- User stories: US-010, US-011, supporting US-002 through US-009 and US-014

## Extension Compliance

- Resiliency Baseline: Disabled; not applicable.
- Security Baseline: Disabled; not applicable as an extension. Core security requirements U1-NFR-016 through U1-NFR-023 remain binding.
- Property-Based Testing: Disabled; not applicable. Focused example-based tests and branch coverage remain required.

No enabled extension has an unresolved blocking finding.
