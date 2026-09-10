# NFR Requirements Plan - Quality, Authoring, and Delivery Preparation

## Unit Context

- **Unit**: Unit 3 - Quality, Authoring, and Delivery Preparation
- **Functional Design**: Skipped by the approved stage matrix because this unit adds no new user-domain behavior
- **Dependencies**: Approved Unit 1 content foundation and Unit 2 portfolio experience
- **Primary story**: US-014
- **Supporting stories**: US-001 through US-013, especially US-010 through US-013
- **Explicit exclusions**: custom runtime admin application, runtime CMS dependency, and live contribution data; account connection, required configuration, and the final deployment are included only through separately confirmed actions

## Planning Checklist

- [x] Read the approved Unit 3 definition, story slice, dependency contract, and stage matrix.
- [x] Reinspect the integrated application, scripts, tests, output path, and current quality evidence.
- [x] Verify current Pages CMS, GitHub Actions, and Cloudflare Pages primary documentation.
- [x] Assess scalability, performance, availability, security, reliability, maintainability, usability, and portability needs.
- [x] Generate questions for all material NFR and technology choices.
- [x] Apply the user's standing delegated decision authority and validate all answers.
- [x] Generate measurable Unit 3 NFR requirements.
- [x] Generate Unit 3 technology decisions.
- [x] Validate Markdown, traceability, question format, and extension status.
- [x] Obtain explicit approval of Unit 3 NFR Requirements.

## Question 1

How should the browser-based owner editing experience be supplied?

A) Configure hosted Pages CMS as an optional Git-backed editor while preserving local and GitHub file editing as complete fallbacks (recommended)

B) Build and maintain a custom authenticated admin application

C) Require local file editing only and omit a browser editor

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2

Which content should Pages CMS expose initially?

A) Projects, blog posts, reading records, and carefully scoped media; keep TypeScript site and public-document configuration in reviewed repository files (recommended)

B) Expose every repository file through the CMS

C) Expose blog posts only

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3

How should CMS-authored changes reach the production branch?

A) Author on a selected non-production branch and use GitHub review and CI before merging; document direct commits only as an owner-controlled alternative (recommended)

B) Save directly to the production branch with no review

C) Add an application runtime approval database

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4

What quality workflow should GitHub Actions enforce?

A) Clean install, formatting check, zero-warning lint, strict types, combined coverage, static build, and artifact-integrity checks on pull requests and protected-branch pushes (recommended)

B) Run the production build only

C) Run tests only after deployment

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5

Which Node.js baseline should automation use?

A) Node.js 24 LTS with npm cache and `npm ci`, while retaining the package engine floor already verified by the application (recommended)

B) Use whatever Node.js version happens to be installed on the runner

C) Test every supported Node.js major on every commit

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6

How should integrated browser verification be introduced?

A) Add a pinned Playwright test dependency with focused Chromium journeys locally and in CI, plus documented cross-browser manual coverage (recommended)

B) Depend only on jsdom component tests

C) Add an unbounded full-device cloud testing service

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7

How should detectable anti-slop and static-artifact safety rules be enforced?

A) Add deterministic local scripts with explicit allowlists, actionable failures, and tests; run the same scripts in CI (recommended)

B) Rely on visual memory during review

C) Add an external AI review service to every build

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8

What performance evidence should Unit 3 require?

A) Retain the 120-second content-capacity gate, record route/client output, and add representative Lighthouse guidance without making network-dependent scoring a normal local build requirement (recommended)

B) Require perfect Lighthouse scores on every commit

C) Remove numeric performance verification

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9

How should Cloudflare delivery be handled in this unit after the user's scope expansion?

A) Prepare the static Next.js Pages configuration, then connect and deploy only after all integrated checks pass and the user confirms the external action at execution time (recommended)

B) Prepare instructions only and exclude an actual deployment

C) Add Cloudflare Workers runtime bindings

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10

What availability and recovery model fits this static portfolio?

A) Treat Git history and reproducible static output as recovery mechanisms, require host portability, and avoid unsupported uptime guarantees (recommended)

B) Add a database backup and failover service

C) Promise a numeric uptime SLA without operational evidence

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11

How should future GitHub contribution automation be prepared?

A) Document a least-privilege, build-time-only secret boundary and keep the feature disabled until separate authorization (recommended)

B) Add a browser token and enable live fetching now

C) Scrape the public profile during page requests

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12

What must happen when a content, quality, CMS, or host configuration check fails?

A) Fail closed before merge or upload with a specific file, field, rule, or command diagnosis; never publish partial or stale output (recommended)

B) Continue deployment and surface a warning afterward

C) Silently omit the failing content or check

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Decision Record

The user previously authorized the assistant to answer project questions, requested continued progress into Unit 3, and then explicitly added deployment to scope. Option A was selected for all twelve decisions because it preserves Git as the content source of truth, supplies the requested owner editing experience without a custom runtime backend, keeps CI identical to verified local commands, and performs publication only after verification and explicit action-time confirmation.

## Outputs

- `aidlc-docs/construction/quality-authoring-delivery/nfr-requirements/nfr-requirements.md`
- `aidlc-docs/construction/quality-authoring-delivery/nfr-requirements/tech-stack-decisions.md`

## Validation Notes

- Every question provides mutually distinguishable A through D options and one valid `[Answer]:` value.
- No Mermaid or ASCII diagram is present.
- Paths and Markdown constructs are parser-safe.
- All optional extensions remain disabled and are therefore not applicable.
