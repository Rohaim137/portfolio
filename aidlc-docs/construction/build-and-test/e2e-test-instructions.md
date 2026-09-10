# End-to-End Browser Test Instructions

## Prerequisites

Build the origin-free static artifact and install the pinned Chromium binary once:

```powershell
Remove-Item Env:NEXT_PUBLIC_SITE_URL -ErrorAction SilentlyContinue
npm.cmd run build
npm.cmd run playwright:install
```

Chromium installation downloads browser test tooling into the user cache. It does not deploy the
site, open an external account, or alter repository content.

## Run the journeys

```powershell
npm.cmd run test:e2e
```

Playwright starts the traversal-safe local static server, runs against `out/`, and stops the server.
The verified suite contains eight journeys covering:

- overview identity, skip link, current navigation, About content, and static 404 recovery;
- mobile navigation Escape handling and focus restoration;
- project filters, selected state, no-match state, and reset;
- gallery arrow navigation, Escape closing, and trigger-focus restoration;
- genuine-project live-link disclosure and absent unsupported repository link;
- blog, reading, documents, demo, and pending-link truthfulness;
- serious or critical axe findings on representative routes;
- 320-pixel horizontal overflow and reduced-motion behavior.

Expected result: `8 passed`, zero failed.

## Failure evidence

Local screenshots, traces, or reports are written beneath `.playwright/` or `test-results/` and are
ignored by Git. CI uploads failure evidence for three days only. Inspect the first failed locator,
accessibility violation, screenshot, or trace, repair the issue, rebuild `out/`, and rerun the
suite.

An automated Chromium pass is required before release. A final human smoke review on the actual
production URL is still required after an explicitly approved upload.
