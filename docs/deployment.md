# Cloudflare Pages deployment handbook

This project uses a static Next.js export in `out/` and Cloudflare Pages Direct Upload. Deployment
is intentionally separate from quality CI and content editing. A push, pull request, merge, Pages
CMS save, schedule, or successful quality run cannot publish the site.

The recommended production path is the manual GitHub Actions workflow in
`.github/workflows/deploy-pages.yml`. A direct local Wrangler path is documented for recovery and
controlled testing, but it should not be the routine release path.

## Replaceable values

Never commit real credentials. Substitute these labels only in the relevant Cloudflare or GitHub
settings:

| Label                 | Meaning                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `<pages-project>`     | One existing, isolated Cloudflare Pages Direct Upload project               |
| `<account-id>`        | Cloudflare account ID that owns the project                                 |
| `<pages-token>`       | Least-privilege token limited to the required Pages account/project actions |
| `<production-origin>` | Approved HTTPS origin, with no trailing slash                               |
| `<commit-sha>`        | Exact 40-character Git commit to build and publish                          |

## One-time preparation

1. Confirm the intended GitHub repository and `main` production branch.
2. Run the complete local verification and review `out/`.
3. **External mutation:** create one new isolated Cloudflare Pages project using Direct Upload. Do
   not connect automatic Git deployment.
4. Record the Pages project name and Cloudflare account ID outside the repository.
5. **External mutation:** create a Cloudflare API token with only the minimum Pages permissions for
   this account. Do not reuse a broad global API key.
6. **External mutation:** create a GitHub environment named `production`, add required reviewers,
   prevent self-bypass if the repository plan supports it, and restrict deployment to the intended
   production branch or tags.
7. **External mutation:** add environment secrets `CLOUDFLARE_ACCOUNT_ID` and
   `CLOUDFLARE_API_TOKEN`. Do not add them as repository variables, workflow inputs, or files.
8. Decide whether the initial production origin is the assigned `pages.dev` hostname or an approved
   custom domain.
9. **External mutation, optional:** add and verify a custom domain in Cloudflare Pages. Treat DNS
   changes as a separate reviewed action; do not alter unrelated records.

Creating a project, token, environment, secret, custom domain, or DNS record changes external state.
Perform each only after confirming its exact target.

## Local preflight

Run from the repository folder that contains `package.json`:

```powershell
npm.cmd ci
$env:NEXT_PUBLIC_SITE_URL = "https://your-approved-domain.example"
npm.cmd run verify
npm.cmd run benchmark:content -- --run
npm.cmd run playwright:install
npm.cmd run test:e2e
git status --short
git rev-parse HEAD
```

The origin must be HTTPS and must not end in `/`. Confirm the final commit is pushed and that its
GitHub quality workflow passed. The working tree may contain only deliberate reviewed changes; do
not deploy an unexplained dirty tree.

## Preview upload

A preview upload is optional and is itself an external mutation. It does not satisfy or replace the
production permission gate.

```powershell
$env:CLOUDFLARE_ACCOUNT_ID = "<account-id>"
$env:CLOUDFLARE_API_TOKEN = "<pages-token>"
$env:NEXT_PUBLIC_SITE_URL = "https://<preview-origin>"
npm.cmd run verify
npm.cmd exec -- wrangler pages deploy out --project-name="<pages-project>" --branch="preview-<commit-sha>" --commit-hash="<commit-sha>"
```

**External mutation:** the final command uploads a preview deployment to Cloudflare. Confirm the
project, branch, commit, and preview origin immediately before running it. Do not paste the token
into chat, shell history, logs, screenshots, or workflow inputs.

## Mandatory production permission gate

After Build and Test is approved and immediately before the production upload or equivalent
Cloudflare dashboard Publish action, stop and ask the user for explicit permission. The request must
identify the exact commit SHA, Pages project, and production origin. Approval of planning,
configuration, preview, a previous deployment, or this handbook does not count.

Do not start the production workflow, run the production Wrangler command, or press Publish until
that action-time permission is received.

## Recommended production release

1. Open GitHub Actions and choose **Deploy portfolio to Cloudflare Pages**.
2. Select **Run workflow** from the reviewed branch.
3. Enter the exact `<commit-sha>`, `<production-origin>`, and `<pages-project>`.
4. Enter `DEPLOY` only after the mandatory action-time permission is recorded.
5. Submit the workflow.
6. The unprivileged preflight job checks out the exact SHA, verifies it, installs from the lockfile,
   runs the complete verifier with the production origin, and stages the audited artifact for one
   day.
7. Wait for the separate deployment job to request access to the protected `production` environment.
8. Ask for fresh explicit permission immediately before releasing that environment gate, even if
   permission was already recorded before workflow dispatch.
9. **External mutation:** approve the waiting environment deployment after checking the same commit,
   project, and origin again. Administrator bypass is disabled.
10. The deployment job downloads and rechecks the exact staged artifact, then performs one Wrangler
    Direct Upload.

The production environment reviewers are a second safeguard, not a replacement for the explicit
permission gate.

## Direct local production alternative

Use this only when the manual GitHub workflow is unavailable and the same commit has passed all
checks. Store secrets in the current process environment, not in `.env` or committed files.

```powershell
$env:CLOUDFLARE_ACCOUNT_ID = "<account-id>"
$env:CLOUDFLARE_API_TOKEN = "<pages-token>"
$env:NEXT_PUBLIC_SITE_URL = "<production-origin>"
npm.cmd ci
npm.cmd run verify
npm.cmd exec -- wrangler pages deploy out --project-name="<pages-project>" --branch="main" --commit-hash="<commit-sha>"
```

**External mutation:** the final command is the production upload. Ask for and receive explicit
permission immediately before executing that exact command, even if every preceding command passed.

Afterward, clear the current shell variables:

```powershell
Remove-Item Env:CLOUDFLARE_ACCOUNT_ID
Remove-Item Env:CLOUDFLARE_API_TOKEN
Remove-Item Env:NEXT_PUBLIC_SITE_URL
```

## Production smoke checks

Check the final HTTPS origin in a clean browser session:

- `/` shows Muhammad Rohaim's verified introduction and the intended three featured projects.
- `/about/` shows the CV-backed role, experience, education summary, skills, and verified links.
- `/projects/` lists six current records, with the original examples still labelled Demo.
- `/projects/studysync/`, `/projects/doodle-predictor/`, and `/projects/pakflix/` return 200.
- Doodle Predictor has the supported Vercel link and no invented repository link.
- `/blog/` and one article work; demonstration writing remains labelled Demo.
- `/reading/` and `/docs/` show their deliberate empty states.
- An unknown route returns the designed 404 and recovery links.
- Navigation, filters, the Demo gallery dialog, Escape, arrow keys, and focus restoration work.
- The page works at 320 pixels without horizontal overflow and respects reduced motion.
- Canonical, Open Graph, sitemap, and robots output use the approved production origin and never
  localhost or a preview hostname.
- GitHub, LinkedIn, and email destinations are correct; X remains visibly pending.
- Browser developer tools show no missing first-party assets or mixed-content failures.

Record the deployment identifier or URL, exact commit, production origin, UTC time, workflow run,
smoke result, and reviewer. Evidence must not contain tokens, account secrets, private documents, or
unredacted browser storage.

## Rollback

Rollback is an external production mutation and requires confirmation of the exact target.

1. Stop additional releases and identify the last known-good Cloudflare deployment and Git commit.
2. Prefer Cloudflare Pages' deployment rollback control when the exact prior deployment is clearly
   identified and its smoke evidence is available.
3. **External mutation:** confirm and activate that known-good deployment in the Cloudflare
   dashboard.
4. If dashboard rollback is unavailable, check out the last known-good commit, rerun the full
   verifier with the production origin, request explicit permission for the replacement upload, and
   upload that exact artifact through the manual workflow.
5. Repeat every production smoke check and record the new active deployment.
6. Make a reviewed forward fix on a new branch. Do not rewrite Git history or delete evidence.

If the fault involves a credential, revoke and replace the token before any further deployment. If
it involves a custom domain or DNS, restore only the reviewed affected record and verify TLS and the
assigned Pages hostname before changing anything else.
