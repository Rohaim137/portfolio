# NFR Design Patterns - Quality, Authoring, and Delivery Preparation

## Design Objective

Unit 3 surrounds the existing static application with optional authoring, deterministic verification, controlled release, and recovery patterns. The design preserves Git and the built `out` directory as the authoritative inputs to deployment and creates no runtime application service.

## 1. Git-Backed Optional Editor

**Pattern**: Adapter around the existing content source of truth.

- A repository-root `.pages.yml` describes projects, blog posts, reading records, and approved media roots.
- Pages CMS edits the same Markdown or MDX files consumed by Unit 1; the public site never calls Pages CMS.
- Field definitions mirror the strict Unit 1 schemas, including separate `draft` and `demo` flags.
- Filename templates and author guidance preserve filename-to-slug equality.
- TypeScript site and public-document configuration remain outside the CMS adapter and require code review.
- Local and GitHub file editing remain complete fallback workflows.

**Failure behavior**: An unavailable CMS affects editing convenience only. Invalid saved content fails repository validation before merge or deployment.

## 2. Branch-First Authoring Gate

**Pattern**: Reviewable change set before publication.

- Browser-authored and local changes target a non-production branch by default.
- A pull request exposes the exact diff and runs the same quality workflow.
- Merge is allowed only after required checks succeed and the owner accepts the content claims and public files.
- CMS actions do not deploy or merge.

**Recovery**: Revert the content commit or close the branch; no database recovery is required.

## 3. Fail-Closed Quality Pipeline

**Pattern**: Ordered gates with explicit evidence.

1. Install from the lockfile.
2. Check formatting, lint, and types.
3. Run unit, component, accessibility, and audit-script tests with coverage.
4. Build the static artifact without a production origin for ordinary pull requests.
5. Audit routes, files, secrets, claims, and detectable design constraints.
6. Run browser journeys against the exact artifact.
7. Make the verified artifact eligible for a separately invoked release.

Every gate returns a nonzero exit code on failure. Dependent jobs do not run, and no failure path uploads to Cloudflare.

## 4. Build-Once Artifact Handoff

**Pattern**: Immutable build evidence shared by downstream checks.

- The quality job produces `out/` from one reviewed commit.
- Artifact auditing runs before transfer and records route and chunk evidence.
- A short-retention private GitHub Actions artifact carries the exact static output to browser verification or a manually approved release.
- The artifact name includes the commit SHA; release logic rejects a mismatched or unverified commit.

This reduces repeated build work while preventing the release job from deploying untested local output.

## 5. Deterministic Repository Audits

**Pattern**: Small pure scanners with centralized policy.

- Artifact integrity, public-file safety, and detectable anti-slop rules are separate modules.
- Each scanner accepts an explicit root and returns structured file-and-rule findings.
- Paths are normalized relative to the scanned root.
- Suspected secret values are never printed.
- Positive and negative fixtures prove every blocking signature and allowlist.
- One aggregate package command runs all required audits.

Scans use bounded repository roots and extensions rather than traversing the machine or following links outside the workspace.

## 6. Production-Artifact Browser Harness

**Pattern**: Browser journeys against static output.

- Build first, then serve `out/` on a loopback-only ephemeral port.
- Playwright owns server startup, readiness, test isolation, and termination.
- Required Chromium journeys cover routes, navigation, project filters, image dialog, articles, truthful empty states, 404 recovery, reduced motion, and 320-pixel overflow.
- Traces and screenshots are retained only on failure and contain public demonstration data only.
- A documented periodic matrix covers Firefox, WebKit, current mobile Safari, and current mobile Chrome until promoted to required automation.

## 7. Least-Privilege Release Boundary

**Pattern**: Manual deployment with environment isolation.

- Production deployment uses Cloudflare Pages Direct Upload through Wrangler.
- The release consumes the previously verified `out` artifact.
- The workflow has no push trigger; it is invoked manually for a selected verified commit.
- Cloudflare account ID and a Pages-edit API token live only in a protected GitHub environment or an approved ephemeral local session.
- `NEXT_PUBLIC_SITE_URL` is supplied only as an approved HTTPS production variable before the release build.
- Pull-request jobs receive no Cloudflare credential.

**Mandatory human gate**: The assistant stops and asks the user for explicit permission immediately before the Wrangler upload or equivalent final dashboard publish action.

## 8. Smoke-Tested Release and Rollback

**Pattern**: Verify, promote, observe, recover.

- Record the commit SHA, artifact identity, Pages project, deployment URL, and timestamp.
- After upload, check HTTPS, the overview, representative indexes and details, local assets, canonical metadata, sitemap, robots directives, and custom not-found behavior.
- A blocking smoke failure prevents completion and triggers rollback to the previous known-good Cloudflare deployment or a redeploy of the known-good Git commit.
- Never delete the previous deployment as part of the normal release flow.

No numeric uptime or recovery guarantee is asserted until real operational evidence exists.

## 9. Capacity and Performance Evidence

**Pattern**: Separate deterministic release gates from environment-sensitive audits.

- The 750-record and 1,000-media-reference benchmark remains a release check with a 120-second threshold.
- Artifact inspection records generated routes and feature client chunks.
- Lighthouse instructions fix browser, throttling, viewport, and server conditions when scores are collected.
- Lighthouse remains a documented release review rather than a network-sensitive pull-request blocker.

## 10. Dormant Generated-Data Port

**Pattern**: Disabled adapter with safe absence.

- Required quality and deployment workflows do not fetch GitHub contribution data.
- Future acquisition runs only at build time, uses a least-privilege secret, validates output, and writes through the Unit 1 generated-data contract.
- Missing or invalid generated data preserves the verified GitHub link and cannot block the rest of the portfolio.
- Enabling the adapter requires a separate approved design and implementation change.

## Requirements Traceability

| Pattern | Requirements |
|---|---|
| Git-backed editor and branch gate | U3-NFR-001 through U3-NFR-012 |
| Quality pipeline and artifact handoff | U3-NFR-013 through U3-NFR-022, U3-NFR-044 |
| Browser harness | U3-NFR-023 through U3-NFR-029 |
| Repository audits | U3-NFR-030 through U3-NFR-037, U3-NFR-056 through U3-NFR-060 |
| Capacity and performance evidence | U3-NFR-038 through U3-NFR-042 |
| Release and rollback | U3-NFR-043 through U3-NFR-050C |
| Generated-data port | U3-NFR-051 through U3-NFR-055 |

## Extension Compliance

- Resiliency Baseline: N/A; disabled. Fail-closed and rollback behavior remains required by core Unit 3 NFRs.
- Security Baseline: N/A; disabled. Least-privilege credentials and artifact safety remain required by core Unit 3 NFRs.
- Property-Based Testing: N/A; disabled. Deterministic fixture tests cover the audit policies.

No enabled extension has an unresolved finding.
