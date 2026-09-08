# Unit of Work Generation Plan

## Purpose

Decompose the approved single-deployment portfolio application into cohesive development units with explicit responsibilities, dependencies, story ownership, code organization, and per-unit design-stage needs.

## Inputs

- Approved requirements and clarification decisions
- Approved personas and fourteen user stories
- Approved execution plan
- Approved Application Design artifacts
- Greenfield workspace constraints

## Preliminary Decomposition

The execution plan proposes three sequential units:

1. Content and Application Foundation
2. Portfolio Experience
3. Quality, Authoring, and Delivery Preparation

The questions below determine whether to retain or refine these boundaries. All units remain modules of one statically deployed application, not independent network services.

## Execution Checklist

### Part 1 - Planning and approval

- [x] Load approved requirements, stories, execution plan, and Application Design.
- [x] Identify story affinity, shared contracts, technical boundaries, and critical dependencies.
- [x] Evaluate team alignment, deployment model, business domains, and greenfield code organization.
- [x] Create context-specific decomposition questions.
- [x] Validate every answer for completeness, ambiguity, and contradiction.
- [x] Resolve all ambiguous or conflicting answers. No ambiguity remained after applying the approved architecture and delivery constraints.
- [x] Record the selected unit boundaries, dependency approach, ownership model, and code strategy.
- [x] Obtain explicit approval of this unit-of-work plan.

### Part 2 - Unit generation

- [x] Read the approved unit-of-work plan and confirmed decomposition decisions.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work.md` with unit definitions, responsibilities, and greenfield code organization.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-dependency.md` with the unit dependency matrix, sequence, contracts, and integration checkpoints.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-story-map.md` assigning every story to a primary unit and identifying cross-unit support.
- [x] Validate unit cohesion, coupling, and ownership boundaries.
- [x] Verify that all fourteen stories and all Application Design capabilities are assigned.
- [x] Confirm the applicable Functional, NFR Requirements, NFR Design, Infrastructure Design, and Code Generation stages for every unit.
- [x] Record extension compliance; mark disabled extensions as not applicable.
- [x] Mark every completed plan checkbox and update `aidlc-state.md` in the same interaction.
- [x] Present generated units for explicit approval before construction.

## Decomposition Questions

Please enter one letter after every `[Answer]:` tag.

### Question 1: Story grouping
How should stories be grouped into development units?

A) Retain three capability-based units: foundation, portfolio experience, and quality or delivery preparation

B) Use one unit for the entire single-deployment portfolio application

C) Use separate units for each route domain: shell and home, projects, blog, reading, documents, and delivery

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 2: Dependencies
How should work proceed across the selected units?

A) Sequentially stabilize shared content contracts first, build experiences second, then complete integrated quality and delivery preparation

B) Develop all units in parallel against provisional contracts and integrate them at the end

C) Use a hybrid sequence: foundation first, then experience and delivery work in parallel where they do not touch the same files

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 3: Team alignment
Which ownership model should the unit plan assume?

A) One developer or coding agent owns all units sequentially, with explicit review gates between them

B) Multiple developers each own one capability unit and coordinate through shared contracts

C) Multiple developers divide work by frontend, content platform, and testing or delivery specialties

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 4: Deployment model
Should any unit become independently deployable?

A) No; every unit is a logical module inside one statically deployed Next.js application

B) Separate content tooling and automation into an independently deployed service

C) Separate the public portfolio and content preview into independently deployed applications

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 5: Business-domain boundaries
Which domain boundary should take precedence when responsibilities overlap?

A) Shared content and configuration contracts belong to Foundation; visitor-facing composition belongs to Experience; authoring, automated quality, and host preparation belong to Delivery

B) Each content domain owns its loader, UI, tests, and documentation end to end

C) Technical layers take precedence: data, presentation, and tooling remain separate units even when one user story spans them

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

### Question 6: Greenfield code organization
How should application code be organized at the workspace root?

A) One Next.js application with feature directories, shared UI and layout directories, server-only content services, content collections, scripts, and tests

B) A workspace or monorepo with separate packages for the application, content engine, design system, and tooling

C) Primarily route-local files, with only utilities and primitives extracted into shared directories

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

## Mandatory Outputs

- `unit-of-work.md` with unit responsibilities and greenfield code organization
- `unit-of-work-dependency.md` with dependencies and integration sequence
- `unit-of-work-story-map.md` with complete story assignment
- Per-unit construction-stage selection
- Boundary and coverage validation

## Selected Decomposition Decisions

- **Units**: Retain three capability units: Content and Application Foundation; Portfolio Experience; Quality, Authoring, and Delivery Preparation.
- **Sequence**: Stabilize foundation contracts first, implement visitor experiences second, and complete integrated quality and delivery preparation third.
- **Ownership**: One developer or coding agent owns all units sequentially with explicit AIDLC review gates.
- **Deployment**: Every unit remains a module in one statically deployed Next.js application.
- **Responsibility precedence**: Shared content and configuration contracts belong to Foundation; visitor-facing composition belongs to Experience; authoring, automated quality, and host preparation belong to Delivery.
- **Code organization**: One Next.js application at the workspace root, organized into feature directories, shared UI and layout, server-only content services, content collections, scripts, and tests.
- **Decision provenance**: The user authorized the assistant to answer all six questions according to the approved project. Option A was selected for every question.

## Content Validation Record

- Markdown headings, lists, checkboxes, and inline paths were reviewed for parsing compatibility.
- No Mermaid or ASCII diagram is present in this planning artifact.
- Every question covers a required decomposition category and includes mutually exclusive choices, a final `X) Other` option, and an `[Answer]:` tag.
