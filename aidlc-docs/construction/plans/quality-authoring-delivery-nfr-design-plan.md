# NFR Design Plan - Quality, Authoring, and Delivery Preparation

## Unit Context

- **Unit**: Unit 3 - Quality, Authoring, and Delivery Preparation
- **Prerequisite**: Unit 3 NFR Requirements approved on 2026-09-09
- **Functional Design**: Skipped by approved stage matrix
- **Scope**: Optional owner editing, integrated quality, CI, artifact integrity, static-host portability, and controlled deployment
- **Deployment safeguard**: Stop and ask for explicit permission immediately before the final external deployment step

## Planning Checklist

- [x] Read approved Unit 3 NFR Requirements and technology decisions.
- [x] Read Units 1 and 2 contracts and integrated verification evidence.
- [x] Verify current primary guidance for Pages CMS, GitHub Actions, and Cloudflare Pages Direct Upload.
- [x] Evaluate resilience, scalability, performance, security, and logical-component design choices.
- [x] Generate targeted questions for all required design categories.
- [x] Apply delegated answers and resolve all ambiguity.
- [x] Generate NFR design patterns.
- [x] Generate logical component design.
- [x] Validate Markdown, traceability, deployment boundary, and extension status.
- [x] Obtain explicit approval of Unit 3 NFR Design.

## Question 1 - Resilience

How should the quality and release pipeline respond to a failed stage?

A) Fail closed, retain actionable evidence, skip dependent stages, and leave the last known-good deployment untouched (recommended)

B) Continue all stages and deploy with warnings

C) Retry every failure indefinitely

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Recovery

What rollback pattern should the controlled deployment use?

A) Retain the previous known-good Pages deployment and Git commit, smoke-test the new release, and roll back on a blocking failure (recommended)

B) Rebuild an older version manually without recording its commit

C) Treat every deployment as irreversible

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Scalability

How should quality automation scale with the approved content envelope?

A) Use deterministic bounded scans and the existing 750-record benchmark without runtime services or unbounded repository traversal (recommended)

B) Add a database-backed indexing service

C) Validate only the six initial demonstration records

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Performance

How should CI avoid duplicating expensive work while preserving clear failures?

A) Separate static quality/build from browser journeys, pass the exact built artifact between jobs, and keep the release dependent on both (recommended)

B) Reinstall and rebuild independently for every test file

C) Combine deployment with the first successful command

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Security

How should Cloudflare credentials and environment values enter the release?

A) Use a protected GitHub environment with least-privilege secrets and an approved production-origin variable; never expose values to pull-request jobs or artifacts (recommended)

B) Commit credentials in a Wrangler configuration file

C) Put the API token in a public repository variable

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Deployment Control

Which Cloudflare Pages deployment model best preserves the explicit final permission gate?

A) Use a manual Direct Upload release of the already verified `out` artifact through Wrangler, with no push-triggered production deployment (recommended)

B) Enable automatic production deployment on every push

C) Deploy through a runtime Pages Function

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - CMS Boundary

How should the Pages CMS configuration avoid schema drift?

A) Mirror Unit 1 fields explicitly, restrict operations and media roots, test config-to-schema coverage, and keep TypeScript configuration outside CMS control (recommended)

B) Allow arbitrary front matter and rely on failed builds

C) Let CMS users edit the whole repository

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Browser Evidence

How should browser tests consume the built application?

A) Serve the exact static artifact on a loopback-only ephemeral port, run isolated Playwright journeys, then terminate the server deterministically (recommended)

B) Test a development server with hot reload

C) Test the live production site only after deployment

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Logical Components

How should repository quality checks be organized?

A) Keep small single-purpose audit modules behind one aggregate package command, with isolated fixtures and safe file-and-rule diagnostics (recommended)

B) Put all checks in one opaque shell script

C) Depend on manual review with no executable checks

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Future Data

How should the dormant GitHub contribution boundary interact with CI and deployment?

A) Keep it absent from required workflows and releases until a separately approved acquisition job writes validated static data (recommended)

B) Fetch contributions in the browser after deployment

C) Make deployment fail when contribution data is absent

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Decision Record

The user authorized continued progress, retained delegated question answering, and explicitly required a permission request before the final deployment step. Option A was selected for all ten decisions. A manual Direct Upload release was chosen over push-triggered Git integration because it preserves a precise, observable final action that can be held until permission is granted.

## Outputs

- `aidlc-docs/construction/quality-authoring-delivery/nfr-design/nfr-design-patterns.md`
- `aidlc-docs/construction/quality-authoring-delivery/nfr-design/logical-components.md`

## Validation Notes

- All required design categories have targeted questions and unambiguous answers.
- No Mermaid or ASCII diagram is present.
- Markdown tables, paths, inline code, and links are parser-safe.
- Optional extensions remain disabled and are not applicable.
