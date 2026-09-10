# Security Test Instructions

## Scope

The project has no public authentication, database, API, server runtime, or contact endpoint, so
authorization and penetration tests for those surfaces are not applicable. Security verification
focuses on dependency risk, curated MDX, repository boundaries, public files, generated artifacts,
workflow permissions, credential handling, and deployment isolation.

## Run the checks

```powershell
npm.cmd audit --audit-level=moderate
npm.cmd run verify
```

The verified dependency result is zero known vulnerabilities. The repository and artifact checks
must also confirm:

- no credential-like values, Cloudflare secret identifiers, or absolute workspace paths are emitted;
- drafts, source maps, private documents, and unexpected public files are absent;
- external content cannot use imports, exports, scripts, raw HTML, executable URL protocols, inline
  handlers, arbitrary expressions, or undeclared MDX components;
- public documents require both an explicit manifest entry and an existing bounded file;
- Pages CMS cannot edit sensitive roots or invoke actions;
- the quality workflow has read-only contents permission and no deployment capability;
- production deployment is manual, exact-commit-bound, environment-protected, and secret-backed.

## Secret handling review

Never paste the Cloudflare API token or account ID into source, Markdown, a command committed to
shell history, a workflow input, or `NEXT_PUBLIC_*`. Store them only as protected GitHub environment
secrets when the owner authorizes external setup. Treat every file under `public/` as downloadable.

## Failure handling

Do not waive a moderate-or-higher dependency finding or artifact-policy failure for deployment.
Confirm whether a fix preserves the lockfile and runtime compatibility, update deliberately, rerun
all tests and audits, and record any accepted exception with package, advisory, exposure analysis,
expiry, and owner approval.
