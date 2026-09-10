# Integration Test Instructions

## Purpose

These checks verify the boundaries between the content foundation, portfolio presentation, and
quality/authoring/delivery preparation units. The system is a static monolith, so no database,
container, API endpoint, or background service is required.

## Automated integration suite

```powershell
npm.cmd run verify
```

The canonical verifier exercises the following cross-unit scenarios:

### Validated content to generated routes

- Content loaders validate and deterministically order repository records.
- Composition services expose only public records.
- Next.js produces matching index and detail routes.
- The artifact audit checks route, media, discovery, draft, secret, and absolute-path boundaries.

Expected result: six public project details and three public blog details are generated; drafts and
unknown routes are absent.

### Owner editing to repository quality

- `.pages.yml` fields match the application schemas.
- CMS roots and media remain inside approved directories.
- Reading bodies remain read-only until a static reading-detail route is implemented.
- CMS action hooks and deployment access remain forbidden.

Expected result: `Pages CMS configuration passed.`

### Presentation to accessibility behavior

- Route models feed shell, filter, article, disclosure, document, and gallery components.
- Unit/component tests verify state transitions and semantics.
- The generated artifact is subsequently exercised by Chromium as described in the E2E instructions.

Expected result: component tests and all browser journeys pass without application-server APIs.

### CI artifact handoff

- The quality workflow builds and audits one `out/` artifact.
- Its browser job downloads that exact commit-scoped artifact and rechecks it before browser tests.
- Executable workflow tests assert the read-only and non-deployment boundary.

Expected result: workflow tests pass; local verification does not contact or mutate GitHub.

## Manual artifact integration check

```powershell
npm.cmd run build
npm.cmd run audit:artifact
npm.cmd run serve:static
```

Open `http://127.0.0.1:4173` and sample `/`, `/about/`, `/projects/`, one genuine project, one demo
project, one blog article, `/reading/`, `/docs/`, and a missing route. Stop the server with
`Ctrl+C`.

## Cleanup

No persistent test service is created. `out/`, `.next/`, `coverage/`, `.playwright/`, and
`test-results/` are generated local artifacts and are excluded from Git. A later build may safely
replace them; do not delete repository-authored content while cleaning test output.
