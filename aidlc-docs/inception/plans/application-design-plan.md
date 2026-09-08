# Application Design Plan

## Purpose

Define the portfolio's high-level component boundaries, public interfaces, service orchestration, and dependency direction before units and detailed functional rules are designed.

## Inputs

- Approved requirements in `aidlc-docs/inception/requirements/requirements.md`
- Approved personas and stories in `aidlc-docs/inception/user-stories/`
- Approved workflow in `aidlc-docs/inception/plans/execution-plan.md`
- UI constraints in `anti-ai-slop.md`

## Scope

Application Design will define:

- Static route and layout composition
- Feature components for home, projects, blog, reading, documents, and social or GitHub areas
- Typed content and site-configuration interfaces
- Build-time Markdown or MDX orchestration
- Shared media, metadata, disclosure, empty-state, and interaction components
- Dependency direction between routes, features, content services, and infrastructure adapters

Detailed parsing algorithms, filtering rules, accessibility implementation, and build configuration remain for per-unit Functional and NFR Design.

## Execution Checklist

### Part 1 - Planning and decisions

- [x] Load approved requirements, stories, personas, and execution plan.
- [x] Identify application capabilities and candidate component boundaries.
- [x] Identify unresolved component, method, service, dependency, and design-pattern decisions.
- [x] Create context-specific design questions with valid answer options.
- [x] Validate all answers for completeness, ambiguity, and contradiction.
- [x] Resolve any remaining ambiguities in this plan. No ambiguity remained after applying the project constraints.
- [x] Record the approved application-design decisions.

### Part 2 - Artifact generation

- [x] Generate `aidlc-docs/inception/application-design/components.md` with component purposes, responsibilities, and interfaces.
- [x] Generate `aidlc-docs/inception/application-design/component-methods.md` with high-level TypeScript signatures and input or output contracts.
- [x] Generate `aidlc-docs/inception/application-design/services.md` with service boundaries and orchestration patterns.
- [x] Generate `aidlc-docs/inception/application-design/component-dependency.md` with a dependency matrix, communication patterns, a validated data-flow diagram, and text alternative.
- [x] Generate `aidlc-docs/inception/application-design/application-design.md` as the consolidated design.
- [x] Verify route, story, accessibility, anti-slop, security, and static-export coverage.
- [x] Record extension compliance; mark disabled extensions as not applicable.
- [x] Update every completed checkbox and AIDLC state in the same interaction.
- [x] Present the complete design for explicit approval.

## Design Questions

Please enter one letter after every `[Answer]:` tag.

### Question 1
How should application components be organized?

A) Feature-first: group project, blog, reading, document, home, and GitHub components by domain, with a small shared UI and layout layer

B) Layer-first: group all pages, presentation components, content components, and utilities into broad technical layers

C) Route-local: keep most components beside each route and extract shared code only after duplication appears

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 2
How should routes access portfolio content?

A) Through typed build-time content services that hide file-system and MDX details from route components

B) Through direct content-loader imports in each route, minimizing service abstractions

C) Through pre-generated JSON files that every route imports directly

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 3
How should MDX component capabilities be constrained?

A) Use a curated component map for code, media, notes, and links; reject unsupported or unsafe constructs during validation

B) Allow ordinary Markdown plus raw HTML, relying on author trust and build-time review

C) Limit all content to plain Markdown without custom MDX components

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 4
What rendering and interaction boundary should the design use?

A) Server or build-rendered components by default, with small client islands only for navigation state, filters, and necessary media interaction

B) Client-render all feature pages to keep interaction patterns uniform

C) Use no client components, accepting URL-only filters and native media behavior

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 5
How should invalid or incomplete content be handled at the service boundary?

A) Fail validation for invalid required fields, ignore drafts in production, and model missing optional data explicitly so components render designed alternatives

B) Skip any invalid record with a build warning so other content still publishes

C) Apply defaults to missing or invalid fields whenever possible and fail only if a route cannot be generated

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 6
How should project galleries and lightbox-style media be designed?

A) Use an accessible reusable gallery with native image or video elements, keyboard controls, captions, focus management, and a non-modal inline fallback

B) Use only inline media without a lightbox, reducing interaction complexity

C) Use a third-party gallery component and adapt its styling and accessibility behavior

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

## Mandatory Outputs

- `components.md`
- `component-methods.md`
- `services.md`
- `component-dependency.md`
- `application-design.md`

## Selected Design Decisions

- **Component organization**: Feature-first domains with a deliberately small shared layout and UI layer.
- **Content boundary**: Typed build-time services hide file-system, front-matter, and MDX compilation details from routes.
- **MDX safety**: A curated component map permits only supported code, media, note, and link presentations.
- **Rendering boundary**: Build-rendered components are the default; client islands are limited to stateful navigation, project filters, and gallery interaction.
- **Validation**: Invalid required content fails with file and field context; drafts are excluded from production; optional absence remains explicit.
- **Media**: A reusable accessible gallery provides native media, keyboard behavior, focus management, captions, and an inline fallback.
- **Decision provenance**: The user authorized the assistant to answer all six questions according to the approved project. Option A was selected for every question.

## Content Validation Record

- Markdown structure, lists, checkboxes, and inline code were reviewed for parsing compatibility.
- The plan contains no Mermaid or ASCII diagram.
- Every question contains at least two meaningful choices, a final `X) Other` option, and an `[Answer]:` tag.
