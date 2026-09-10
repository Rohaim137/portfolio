# Build Instructions

## Prerequisites

- **Runtime**: Node.js 22.12 or newer; Node.js 24.19.0 is verified
- **Package manager**: npm 11 or newer
- **Operating system**: Windows, Linux, or macOS supported by Node.js and Next.js
- **Repository state**: Run from the workspace root containing `package.json` and
  `package-lock.json`
- **Resources**: At least 4 GB available memory and 2 GB free disk space are recommended for
  dependencies, the Next.js cache, coverage, Chromium, and the static artifact
- **Administrator access**: Not required for the project; a user-space Node.js installation is
  supported

## Environment variables

No variable is required for an origin-free local build. `NEXT_PUBLIC_SITE_URL` is optional and must
be an approved HTTPS origin without a trailing slash when canonical production metadata is required.
Cloudflare credentials are never needed for a build and must not be placed in local source files.

## Build steps

### 1. Install the locked dependencies

```powershell
npm.cmd ci
```

Use `npm.cmd` on Windows when PowerShell blocks the `npm.ps1` wrapper. Do not relax the machine-wide
execution policy merely to run this project.

### 2. Select the metadata mode

For ordinary local verification, clear any stale production origin:

```powershell
Remove-Item Env:NEXT_PUBLIC_SITE_URL -ErrorAction SilentlyContinue
```

For an approved production-origin build only:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-approved-domain.example"
```

### 3. Run the complete build gate

```powershell
npm.cmd run verify
```

This single command executes formatting checks, zero-warning lint, strict types, coverage, the
Next.js static build, Pages CMS validation, artifact integrity, public-document safety, and
detectable design-policy auditing. It builds all three logical units as one static application.

### 4. Verify success

- Every stage must exit with code 0.
- The route report currently contains 19 generated pages, including indexes, six project details,
  three blog details, the not-found document, discovery files, About, Reading, and Documents.
- The deployable artifact is `out/`.
- No server bundle, database migration, or runtime service artifact is expected.
- `npm run verify` intentionally does not install Chromium or upload anything externally.

## Troubleshooting

### PowerShell reports that npm.ps1 cannot be loaded

Use `npm.cmd`, as shown above. The error affects the PowerShell wrapper and does not mean npm or the
project is broken.

### Dependency installation fails

1. Confirm `node --version` is at least 22.12.
2. Confirm `package-lock.json` is present and unchanged.
3. Remove only the generated `node_modules` directory if a partial installation is proven, then
   rerun `npm.cmd ci`.
4. Do not replace `npm ci` with an unlocked dependency update while diagnosing a release candidate.

### TypeScript, lint, tests, or audits fail

Read the first named failing stage. Fix the reported source or content path, then rerun
`npm.cmd run verify`; later stages are intentionally not trusted after an earlier failure.

### Static generation fails

Content errors include a stable code, source path, and field path. Correct the referenced front
matter, filename/slug mismatch, MDX boundary, URL, date, or public-media path. Do not bypass
validation.

### Production metadata is absent

This is expected when `NEXT_PUBLIC_SITE_URL` is unset. If it is set, confirm it is an HTTPS origin
without a path, query, fragment, credentials, or trailing slash.
