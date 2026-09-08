# Functional Design Plan - Content and Application Foundation

## Unit Context

- **Unit**: Unit 1 - Content and Application Foundation
- **Primary stories**: US-010 and US-011
- **Supporting scope**: Typed data and metadata foundations for US-002 through US-009 and static-build foundations for US-014
- **Design focus**: Content entities, validation, visibility, slugs, ordering, compilation, view models, metadata, public documents, and deterministic error behavior
- **Frontend artifact**: Not applicable. This unit exposes typed data to frontend routes but does not own visitor-facing components or client state.

## Functional Design Checklist

- [x] Load the approved unit definition, dependency contract, story map, requirements, and Application Design.
- [x] Identify functional entities, transformations, decisions, validation boundaries, and failure scenarios.
- [x] Evaluate business logic, domain model, business rules, data flow, integrations, errors, edge cases, and frontend applicability.
- [x] Create context-specific functional-design questions.
- [x] Validate all answers for completeness, ambiguity, and contradiction.
- [x] Resolve every ambiguous or conflicting answer. No ambiguity remained after applying the approved project constraints.
- [x] Record the selected functional rules and edge-case policies.
- [x] Generate `business-logic-model.md`.
- [x] Generate `business-rules.md`.
- [x] Generate `domain-entities.md`.
- [x] Record why `frontend-components.md` is not applicable to this unit.
- [x] Verify coverage for US-010, US-011, and all supporting foundation requirements.
- [x] Record disabled-extension compliance as not applicable.
- [x] Update plan and stage progress in the same interaction.
- [x] Present the functional design for explicit approval.

## Functional Design Questions

Please enter one letter after every `[Answer]:` tag.

### Question 1: Slug ownership and identity
How should content slugs be defined and validated?

A) Require an explicit front-matter slug, require it to match a lowercase kebab-case filename, and fail on mismatch or duplicates within the collection

B) Derive the slug only from the filename and omit slug from front matter

C) Treat front-matter slug as authoritative even when it differs from the filename

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 2: Validation reporting
When several content files are invalid, how should validation report failures?

A) Collect all detectable errors across collections and report file and field context together before failing the build

B) Stop at the first invalid file or field

C) Warn for invalid records, skip them, and allow the build to succeed

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 3: Draft preview behavior
How should drafts behave outside production builds?

A) Exclude drafts by default everywhere, with an explicit development-only option for local preview and tests

B) Include drafts automatically whenever the development server runs, but exclude them from production

C) Never render drafts through the application, including local development

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 4: Demonstration-content lifecycle
Should the initial requirement for three demo projects and three demo posts remain a permanent build invariant?

A) No; seed exactly three of each initially, but allow the owner to remove or replace them later without a build failure

B) Yes; require at least three demo projects and three demo posts in every build

C) Require at least three total published projects and posts, whether demonstration or genuine

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 5: Dates and deterministic ordering
How should dates and tie-breaking be handled?

A) Require ISO calendar dates, interpret display dates without timezone shifting, sort newest first where applicable, and break ties by title then slug

B) Require full UTC timestamps for all dated content and sort only by timestamp

C) Accept human-readable date strings and rely on runtime date parsing

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 6: Optional detail routes
When should a reading item receive an internal detail route?

A) Only when it has non-empty publishable body content; metadata-only records link directly to their legitimate external source

B) Every reading record receives an internal detail route, even if it only repeats index metadata

C) Reading items never receive internal detail routes

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 7: Public document verification
How should a configured public document with a missing file behave?

A) Fail validation before production output is accepted, naming the configuration entry and missing asset

B) Hide the missing document and emit a warning

C) Render the metadata with a disabled download action

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 8: External and integration boundaries
How should external URLs and future GitHub contribution data be treated in Unit 1?

A) Validate supported public URL protocols, keep external targets as data only, and keep contribution data optional and read-only with no network fetch in this unit

B) Verify every external URL over the network during each build and fetch GitHub contribution data when credentials happen to exist

C) Store URLs without validation and leave all checks to UI components

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

## Mandatory Artifacts

- `aidlc-docs/construction/content-application-foundation/functional-design/business-logic-model.md`
- `aidlc-docs/construction/content-application-foundation/functional-design/business-rules.md`
- `aidlc-docs/construction/content-application-foundation/functional-design/domain-entities.md`

## Selected Functional Decisions

- Explicit slugs must match lowercase kebab-case filenames and remain unique per collection.
- Validation aggregates every detectable error with stable file and field context before failing.
- Draft preview is excluded by default and allowed only through an explicit non-production option.
- Three demo projects and three demo posts are initial seed requirements, not permanent invariants.
- Authored dates use timezone-stable ISO calendar semantics and deterministic tie-breaking.
- Reading detail routes exist only for records with non-empty publishable body content.
- Missing configured public documents are blocking validation errors.
- External URLs receive syntactic protocol validation; contribution data remains optional and no network fetch occurs in Unit 1.
- **Decision provenance**: The user authorized the assistant to answer all questions. Option A was selected for every question.

## Content Validation Record

- Markdown structure, checkboxes, and inline code were reviewed.
- No Mermaid or ASCII diagram is present in this plan.
- Questions cover all functional-design categories applicable to the unit.
- Each question includes mutually exclusive choices, a final `X) Other` option, and an `[Answer]:` tag.
