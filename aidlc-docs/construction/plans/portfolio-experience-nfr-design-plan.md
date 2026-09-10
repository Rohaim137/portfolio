# NFR Design Plan - Portfolio Experience

## Unit Context

- **Unit**: Unit 2 - Portfolio Experience
- **Prerequisites**: Functional Design and NFR Requirements approved
- **Design scope**: Patterns and logical components for static availability, progressive enhancement, scale, performance, accessibility, privacy, security, maintainability, and verification
- **Infrastructure scope**: None; Unit 2 has no runtime database, API, queue, worker, distributed cache, monitoring service, or deployment resource

## Planning Checklist

- [x] Read all approved Unit 2 NFR requirements and technology decisions.
- [x] Map NFRs to presentation behavior and logical component boundaries.
- [x] Evaluate resilience, scalability, performance, security, and infrastructure component questions.
- [x] Apply the user's delegated decision authority and validate answers.
- [x] Generate NFR design patterns.
- [x] Generate logical component responsibilities and dependency rules.
- [x] Validate requirement coverage, Markdown, and extension status.
- [x] Obtain explicit approval of Unit 2 NFR Design.

## Question 1

Which resilience pattern should protect the page when an interactive enhancement fails?

A) Static-first graceful degradation with independently isolated client islands and native HTML fallbacks (recommended)

B) One application-wide client error boundary that replaces the complete page

C) Require successful hydration before showing route content

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2

What retry or recovery pattern is appropriate for Unit 2?

A) Use no retries because Unit 2 performs no runtime network operations; recover through local state reset and static fallbacks (recommended)

B) Retry failed client initialization continuously

C) Reload the whole page automatically after an enhancement error

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3

Which scalability pattern should handle the approved content envelope?

A) Use deterministic in-memory selection over preloaded summaries, stable list keys, and server-rendered collection output without pagination infrastructure (recommended)

B) Introduce client virtualization for all lists

C) Add a hosted search index and paginated API

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4

Which performance pattern should constrain interactive code and media?

A) Keep server components as the default, split each client island at its feature boundary, load lightbox behavior only when needed, and reserve media dimensions (recommended)

B) Ship one shared client bundle for every route

C) Optimize only after deployment with no design-time boundaries

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5

Which security boundary should the presentation layer enforce?

A) Accept only Unit 1 validated serializable models, use an explicit curated MDX component map, and prohibit secrets, raw source paths, arbitrary HTML, and server imports in client islands (recommended)

B) Let route components read and sanitize raw files independently

C) Allow content-defined runtime components for flexibility

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6

How should accessibility behavior be structured across interactive components?

A) Use explicit small state machines for navigation and lightbox focus behavior, native semantics, deterministic focus restoration, and reduced-motion variants (recommended)

B) Depend on browser defaults without explicit state modeling

C) Add a general-purpose UI framework to own all focus behavior

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7

Which cache or infrastructure components should Unit 2 introduce?

A) Introduce none; rely on static output and framework-generated immutable assets, with all UI state kept in component memory (recommended)

B) Add a browser service worker and offline application cache

C) Add a runtime cache, queue, and worker for presentation data

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8

How should performance and accessibility regressions be surfaced?

A) Use build output, bundle inspection, component tests, accessibility assertions, and later Unit 3 browser audits with no visitor tracking (recommended)

B) Add production analytics and real-user monitoring in Unit 2

C) Rely only on manual visual inspection

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Decision Record

The user authorized the assistant to answer Unit 2 questions and approved continuation. Option A was selected for all eight questions. These choices preserve the static, private, dependency-light architecture while providing explicit degradation and verification mechanisms.

## Outputs

- `aidlc-docs/construction/portfolio-experience/nfr-design/nfr-design-patterns.md`
- `aidlc-docs/construction/portfolio-experience/nfr-design/logical-components.md`

## Validation Notes

- Every required NFR design category is represented by at least one question.
- Answers are complete and non-contradictory.
- No Mermaid or ASCII diagram is present.
- Optional extensions remain disabled and are not applicable.
