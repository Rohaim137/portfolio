# Business Logic Model - Content and Application Foundation

## Functional Objective

Transform repository-controlled configuration, Markdown, MDX, and explicitly public document records into validated, deterministic, presentation-ready data for static routes. The unit performs no browser-time or external network fetching and mutates no source content during a build.

## Core Processing Pipeline

### 1. Discover configured inputs

1. Read site configuration from its fixed application-owned location.
2. Enumerate supported source extensions only within the configured project, blog, and reading collection roots.
3. Load the explicit public-document manifest rather than enumerating `public/documents/` for display.
4. Optionally read generated contribution data if the file exists; absence is valid.

### 2. Parse source records

1. Split front matter from body source.
2. Retain the normalized workspace-relative source path for diagnostics.
3. Reject unreadable input and unsupported source extensions.
4. Do not interpret body content before front matter passes schema validation.

### 3. Validate identities and values

1. Validate required and optional fields against the collection schema.
2. Require explicit lowercase kebab-case slugs.
3. Require the filename stem to equal the explicit slug.
4. Detect duplicate slugs within a collection.
5. Validate public URL protocols without performing network requests.
6. Validate ISO calendar dates as calendar values without timezone conversion.
7. Aggregate every detectable file and field error before failing.

### 4. Normalize domain records

1. Convert valid front matter into immutable typed entities.
2. Normalize absent optional arrays to empty arrays only when the type defines collection semantics.
3. Preserve meaningful absence as `undefined` or `null`; never invent summaries, dates, media, links, or metrics.
4. Preserve `draft` and `demo` independently.
5. Calculate derived values such as reading time, headings, and internal detail availability.

### 5. Apply visibility policy

1. Exclude drafts by default in every environment.
2. Allow drafts only through an explicit development or test option that cannot be enabled in a production build.
3. Include demo records when published; demo status never bypasses draft exclusion.
4. Do not enforce a permanent minimum demo count. The initial seed contains three demo projects and three demo posts, but replacement or removal remains valid.

### 6. Compile body content

1. Compile project, post, and eligible reading bodies at build time.
2. Bind only curated MDX component names.
3. Extract a normalized heading outline.
4. Calculate reading time from meaningful prose and code text.
5. Reject unsupported constructs with file context.

### 7. Order and group results

- Posts: publication date descending, then title, then slug.
- Reading within a status group: most relevant configured date descending, then title, then slug.
- Projects: featured first where requested, then the configured or derived date descending, then title, then slug.
- Documents: featured first, then update date descending, then title.
- Every comparison has a deterministic fallback and does not use locale-dependent runtime ordering.

### 8. Produce route models

1. Convert domain records into summary or detail view models.
2. Generate static slugs only for non-draft records with eligible detail content.
3. Return `null` for unknown, draft, or ineligible detail slugs.
4. Compose home and index models from typed empty or populated collections.
5. Resolve social destinations into exhaustive active or pending states.

### 9. Produce metadata and discovery

1. Derive titles and descriptions from validated site or content values.
2. Select a configured local social asset or the local default.
3. Emit canonical URLs only when a valid production site URL is configured.
4. Generate sitemap entries from fixed routes plus published eligible slugs.
5. Exclude drafts and unavailable detail routes.

## Business Workflows

### Content validation workflow

- Input: all configured source records.
- Output on success: typed entities grouped by collection.
- Output on failure: one ordered error report containing every detectable error.
- Error ordering: collection, source path, field path, then message.

### Draft preview workflow

- Default calls return published records only.
- A local preview or test caller may explicitly request drafts.
- The request is rejected when the runtime mode is production.
- Draft URLs never enter production static-slug or discovery generation.

### Demonstration replacement workflow

- Initial demo records carry `demo: true` and `draft: false`.
- The owner may edit them, mark them draft, replace them with genuine content, or remove them.
- Converting an entry to genuine content requires removing or setting `demo: false`; no presentation code change is needed.
- No build rule requires demos to remain after the initial implementation acceptance check.

### Reading detail eligibility workflow

- A valid non-draft reading record always qualifies for the reading index.
- It receives an internal detail slug only when trimmed publishable body content is non-empty.
- A metadata-only record links to its validated legitimate external source.
- An empty or whitespace-only body does not create a duplicate internal metadata page.

### Public document workflow

- Only manifest entries are candidates for publication.
- Each entry validates its safe public-relative path and allowed file expectations.
- A missing configured asset is an error that names both manifest entry and path.
- An unconfigured file may exist under `public/` but is not listed by the application.

### Social destination workflow

- The configured GitHub URL resolves to an active destination.
- A valid configured LinkedIn, X, or mail destination resolves to active.
- An absent value resolves to pending.
- An invalid non-empty value is a configuration error, not a pending state.

### Contribution data workflow

- Unit 1 never fetches GitHub data.
- Missing generated data resolves to `null`.
- Present generated data must pass its schema before it becomes available to a future presentation boundary.
- V1 route models do not request or display a contribution calendar.

## Edge Cases

- A filename and front-matter slug differ only by case: invalid.
- Two files share a slug: both source paths appear in the error report.
- A calendar date would shift in the server timezone: display remains the authored calendar date.
- A draft is also a demo: excluded from production.
- A reading body contains only whitespace: no internal detail route.
- A social value contains an unsupported protocol: invalid configuration.
- A document path escapes the public document root: invalid.
- A content directory is empty: valid typed empty collection.
- Generated contribution data is absent: valid `null`, with no build failure.

## Frontend Applicability

`frontend-components.md` is not generated for this unit. Unit 1 defines serializable view models and content states, while all visitor-facing hierarchy, props, local state, interaction, and forms belong to Unit 2.

## Traceability

- US-010: parsing, validation, draft behavior, demo lifecycle, authoring-safe contracts
- US-011: metadata, discovery, static slugs, local social assets, canonical gating
- Supporting US-002 through US-009: typed view models and explicit content states
- Supporting US-014: deterministic static build and actionable failures

## Extension Compliance

All optional extensions are disabled. Extension-specific business logic is not applicable; approved core validation, privacy, and safe-build behavior remains mandatory.
