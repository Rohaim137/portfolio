# Code Generation Plan - Quality, Authoring, and Delivery Preparation

## Authority and Location

This document is the single source of truth for Unit 3 Code Generation.

- **Workspace root**: `C:\Users\RBTG\Downloads\port\port`
- **Application, scripts, tests, and configuration**: Workspace root only
- **Quality scripts**: `scripts/quality/`
- **Unit tests**: `tests/quality-authoring-delivery/`
- **Browser tests**: `tests/e2e/`
- **CI and release workflows**: `.github/workflows/`
- **Owner and deployment guidance**: `docs/`
- **Documentation summary**: `aidlc-docs/construction/quality-authoring-delivery/code/`
- **Forbidden application location**: `aidlc-docs/`

## Unit Context

- **Unit**: Unit 3 - Quality, Authoring, and Delivery Preparation
- **Primary story**: US-014
- **Supporting stories**: US-001 through US-013, especially US-010 through US-013
- **Dependencies**: Approved Unit 1 foundation and Unit 2 experience
- **Functional Design**: Skipped by approved stage matrix
- **NFR Requirements, NFR Design, and Infrastructure Design**: Approved
- **Database entities**: None
- **Runtime API or service**: None
- **Deployment target**: One isolated Cloudflare Pages Direct Upload project
- **External state rule**: Generation creates configuration and instructions only; account, secret, project, domain, preview upload, rollback, and final deployment actions require their applicable confirmations
- **Mandatory final gate**: Ask the user for explicit permission immediately before the final production upload or equivalent publish action after Build and Test

## Expected Interfaces

- `.pages.yml` matching Unit 1 project, post, and reading schemas
- Repository-local audit modules returning safe deterministic findings
- Stable package commands for local and CI verification
- Playwright browser journeys against the exact static artifact
- Read-only quality CI and a manual protected release workflow
- Authoring, deployment, smoke, and rollback handbooks
- No CMS or Cloudflare import in application runtime code

## Planning Checklist

- [x] Read the Unit 3 definition, story map, dependencies, approved NFR Requirements, NFR Design, and Infrastructure Design.
- [x] Confirm Units 1 and 2 are approved and all integrated tests currently pass.
- [x] Inspect the working tree, current branch, toolchain, package commands, route output, and existing documentation.
- [x] Identify exact configuration, script, test, workflow, documentation, and summary locations.
- [x] Map generation steps to US-014 and supporting acceptance criteria.
- [x] Identify custom runtime admin, API, database, migration, queue, worker, analytics, live GitHub acquisition, and auto-deployment work as not applicable.
- [x] Preserve the user-required explicit permission gate before the final production deployment.
- [x] Create and validate the numbered generation sequence.
- [x] Log the complete plan approval prompt.
- [x] Obtain explicit approval of the complete Unit 3 Code Generation plan.

## Numbered Generation Sequence

### Step 1: Baseline and compatible tooling

- [x] Reinspect the integrated working tree and rerun the existing 58-test baseline before dependency changes.
- [x] Resolve exact stable versions of YAML parsing, Playwright browser testing, browser accessibility integration, and Wrangler compatible with Node.js 24 and the pinned project toolchain.
- [x] Add development-only dependencies without prereleases, forced peer overrides, runtime UI packages, or automatic external setup.
- [x] Run the full existing regression suite and dependency audit after installation.

**Story mapping**: US-013 and US-014; all prior stories as regression protection

### Step 2: Pages CMS owner-editor configuration

- [x] Create repository-root `.pages.yml` for projects, posts, reading records, and bounded local media.
- [x] Mirror strict Unit 1 fields, separate draft and Demo controls, safe filename templates, and rich-text body handling.
- [x] Exclude TypeScript site configuration, public-document configuration, workflows, scripts, secrets, and arbitrary repository files.
- [x] Configure review-oriented commit messages without deployment actions.

**Story mapping**: US-010; US-003 through US-008 support

### Step 3: CMS schema-parity validation

- [x] Create reusable CMS configuration validation under `scripts/quality/`.
- [x] Verify collection names, roots, required fields, field types, media roots, file extensions, and forbidden paths against Unit 1 contracts.
- [x] Add isolated passing and failing tests under `tests/quality-authoring-delivery/`.
- [x] Ensure reading body authoring explicitly reflects the static-detail activation constraint rather than creating a broken link.

**Story mapping**: US-010, US-014

### Step 4: Complete owner authoring handbook

- [x] Create `docs/authoring.md` covering local, GitHub, and Pages CMS workflows.
- [x] Document projects, posts, reading list records, reading-detail activation, media, site data, social destinations, public documents, drafts, Demo replacement, validation, preview, and rollback.
- [x] Use generic replaceable examples with no invented owner facts.
- [x] Explain that Pages CMS is the external owner editor, not a public `/admin` route or runtime dependency.

**Story mapping**: US-010; US-003 through US-009 support

### Step 5: Artifact-integrity audit module

- [x] Implement a bounded audit for `out/` routes, unexpected runtime files, draft markers, secret signatures, private-key headers, absolute paths, temporary origins, localhost links, and placeholder services.
- [x] Derive eligible content routes from validated repository inputs rather than hard-coding demo-only slugs.
- [x] Emit relative file and rule diagnostics without printing suspected secret values.
- [x] Verify empty, safe, missing-output, unexpected-route, and prohibited-content cases with tests.

**Story mapping**: US-008, US-011, US-014

### Step 6: Public-file safety audit module

- [x] Audit `public/documents/` against the explicit public-document manifest without enumerating files into the application.
- [x] Reject unlisted document files, sensitive-looking names, unsafe extensions, traversal, and mismatched configured paths.
- [x] Preserve ordinary public application assets outside the document disclosure boundary.
- [x] Add safe, missing, unlisted, and suspicious fixture tests.

**Story mapping**: US-008, US-014

### Step 7: Detectable anti-slop audit module

- [x] Enforce prohibited indigo and violet values, prohibited gradients, emoji feature icons, colored-left-border rounded cards, external placeholder media, filler phrases, and invented metric signatures.
- [x] Enforce token placement and stable major-section `data-od-id` checks where deterministic.
- [x] Keep rule configuration reviewable and avoid false claims about subjective visual quality.
- [x] Add one positive and one or more negative fixtures per blocking rule family.

**Story mapping**: US-012, US-014

### Step 8: Aggregate verification commands

- [x] Create a stable aggregate quality command and focused audit commands in `package.json`.
- [x] Keep local and CI command composition identical and fail on the first blocking stage.
- [x] Add help text and PowerShell `npm.cmd` equivalents to documentation.
- [x] Verify audit scripts never modify source, content, configuration, or built output.

**Story mapping**: US-010, US-014

### Step 9: Static production browser harness

- [x] Create `playwright.config.ts` targeting the built `out/` artifact through a loopback-only static server.
- [x] Create a small safe repository-local static server if required instead of adding a runtime production server.
- [x] Configure deterministic viewport, reduced-motion, trace, screenshot, timeout, and web-server lifecycle behavior.
- [x] Ensure browser installation and execution are explicit commands rather than install-time side effects.

**Story mapping**: US-013, US-014

### Step 10: Integrated browser journeys

- [x] Test the overview, primary navigation, current route, skip link, and not-found recovery.
- [x] Test project filters, no-match reset, project media dialog, arrow keys, Escape, and focus restoration.
- [x] Test article structure and table of contents plus reading and document truthful states.
- [x] Test Demo disclosure, pending destinations, 320-pixel overflow, and emulated reduced motion.
- [x] Run compatible browser accessibility checks on representative routes.

**Story mapping**: US-001 through US-009, US-012, US-013

### Step 11: Read-only GitHub Actions quality workflow

- [x] Create `.github/workflows/quality.yml` for pull requests, production-branch pushes, and manual diagnostics.
- [x] Use current stable official checkout and setup-node majors, Node.js 24, npm caching, `npm ci`, and read-only contents permission.
- [x] Run formatting, lint, types, coverage, build, repository audits, capacity benchmark, and browser journeys with exact-artifact handoff.
- [x] Limit artifacts to static output and failure evidence with short retention and branch-scoped concurrency.
- [x] Validate workflow syntax and confirm it contains no secret or deployment access.

**Story mapping**: US-013, US-014; all stories as regression scope

### Step 12: Manual protected Cloudflare Pages release workflow

- [x] Create `.github/workflows/deploy-pages.yml` with manual dispatch only and a protected production environment.
- [x] Require an exact commit, approved HTTPS origin, Pages project identifier, account ID, and least-privilege Pages token without hard-coded values.
- [x] Rebuild and audit the selected commit before using Wrangler Direct Upload on `out`.
- [x] Prevent push, pull-request, schedule, CMS action, or quality-workflow success from automatically invoking deployment.
- [x] Validate workflow syntax and secret masking without dispatching it.

**Story mapping**: US-014

### Step 13: Deployment, smoke, and rollback handbook

- [x] Create `docs/deployment.md` with Cloudflare project, credential, GitHub environment, preview, production-origin, and custom-domain preparation.
- [x] Document the exact preflight, mandatory permission gate, upload, smoke, evidence, and rollback sequence.
- [x] Include direct local Wrangler and manual GitHub workflow alternatives while recommending one controlled path.
- [x] Clearly label every external mutation and never embed real account, project, domain, or secret values.

**Story mapping**: US-014

### Step 14: Integrated Unit 3 verification

- [x] Run formatting, zero-warning lint, strict types, all unit and component tests, expanded coverage, configuration validation, and all audits.
- [x] Install the pinned Chromium binary only after dependency resolution, then run browser journeys against a fresh origin-free static build.
- [x] Run the 750-record capacity benchmark and inspect client chunks, routes, secrets, public files, and canonical gating.
- [x] Validate CI and release workflow structure without connecting GitHub or Cloudflare and without deploying.
- [x] Record any environment-blocked browser or external evidence explicitly.

**Story mapping**: US-001 through US-014

### Step 15: Documentation and code summary

- [x] Update `README.md` with owner-editor, quality, browser, CI, deployment-preparation, and PowerShell guidance.
- [x] Create `aidlc-docs/construction/quality-authoring-delivery/code/code-summary.md` listing artifacts, tests, verification, configuration still required, and external actions not yet performed.
- [x] Mark Unit 3 story and stage progress only after verification succeeds.
- [x] Reconfirm the final production deployment remains pending Build and Test plus explicit user permission.

**Story mapping**: US-010 through US-014; all stories as final traceability

## Post-Code-Generation Release Boundary

Code Generation ends with validated deployment artifacts and instructions. It does not create the Cloudflare project, store credentials, connect accounts, upload a preview, alter DNS, or publish production. After Code Generation approval, Build and Test executes the clean integrated verification instructions. Only then may deployment preparation reach the external action gates.

Immediately before the final production upload or equivalent dashboard publish action, the assistant must stop and ask the user for explicit permission. No earlier approval, including approval of this plan, counts as permission for that final action.

## Explicitly Not Applicable

- Custom public-site owner or `/admin` application
- Runtime CMS SDK or API
- Application database, migration, repository, queue, worker, or cache
- Pages Functions, Cloudflare Workers, KV, D1, R2, or runtime binding
- Analytics, visitor accounts, contact backend, or telemetry
- Live or scheduled GitHub contribution acquisition
- Automatic production deployment on push, merge, CMS save, schedule, or CI success
- Shared infrastructure across applications or tenants

## Expected Files and Directories

```text
.pages.yml
.github/workflows/quality.yml
.github/workflows/deploy-pages.yml
docs/authoring.md
docs/deployment.md
playwright.config.ts
scripts/serve-static.mjs
scripts/verify.mjs
scripts/quality/
tests/e2e/
tests/quality-authoring-delivery/
aidlc-docs/construction/quality-authoring-delivery/code/code-summary.md
```

Exact leaf filenames may be refined only to preserve clear single-purpose boundaries or verified tool requirements. Unit responsibilities and external-action limits may not expand without approval.

## Story Completion Conditions

- US-010 has a functional optional Pages CMS configuration plus complete local, GitHub, and browser authoring guidance.
- US-011 discovery and metadata are audited in the real static artifact.
- US-012 detectable anti-slop constraints are executable and tested without claiming to automate subjective review.
- US-013 representative real-browser accessibility, keyboard, focus, reduced-motion, and overflow journeys are executable.
- US-014 has repeatable local and CI checks, safe artifacts, portable static hosting, a protected manual release path, smoke verification, rollback, and the mandatory permission gate.
- US-001 through US-009 retain integrated regression evidence.

## Plan Validation

- The plan contains fifteen sequential generation steps with explicit checkboxes and story mappings.
- All application, script, test, workflow, and owner documentation files remain outside `aidlc-docs/`.
- The code summary remains inside `aidlc-docs/`.
- Every Unit 3 NFR and logical component maps to implementation and verification.
- Database, API, runtime infrastructure, telemetry, live contribution data, auto-deployment, and shared-resource exclusions are explicit.
- The actual deployment is included in overall scope but remains after Build and Test and behind explicit action-time permission.
- No Mermaid or ASCII diagram is present.
