# NFR Design Plan - Content and Application Foundation

## Unit Context

- **Unit**: Unit 1 - Content and Application Foundation
- **Approved NFRs**: Build-time scale, two-minute envelope build, static availability, validated source boundaries, deterministic output, 90 percent branch coverage for core rules, and concise diagnostics
- **Design focus**: Patterns and logical components that realize those NFRs without a runtime service or database

## NFR Design Checklist

- [x] Load the approved Functional Design, NFR Requirements, and tech-stack decisions.
- [x] Identify candidate resilience, scale, performance, security, and logical-component patterns.
- [x] Confirm that runtime queues, distributed caches, circuit breakers, and databases are not inherently required by the static architecture.
- [x] Create context-specific NFR design questions.
- [x] Validate every answer for completeness, ambiguity, and contradiction.
- [x] Resolve every ambiguous or conflicting answer. No ambiguity remained after applying the approved NFRs.
- [x] Record selected patterns and logical-component boundaries.
- [x] Generate `nfr-design-patterns.md`.
- [x] Generate `logical-components.md`.
- [x] Verify every Unit 1 NFR has a design mechanism and verification point.
- [x] Record disabled-extension compliance as not applicable.
- [x] Update plan and AIDLC state in the same interaction.
- [x] Present NFR Design with the standardized two-option review message.

## NFR Design Questions

Please enter one letter after every `[Answer]:` tag.

### Question 1: Resilience and retry policy
How should Unit 1 respond to local parsing, validation, or compilation failures?

A) Do not retry deterministic local failures; aggregate actionable errors, fail atomically, and preserve all source files and the last known valid external deployment

B) Retry every failed file three times before reporting the error

C) Skip failed records and produce partial output

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 2: Scalability pattern
How should collections be processed within the personal-portfolio capacity envelope?

A) Scan each collection once, index records by slug, and use bounded parallel parsing or compilation with deterministic result ordering

B) Process every file strictly sequentially to simplify implementation

C) Add a persistent build database and incremental job queue

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 3: Performance caching
What cache boundary should build-time services use?

A) Use process-local memoization scoped to one build, keyed by normalized source path and content fingerprint; persist no cache as application state

B) Use no memoization and allow each route to reread and recompile content

C) Introduce a shared remote cache required for builds

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 4: Security enforcement
Where should path, URL, schema, and MDX security checks be enforced?

A) Enforce them at source and compilation boundaries before domain entities exist, then preserve safe typed values through downstream services

B) Enforce them only when route components render values

C) Rely primarily on trusted authors and code review

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 5: Logical components
Which runtime-like infrastructure components should Unit 1 introduce?

A) None; use in-process source, validation, compilation, indexing, diagnostics, and memoization components only

B) Add a local SQLite content index required by every build

C) Add a queue and worker process for MDX compilation

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 6: Performance regression verification
How should the two-minute capacity-envelope target be checked?

A) Provide an explicit opt-in benchmark or CI job using deterministic generated fixtures, while normal unit tests use small fixtures

B) Run the full 250-record-per-collection benchmark on every local test command

C) Measure it manually only if a user reports slow builds

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

## Mandatory Artifacts

- `aidlc-docs/construction/content-application-foundation/nfr-design/nfr-design-patterns.md`
- `aidlc-docs/construction/content-application-foundation/nfr-design/logical-components.md`

## Selected NFR Design Decisions

- Deterministic local failures are not retried; validation fails atomically after aggregating corrective diagnostics.
- Collections are scanned once, indexed by slug, and parsed or compiled with bounded parallelism and deterministic reconstruction.
- Parsed and compiled results use content-fingerprinted, process-local memoization scoped to one build.
- Path, URL, schema, public-document, generated-data, and MDX checks run at boundaries before domain entities exist.
- Unit 1 introduces no database, queue, worker, distributed cache, circuit breaker, or required runtime service.
- Capacity performance is verified through an opt-in deterministic benchmark or dedicated CI job rather than every ordinary test run.
- **Decision provenance**: The user authorized the assistant to answer all questions. Option A was selected for every question.

## Content Validation Record

- Markdown syntax, checkboxes, and inline measurements were reviewed.
- No Mermaid or ASCII diagram is present.
- Every mandatory NFR design category has a targeted question.
- Every question has mutually exclusive choices, a final `X) Other` option, and an `[Answer]:` tag.
