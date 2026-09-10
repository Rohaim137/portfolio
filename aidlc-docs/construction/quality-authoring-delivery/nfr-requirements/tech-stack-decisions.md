# Technology Stack Decisions - Quality, Authoring, and Delivery Preparation

## Decision Summary

Unit 3 adds repository configuration, development-only verification, CI, and a controlled Cloudflare Pages deployment around the existing application. It does not add a runtime backend; deployment occurs only after verification and explicit action-time confirmation.

## Owner Editing

- **Decision**: Add a repository-root `.pages.yml` for the hosted Pages CMS editor.
- **Scope**: Projects, blog posts, reading records, and tightly bounded local media.
- **Rationale**: Pages CMS edits GitHub-hosted files directly and uses `.pages.yml` as repository configuration, so Git remains the source of truth and site generation remains independent of the CMS.
- **Fallback**: Every field remains editable locally or through GitHub without Pages CMS.
- **Boundary**: Keep `src/config/site.ts` and `src/config/documents.ts` under code review because their current TypeScript representation is not an appropriate schema-less CMS mutation target.
- **Owner-view expectation**: The editor is the hosted Pages CMS application, not a new `/admin` route in the public portfolio.

## CMS Change Flow

- **Decision**: Document branch-first authoring and pull-request review as the preferred flow.
- **Rationale**: CMS saves are Git commits; branch review lets the same CI gates validate browser-authored and locally authored changes.
- **Constraint**: Do not add a CMS action that deploys, merges, or bypasses review.

## CI Provider and Runtime

- **Decision**: Use GitHub Actions with the current official stable major examples for checkout and setup-node, Node.js 24 LTS, npm caching, and `npm ci`.
- **Rationale**: The repository is already on GitHub, Node 24 is locally verified, and GitHub's primary documentation recommends setup-node for consistent Node behavior.
- **Permissions**: Read-only contents by default; no deployment environment and no application secret.
- **Triggers**: Pull requests, protected-branch pushes, and manual dispatch for diagnostic reruns.

## CI Command Contract

- **Decision**: Expose one aggregate repository verification command composed from existing formatting, lint, type, coverage, build, and new artifact checks.
- **Rationale**: Local and CI behavior should be identical and failures should identify the responsible command.
- **Constraint**: CI must never weaken thresholds or use a separate permissive configuration.

## Integrated Browser Testing

- **Decision**: Add an exactly pinned `@playwright/test` development dependency and focused Chromium journeys.
- **Server model**: Build the static output and serve it locally for tests; do not test only the development server.
- **Rationale**: Unit 2's jsdom checks cannot validate real layout, native dialog, page overflow, or browser focus behavior.
- **Compatibility**: Keep Firefox, WebKit, and mobile browser profiles documented for periodic review until execution cost and stability justify required CI coverage.

## Accessibility Testing

- **Decision**: Retain axe-core component checks and add browser-level semantic, keyboard, focus, reduced-motion, and overflow assertions.
- **Rationale**: No one automated scanner proves accessibility; behavior and human visual checks remain explicit evidence categories.
- **Constraint**: A missing browser is reported as blocked evidence, not a pass.

## Artifact and Anti-Slop Audits

- **Decision**: Implement repository-local Node scripts using platform APIs and small deterministic rule sets.
- **Tests**: Use isolated non-production fixtures for passing and failing patterns.
- **Rationale**: The checks need no runtime package or external service and can emit safe file-and-rule diagnostics.
- **Scope**: Static route inventory, drafts, secret signatures, private-key headers, absolute paths, public-document allowlisting, temporary origins, placeholder services, prohibited color and gradient patterns, emoji feature icons, filler copy, and invented metric patterns.

## Performance Evidence

- **Decision**: Retain the existing opt-in 750-record build benchmark as a required release check and document Lighthouse execution separately.
- **Rationale**: Capacity and static-build timing are deterministic locally; Lighthouse scores depend materially on browser, hardware, throttling, and server conditions.
- **Constraint**: Do not claim a Lighthouse score until it is actually measured and recorded.

## Static Hosting Preparation

- **Decision**: Prepare and use Cloudflare Pages settings for a Next.js static HTML export: repository root, `npm run build`, and output directory `out`.
- **Rationale**: This matches the existing `output: "export"` application and current Cloudflare Pages documentation.
- **Portability**: No Pages Function, Worker, KV, D1, R2, queue, or Cloudflare-specific runtime API may be introduced.
- **Approval boundary**: Connecting GitHub to Cloudflare, setting a production origin, creating a project or domain, and initiating deployment are included release steps that require explicit confirmation immediately before they change external state.

## Production Origin

- **Decision**: Preserve `NEXT_PUBLIC_SITE_URL` as the only canonical origin input.
- **Behavior**: Without an approved HTTPS value, canonical and sitemap locations remain gated; preview and production values are configured only in their respective host environments.
- **Constraint**: Do not commit a real or placeholder production origin.

## Future GitHub Contribution Data

- **Decision**: Keep the Unit 1 generated-data contract dormant and document a future GitHub Actions acquisition job only.
- **Rationale**: Browser fetching would leak credentials or depend on rate-limited runtime access.
- **Constraint**: No token, workflow, schedule, or generated heatmap data is added until separately authorized.

## Rejected Alternatives

| Alternative | Reason not selected |
|---|---|
| Custom authenticated `/admin` application | Adds identity, authorization, storage, security, and runtime operations outside the approved static scope |
| CMS access to all repository files | Violates least exposure and makes source or public-document mistakes easier |
| Direct-to-production CMS-only workflow | Bypasses consistent validation and review |
| Runtime contribution API | Adds secrets, availability coupling, and browser/runtime risk |
| Cloudflare Workers migration | Unnecessary for a static export and reduces host portability |
| Network-dependent Lighthouse gate on every commit | Produces unstable results and unnecessary CI cost |
| External AI design linter | Adds a network dependency and nondeterministic enforcement |

## Primary References

- Pages CMS configuration: `https://pagescms.org/docs/configuration/`
- Pages CMS quick start: `https://pagescms.org/docs/quick-start/`
- GitHub Actions Node.js guidance: `https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs`
- Cloudflare Pages static Next.js guide: `https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/`
- Cloudflare Pages build configuration: `https://developers.cloudflare.com/pages/configuration/build-configuration/`

## Extension Compliance

- Resiliency Baseline: N/A; disabled.
- Security Baseline: N/A; disabled. Core workflow permissions and secret boundaries remain project requirements.
- Property-Based Testing: N/A; disabled.

No enabled extension has an unresolved finding.
