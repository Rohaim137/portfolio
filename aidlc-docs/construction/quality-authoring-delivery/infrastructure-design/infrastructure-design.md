# Infrastructure Design - Quality, Authoring, and Delivery Preparation

## Scope and Status

This design maps the approved Unit 3 logical components to GitHub Actions and Cloudflare Pages. It is a design artifact only: no Cloudflare project, GitHub environment, secret, domain, or deployment is created here.

## Environment Model

| Environment | Purpose | Infrastructure | External mutation |
|---|---|---|---|
| Local | Author, validate, build, and preview | User-space Node.js, npm, local filesystem, loopback static server | None |
| Pull request | Repeat clean quality and browser verification | GitHub-hosted Ubuntu runner and private short-retention artifact | CI records only |
| Preview | Optional review of the verified static artifact | Cloudflare Pages branch deployment through manual Direct Upload | Requires explicit approval before upload |
| Production | Public portfolio release | Isolated Cloudflare Pages project and approved HTTPS origin | Requires explicit permission immediately before final upload |

Production does not share credentials or deployment targets with unrelated repositories.

## Compute Mapping

### Build and test

- GitHub-hosted `ubuntu-latest` runners provide ephemeral compute.
- Node.js 24 LTS is installed through the official setup-node action.
- Dependencies are restored through npm cache metadata and installed with `npm ci`.
- Quality and browser jobs stop when their command fails.
- No persistent runner, virtual machine, container service, or Kubernetes cluster is required.

### Application serving

- Cloudflare Pages serves the static `out` files at the edge.
- There is no Node.js production process, server rendering, Pages Function, Worker, or origin application server.
- Asset scaling is delegated to the static-host edge rather than application autoscaling.

## Storage Mapping

| Data | Authoritative store | Lifecycle |
|---|---|---|
| Source, content, configuration, and documentation | Git repository and Git history | Retained according to repository policy |
| npm dependency versions | `package-lock.json` | Versioned with source |
| CI static artifact | Private GitHub Actions artifact | Short retention, recommended one day |
| Browser failure traces | Private GitHub Actions artifact | Failure only, recommended seven days |
| Deployed assets | Cloudflare Pages deployment storage | Retain current and at least one known-good deployment |
| Cloudflare credentials | Protected GitHub environment secrets or approved ephemeral local environment | Never stored in source or artifact |

No application database, user-upload store, runtime cache, or content bucket is introduced.

## Messaging and Scheduling

- No message queue, event bus, webhook receiver, scheduled worker, or runtime asynchronous processor is needed.
- GitHub Actions job dependencies provide build-time sequencing.
- The production release has manual dispatch only.
- Future scheduled GitHub contribution acquisition remains excluded until separately approved.

## Networking

- Public traffic terminates through Cloudflare-managed HTTPS on the Pages origin or an approved custom domain.
- The deployment contains static files only and exposes no application API.
- Browser testing uses loopback networking and an ephemeral local port unavailable outside the runner.
- No load balancer, API gateway, ingress controller, private subnet, VPN, database port, or origin firewall is required.
- A custom domain and DNS change are optional external actions requiring separate confirmation.

## Identity, Permissions, and Secrets

### Pull-request quality workflow

- `contents: read`
- No Cloudflare secret access
- No deployment permission
- No environment with production credentials
- Fork-originated changes remain unable to access deployment secrets

### Manual production release

- Protected `production` GitHub environment
- `contents: read` for the selected commit
- `CLOUDFLARE_API_TOKEN` secret scoped to Account / Cloudflare Pages / Edit
- `CLOUDFLARE_ACCOUNT_ID` stored as a protected secret because it is operational account metadata
- `CLOUDFLARE_PAGES_PROJECT` stored as a protected non-secret variable
- `NEXT_PUBLIC_SITE_URL` stored as an approved HTTPS environment variable
- No secret interpolated into command text, artifacts, static output, or diagnostic output

GitHub environment reviewers can add an independent human protection layer, but they do not replace the user's required conversational permission gate before the assistant executes the final deployment.

## Monitoring and Evidence

- GitHub Actions records install, quality, build, audit, browser, and release outcomes.
- Cloudflare Pages records deployment identity, commit metadata, status, URL, and history.
- Post-release smoke checks verify HTTPS and representative public behavior.
- No analytics, session replay, fingerprinting, cookies, or visitor telemetry is introduced.
- No uptime SLA is claimed.

## Cost and Capacity

- The application requires no paid runtime service, database, queue, or server.
- GitHub Actions and Cloudflare Pages usage must remain within the account's available plan limits; the workflow does not assume unlimited free capacity.
- The static artifact must remain within Cloudflare's current file-count and file-size upload limits before release.
- The content benchmark remains the repository-scale verification rather than adding runtime indexing infrastructure.

## Configuration Deliverables

Code Generation will prepare:

- `.pages.yml`
- `.github/workflows/quality.yml`
- `.github/workflows/deploy-pages.yml`
- package commands and audit modules
- Playwright configuration and journeys
- authoring and deployment handbooks
- smoke-check and rollback instructions

These files may be committed safely before external credentials or resources exist.

## Approval Boundaries

Separate action-time approval is required before:

- signing into or connecting a Cloudflare account;
- creating the Pages project;
- creating or storing an API token;
- adding production environment values or a custom domain;
- uploading a preview artifact;
- executing the final production deployment;
- rolling back a live deployment if rollback becomes necessary.

The final production upload has an additional explicit user instruction: the assistant must stop and ask permission immediately before executing it.

## Extension Compliance

- Resiliency Baseline: N/A; disabled. Core rollback and fail-closed controls are mapped above.
- Security Baseline: N/A; disabled. Core least-privilege and secret-isolation controls are mapped above.
- Property-Based Testing: N/A; disabled.

No enabled extension has an unresolved finding.
