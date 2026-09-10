# Logical Components - Quality, Authoring, and Delivery Preparation

## Component Inventory

| Component | Planned location | Responsibility | Runtime impact |
|---|---|---|---|
| Pages CMS configuration | `.pages.yml` | Map approved collections, fields, media, filenames, and commits to Git-backed editing | None; authoring-time only |
| Authoring handbook | `docs/authoring.md` | Explain local, GitHub, and CMS workflows plus validation and safe publication | None |
| Artifact audit library | `scripts/quality/` | Inspect route inventory, generated files, prohibited patterns, and secret signatures | Build/test only |
| Public-file audit | `scripts/quality/` | Compare public documents with the explicit manifest and detect unsafe additions | Build/test only |
| Design audit | `scripts/quality/` | Enforce detectable anti-slop tokens, markup, icons, filler, and invented metrics | Build/test only |
| Aggregate verifier | `scripts/verify.mjs` and package scripts | Run repository audits with stable exit behavior | Build/test only |
| Audit fixtures and tests | `tests/quality-authoring-delivery/` | Prove positive, negative, boundary, and safe-diagnostic behavior | Test only |
| Browser configuration | `playwright.config.ts` | Serve and test the exact static artifact with controlled browser settings | Test only |
| Browser journeys | `tests/e2e/` | Verify representative routes, keyboard/focus behavior, state, metadata, and overflow | Test only |
| Quality workflow | `.github/workflows/quality.yml` | Run clean install, static quality, build, audits, and browser checks | CI only |
| Manual release workflow | `.github/workflows/deploy-pages.yml` | Deploy one verified artifact to Cloudflare Pages after environment approval | Release only |
| Hosting handbook | `docs/deployment.md` | Describe project creation, variables, secrets, approval, smoke tests, and rollback | None |
| Build-and-test instructions | `aidlc-docs/construction/build-and-test/` | Provide final integrated execution and evidence | Documentation only |

## Pages CMS Configuration

### Inputs

- `content/projects/*.mdx`
- `content/blog/*.mdx`
- `content/reading/*.mdx`
- Approved local media beneath `public/media/`

### Boundaries

- Explicit field definitions mirror Unit 1 strict schemas.
- Collection operations support create and update; deletion and rename behavior must be deliberate and documented.
- Media types and extensions are allowlisted.
- `src/config/site.ts`, `src/config/documents.ts`, environment files, workflows, scripts, and application code are not CMS content roots.
- Pages CMS is not imported by the Next.js application and contributes no browser bundle.

### Verification

- Parse `.pages.yml` in tests.
- Assert required Unit 1 front-matter fields exist in matching CMS collections.
- Assert configured paths remain inside approved content and media roots.
- Create sample CMS-shaped records in isolated test fixtures and validate them with Unit 1 schemas.

## Quality Command Graph

### Static-quality job

- `npm ci`
- formatting check
- zero-warning lint
- strict type checking
- combined tests with coverage
- static build
- artifact and public-file audits
- capacity benchmark for release verification

### Browser job

- Consume the exact verified `out` artifact.
- Install the pinned Chromium browser dependency.
- Start a loopback static server under Playwright control.
- Run representative browser journeys.
- Upload traces and screenshots only on failure.

### Release eligibility

- Both jobs identify the same commit SHA.
- All required checks are successful.
- The release workflow selects that reviewed commit.
- The user grants explicit permission immediately before final deployment.

## Audit Module Contracts

Each audit module follows this logical contract:

- Input: explicit workspace or artifact root and immutable rule configuration.
- Output: a deterministic list of `{ relativePath, ruleId, message }` findings.
- Safety: no file content or suspected secret value appears in diagnostics.
- Exit: aggregate command returns nonzero when any blocking finding exists.
- Tests: isolated fixtures cover safe content, one finding per rule, ordering, path normalization, and empty input.

## Continuous Integration Workflows

### Quality workflow

- Triggers on pull requests, production-branch pushes, and manual dispatch.
- Uses read-only contents permission.
- Uses Node.js 24 LTS and the committed npm lockfile.
- Cancels superseded runs only within the same branch or pull request.
- Does not receive Cloudflare secrets and cannot deploy.

### Manual release workflow

- Has manual dispatch only.
- Requires the production GitHub environment.
- Checks out an explicitly selected reviewed commit.
- Repeats or verifies the release-critical quality contract with the approved production origin.
- Uses least-privilege `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.
- Uses a non-secret `CLOUDFLARE_PAGES_PROJECT` identifier and approved `NEXT_PUBLIC_SITE_URL` value.
- Runs Wrangler Pages Direct Upload against `out` only.
- Emits deployment metadata without emitting credentials.

The workflow file can be generated before credentials exist. It must not be dispatched until the permission gate and environment configuration are complete.

## Deployment Sequence

1. Confirm the production branch and exact commit.
2. Run final clean Build and Test against that commit.
3. Confirm or create the Cloudflare Pages project through a separately approved external action.
4. Configure the approved production origin and least-privilege secrets through separately approved external actions.
5. Present the final deployment command or workflow dispatch and ask the user for explicit permission.
6. Only after permission, upload the verified `out` directory.
7. Record the resulting HTTPS URL and deployment identifier.
8. Run route, asset, metadata, discovery, and recovery smoke checks.
9. Roll back on a blocking failure; otherwise report deployment complete.

## Rollback Component

- Primary rollback: select the previous known-good Cloudflare Pages deployment.
- Reproducible rollback: rebuild and redeploy the recorded known-good Git commit.
- Content-only recovery: revert the offending content commit and run the full release gate.
- Evidence: record the failed deployment, finding, rollback target, and final smoke result without secret values.

## No Runtime Infrastructure

The following logical components are intentionally absent:

- Application database
- Authentication service for the public site
- Server-rendering runtime
- Pages Functions or Workers
- Queue, cache, scheduled worker, or webhook receiver
- Runtime GitHub API client
- Analytics or visitor-data pipeline

## Extension Compliance

- Resiliency Baseline: N/A; disabled. Core pipeline and rollback components still handle the approved failure cases.
- Security Baseline: N/A; disabled. Core secret isolation and permission boundaries remain enforced.
- Property-Based Testing: N/A; disabled. Audit components use deterministic fixtures and boundary tests.

No enabled extension has an unresolved finding.
