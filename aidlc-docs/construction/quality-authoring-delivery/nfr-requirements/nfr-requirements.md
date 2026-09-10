# NFR Requirements - Quality, Authoring, and Delivery Preparation

## Scope

These requirements govern the optional Git-backed owner editor, integrated verification, continuous integration, artifact inspection, future generated-data boundary, static-host preparation, and the user-added controlled Cloudflare Pages deployment. They do not authorize a custom admin backend or live contribution collection. Account connection, production configuration, and the final publish action require explicit confirmation when those actions are ready.

## Authoring Usability and Correctness

- **U3-NFR-001**: Pages CMS must be configured through a repository-root `.pages.yml` file and must remain optional to local and GitHub editing.
- **U3-NFR-002**: CMS availability or failure must not affect the built site's availability or runtime behavior.
- **U3-NFR-003**: CMS collections must cover project, blog, and reading front matter plus rich-text bodies without adding fields rejected by Unit 1 strict schemas.
- **U3-NFR-004**: Media configuration must write repository paths and public URLs compatible with existing local-media policies.
- **U3-NFR-005**: CMS media access must be limited to deliberate image and video locations and must not expose secrets, environment files, source code, or arbitrary public documents.
- **U3-NFR-006**: TypeScript site configuration and the explicit public-document manifest must remain repository-reviewed files unless a future typed structured-data migration is separately designed.
- **U3-NFR-007**: Generated filenames and editable slug fields must preserve the filename-stem-to-slug invariant.
- **U3-NFR-008**: Draft and Demo controls must remain distinct booleans with explanatory authoring guidance.
- **U3-NFR-009**: Authoring guidance must cover create, edit, preview, validation, draft, Demo replacement, removal, media, reading-detail activation, and public-document disclosure.
- **U3-NFR-010**: Generic examples must never be represented as verified owner biography, employment, client work, results, or opinion.
- **U3-NFR-011**: The preferred browser authoring flow must use a non-production branch and pull-request review before production merge.
- **U3-NFR-012**: A saved CMS change is a Git repository mutation and must be documented as such, including commit history and rollback behavior.

## Continuous Integration

- **U3-NFR-013**: GitHub Actions must run on pull requests and protected-branch pushes without deploying the site.
- **U3-NFR-014**: CI must use Node.js 24 LTS, npm dependency caching, and `npm ci` against the committed lockfile.
- **U3-NFR-015**: CI must execute the same formatting, zero-warning lint, strict type, test coverage, static build, and artifact checks documented for local use.
- **U3-NFR-016**: Every required command must stop the workflow on a nonzero exit code.
- **U3-NFR-017**: Workflow permissions must default to read-only repository contents and must not request deployment, package, issue, or pull-request write access.
- **U3-NFR-018**: CI must not require application secrets for ordinary validation.
- **U3-NFR-019**: Third-party actions must use explicit stable major versions documented by their primary maintainers.
- **U3-NFR-020**: CI logs and uploaded artifacts must contain no environment secret values or absolute developer-workspace paths.
- **U3-NFR-021**: Concurrency may cancel superseded runs for the same pull request or branch without cancelling unrelated branches.
- **U3-NFR-022**: Static output may be retained briefly as a review artifact, but artifact upload must not itself publish a public website.

## Integrated Browser and Accessibility Verification

- **U3-NFR-023**: A pinned Playwright test dependency must cover representative overview, project filtering, project detail, article, reading, documents, navigation, and recovery journeys.
- **U3-NFR-024**: Automated browser tests must verify keyboard operability, focus restoration, visible current and selected state, Demo disclosure, truthful unavailable states, and absence of horizontal page overflow at a 320 CSS-pixel viewport.
- **U3-NFR-025**: Browser tests must run against a production static preview rather than relying only on the development server.
- **U3-NFR-026**: CI's required browser profile may be Chromium; current Firefox, WebKit, mobile Safari, and mobile Chrome coverage must remain in a documented periodic manual matrix unless later promoted to CI.
- **U3-NFR-027**: Reduced-motion checks must emulate the user preference and verify content remains present while nonessential motion is removed.
- **U3-NFR-028**: Automated accessibility checks must complement rather than replace keyboard, focus-order, copy, and visual review.
- **U3-NFR-029**: When a local environment cannot install or launch a browser, the failure and remaining manual evidence must be explicit rather than silently treated as passing.

## Artifact Integrity and Security

- **U3-NFR-030**: A deterministic artifact-audit command must inspect `out/` and fail on credential signatures, private-key headers, absolute workspace paths, draft markers, temporary canonical origins, external placeholder media hosts, and prohibited filler copy.
- **U3-NFR-031**: The artifact audit must validate the expected static route set and reject unexpected server-function or worker output.
- **U3-NFR-032**: Public-document verification must compare actual public document files to the explicit manifest and reject unlisted sensitive-looking files.
- **U3-NFR-033**: Detectable anti-slop checks must reject the supplied prohibited indigo and violet values, prohibited gradients, emoji feature icons, filler phrases, and unsupported invented metrics.
- **U3-NFR-034**: Anti-slop rules must be repository-local, deterministic, reviewable, and independently tested with passing and failing fixtures.
- **U3-NFR-035**: Safety scans must avoid printing suspected secret values in logs; diagnostics identify the file and rule only.
- **U3-NFR-036**: No Unit 3 code may add runtime `eval`, arbitrary MDX execution, analytics, cookies, visitor data collection, or browser-held service credentials.
- **U3-NFR-037**: Dependency audit results must be recorded, and critical or high production dependency findings must block completion unless explicitly assessed and documented.

## Performance and Scalability

- **U3-NFR-038**: The existing 750-record, 1,000-media-reference benchmark must remain below 120 seconds on the reference environment.
- **U3-NFR-039**: Production verification must record generated route count and identify route-scoped feature chunks so unexpected client expansion is detectable.
- **U3-NFR-040**: Required CI must avoid network-dependent Lighthouse scoring to remain deterministic; representative Lighthouse execution and its environment belong in a documented audit procedure.
- **U3-NFR-041**: The authoring configuration must remain usable at the approved 250-record-per-collection envelope without requiring a runtime search service.
- **U3-NFR-042**: Added quality tooling must be development-only and must add no browser runtime dependency.

## Availability, Recovery, and Portability

- **U3-NFR-043**: Git history and a reproducible lockfile-based build are the authoritative rollback and recovery mechanisms.
- **U3-NFR-044**: Failed content, test, quality, or artifact checks must fail closed before merge or upload and must not publish partial output.
- **U3-NFR-045**: The static artifact must run from ordinary static hosting without a database, serverless function, worker binding, queue, cache service, or mandatory paid service.
- **U3-NFR-046**: Cloudflare Pages preparation must use repository root, `npm run build`, and `out` while remaining portable to another static host.
- **U3-NFR-047**: `NEXT_PUBLIC_SITE_URL` must remain unset until an HTTPS production origin is approved and must be configured independently for preview and production if used.
- **U3-NFR-048**: Cloudflare account access, Pages project creation, custom domain, environment-variable mutation, and first deployment are in scope but require explicit action-time confirmation.
- **U3-NFR-049**: Deployment documentation must include preview review, production promotion, rollback through Git revert or known-good commit, and post-deployment smoke checks.
- **U3-NFR-050**: No numeric uptime, recovery-time, or recovery-point guarantee may be claimed without an operated service and measured evidence.
- **U3-NFR-050A**: Deployment may begin only from the reviewed production branch after all required Build and Test checks pass against the exact commit being released.
- **U3-NFR-050B**: A successful deployment must be followed by HTTPS, route, asset, metadata, and not-found smoke checks against the deployed origin.
- **U3-NFR-050C**: If a blocking smoke check fails, the release must be rolled back to the last known-good Cloudflare deployment or Git commit before being reported complete.

## Future GitHub Contribution Boundary

- **U3-NFR-051**: Contribution acquisition must remain disabled and must never occur in the browser or during page requests.
- **U3-NFR-052**: Future automation may write only schema-validated generated static data consumed through the existing replaceable boundary.
- **U3-NFR-053**: Any future credential must be least privilege, stored only in an approved CI secret store, masked from logs, and absent from artifacts and repository files.
- **U3-NFR-054**: Enabling contribution automation requires separate authorization, threat review, failure policy, retention decision, and tests.
- **U3-NFR-055**: Missing, stale, rate-limited, or invalid generated contribution data must leave the verified profile link and the rest of the site functional.

## Maintainability and Evidence

- **U3-NFR-056**: Quality scripts must be small, typed or strictly checked, and expose stable package commands suitable for local use and CI.
- **U3-NFR-057**: Test fixtures for audit scripts must remain outside production content and output.
- **U3-NFR-058**: Configuration documentation must cite the primary Pages CMS, GitHub Actions, Next.js, and Cloudflare Pages behavior on which it relies.
- **U3-NFR-059**: README commands must include the `npm.cmd` PowerShell workaround without requiring a system execution-policy change.
- **U3-NFR-060**: Unit 3 completion evidence must distinguish automated results, manual results, deferred external actions, and environment-blocked checks.

## Traceability Summary

| NFR area | Primary story coverage |
|---|---|
| Authoring usability and correctness | US-010; US-003 through US-008 support |
| CI and integrated quality | US-014; all stories as regression coverage |
| Browser and accessibility verification | US-001 through US-009, US-012, US-013 |
| Artifact security and anti-slop | US-008, US-011, US-012, US-014 |
| Performance and portability | US-011, US-013, US-014 |
| Future contribution boundary | US-009, US-014 |

## Extension Compliance

- Resiliency Baseline: N/A; disabled during Requirements Analysis.
- Security Baseline: N/A; disabled during Requirements Analysis. Core least-privilege, secret, content, and artifact controls remain mandatory project requirements.
- Property-Based Testing: N/A; disabled during Requirements Analysis. Deterministic example and fixture tests remain required.

No enabled extension has an unresolved finding.
