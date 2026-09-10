# Deployment Architecture - Quality, Authoring, and Delivery Preparation

## Architecture Summary

The release path builds and verifies one immutable static artifact from one Git commit, then uploads that artifact to one isolated Cloudflare Pages project only after explicit permission. The public application remains static and portable.

## Resource Inventory

| Resource | Provider | Configuration | State before Code Generation |
|---|---|---|---|
| Source repository | GitHub | Existing repository and branches | Existing |
| Quality workflow | GitHub Actions | Pull request, production-branch push, and manual triggers | Planned file only |
| Production environment | GitHub Actions | Protected secrets, variables, and optional reviewers | Not created |
| Static build artifact | GitHub Actions | Commit-addressed private artifact with short retention | Generated per workflow run |
| Pages project | Cloudflare Pages | Isolated Direct Upload project for static files | Not created |
| Preview deployment | Cloudflare Pages | Optional branch-labelled Direct Upload | Not created |
| Production deployment | Cloudflare Pages | Manual Direct Upload from verified `out` | Not created |
| Custom domain | Cloudflare DNS and Pages | Optional approved HTTPS hostname | Not configured |

## Validation Path

1. A local or Pages CMS author creates a Git commit on a non-production branch.
2. A pull request starts the read-only quality workflow.
3. The static-quality job installs locked dependencies, checks formatting, lint, types, tests, coverage, and builds `out`.
4. Artifact, public-file, route, secret, and anti-slop audits inspect `out` and repository policy inputs.
5. The verified artifact is stored privately with its commit SHA.
6. The browser job serves that exact artifact on loopback and runs Playwright journeys.
7. Required checks report success or failure on the pull request.
8. The owner reviews content claims, media, and public documents before merge.

No step in this path has Cloudflare credentials or permission to deploy.

## Release Path

1. Select an exact reviewed production commit.
2. Confirm all required quality checks passed for that commit.
3. Build with the approved `NEXT_PUBLIC_SITE_URL` and rerun release-critical audits.
4. Obtain the matching commit-addressed `out` artifact.
5. Confirm the Cloudflare Pages project name and account context.
6. Verify the least-privilege token is available without displaying it.
7. Stop and ask the user for explicit permission to perform the final deployment.
8. After permission, run the Wrangler Pages Direct Upload for `out` and the selected project.
9. Record the deployment identifier and HTTPS URL.
10. Run smoke checks; report success only if all blocking checks pass.

The first six steps prepare and verify. Step 7 is mandatory. Step 8 is the final external deployment action and must never run before the user's answer.

## Direct Upload Contract

- Deployment input is the `out` directory only.
- The project name is supplied by protected configuration, not hard-coded personal data.
- The production branch or environment is specified explicitly.
- Commit SHA and message metadata identify the source release when supported.
- No `functions` directory or `_worker.js` may be present in the upload context.
- Upload file count and individual file sizes are checked against current Cloudflare Pages limits before release.

## Smoke Checks

The deployed HTTPS origin must pass:

- root response and expected portfolio heading;
- projects index and one project detail;
- blog index and one article detail;
- reading and document truthful states;
- one deliberately missing path returning the intended recovery experience;
- local CSS, JavaScript, SVG, and social-image assets;
- canonical URLs using the approved production origin;
- sitemap containing eligible fixed and detail routes;
- robots directives referencing the correct sitemap when configured;
- absence of mixed content, localhost URLs, temporary example origins, and secret signatures.

## Failure and Rollback

| Failure point | Release behavior | Recovery |
|---|---|---|
| Quality or build failure | Do not upload | Fix on a branch and rerun validation |
| Artifact mismatch | Do not upload | Select the artifact produced from the exact reviewed commit |
| Missing credential or project | Do not upload | Correct protected configuration after approval |
| Upload failure | Do not report deployment complete | Preserve current production and retry only after diagnosis |
| Blocking smoke failure | Mark release failed | Roll back to previous known-good Pages deployment or redeploy known-good commit |
| Nonblocking observation | Record explicitly | Schedule a reviewed corrective change |

Rollback changes live external state and therefore requires explicit confirmation before execution unless the user has already specifically authorized rollback for that failed release.

## Portability

- `out` is ordinary static content and can be served by another static host.
- No Cloudflare runtime API appears in application code.
- Cloudflare-specific values exist only in release configuration and documentation.
- Switching hosts requires replacing the upload adapter and origin configuration, not rewriting portfolio routes or content.

## Shared Infrastructure

No shared infrastructure artifact is required. The Pages project, GitHub production environment, credentials, artifacts, and deployment history are isolated to this repository.

## Extension Compliance

- Resiliency Baseline: N/A; disabled. Core failure and rollback paths are explicit.
- Security Baseline: N/A; disabled. Core protected-environment and least-privilege controls are explicit.
- Property-Based Testing: N/A; disabled.

No enabled extension has an unresolved finding.
