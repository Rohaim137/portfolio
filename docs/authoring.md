# Portfolio authoring handbook

This portfolio is repository-authored. Every published change is a reviewed Git commit, and the
production site remains a static build. Pages CMS is an optional external editor for the three
content collections; it is not a public `/admin` page and it adds no CMS code or API to the site.

## Current source boundaries

| Information                                       | Source                                  | Pages CMS editable       |
| ------------------------------------------------- | --------------------------------------- | ------------------------ |
| Projects                                          | `content/projects/*.mdx`                | Yes                      |
| Blog posts                                        | `content/blog/*.mdx`                    | Yes                      |
| Reading-list records                              | `content/reading/*.mdx`                 | Yes, list fields only    |
| Project media                                     | `public/media/projects/`                | Yes, bounded image types |
| Name, profile, skills, timeline, and social links | `src/config/site.ts`                    | No                       |
| Public document list                              | `src/config/documents.ts`               | No                       |
| Public document files                             | `public/documents/`                     | No                       |
| Workflows, scripts, secrets, and application code | repository paths outside the rows above | No                       |

The profile and the StudySync, Doodle Predictor, and Pakflix records currently use facts from the
owner-supplied CV. The CV itself is not stored in `public/`. Existing blog examples remain visibly
marked `Demo`; reading and public documents remain empty until genuine records are supplied.

## Local editing workflow

1. Open PowerShell in the repository folder containing `package.json`.
2. Create a branch such as `content/update-project-summary`.
3. Edit the relevant source file. Keep unknown personal information absent or explicitly generic.
4. Leave a new record as `draft: true` while preparing it.
5. Run the checks below and review the local site.
6. Change `draft` to `false` only when every statement and link is ready to publish.
7. Commit the source changes; never commit `out/`, `.next/`, environment files, or credentials.

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

Open `http://localhost:3000`. The `npm.cmd` form bypasses the PowerShell `npm.ps1` execution-policy
wrapper that may be blocked on this computer.

## GitHub editing workflow

For a small text correction, open the source file on GitHub, choose the edit control, create a new
branch, and open a pull request. For a content file plus media, prefer local Git so both files can
be validated together. Do not edit generated files in `out/` or `.next/`; the build recreates them.

Before merging, confirm that automated quality checks pass and inspect the changed Markdown,
configuration, and media in the pull request. A merge does not automatically deploy this project.

## Pages CMS workflow

Pages CMS reads `.pages.yml` from a selected repository and branch. Sign in at
`https://app.pagescms.org`, authorize only the intended GitHub repository, select the working
branch, and use Projects, Blog posts, or Reading list. Pages CMS commits changes to GitHub; it does
not deploy this site.

For every entry:

1. Use a lowercase kebab-case slug, such as `sample-project`.
2. Keep the generated filename as `{slug}.mdx`; renaming is disabled.
3. Use Draft and Demonstration content as separate controls.
4. Add only factual owner information. Sample material must remain `demo: true` and identify itself
   as an example in its wording.
5. Save with a reviewable Pages CMS commit message, then validate the resulting GitHub branch.

Pages CMS exposes only the paths declared in `.pages.yml`. It intentionally cannot edit
`src/config/site.ts`, `src/config/documents.ts`, workflow files, scripts, secrets, or arbitrary
repository files. There are no CMS action buttons that trigger deployment.

## Project records

Required project fields are title, slug, summary, featured state, at least one technology, a local
cover with meaningful alternative text and positive dimensions, status, Draft, Demonstration
content, and a case-study body. Optional repository and live links must be complete HTTPS URLs.

Choose status conservatively:

- `shipped`: available in the form claimed by the record
- `prototype`: built or explored without a supported production claim
- `coursework`: explicitly course-related
- `research`: exploratory research work
- `archived`: no longer active

Do not invent outcomes. Leave Results empty when verified metrics or outcomes are unavailable.
Decorative cover art must be described as decorative rather than presented as a screenshot.

## Blog posts

Required fields are title, slug, description, publication date, Draft, Demonstration content, and
article body. Dates use `YYYY-MM-DD`. Tags, cover, update date, series, and table-of-contents
control are optional. Set `showTableOfContents: true` only when the article has enough headings to
benefit from navigation.

The body supports reviewed Markdown/MDX content but not imports, exports, scripts, raw HTML,
executable URLs, event handlers, arbitrary expressions, or undeclared components.

## Reading-list records

A reading record requires title, slug, status, a legitimate HTTPS source URL, at least one topic,
Draft, and Demonstration content. Optional authors, year, venue, dates, rating, and summary must be
factual.

Pages CMS deliberately keeps Reading notes read-only. The index can safely publish bodyless records,
but this version does not generate `/reading/[slug]` pages. Enabling note bodies before that route
is implemented would create a misleading or broken detail link. To add reading notes later:

1. Implement and test the static `src/app/reading/[slug]/page.tsx` route.
2. Add non-empty `generateStaticParams` behavior and not-found handling.
3. Add browser and artifact checks for the new route.
4. Change the reading `body` field in `.pages.yml` from `readonly: true` only in the same reviewed
   change.
5. Run the complete build before publishing the first note.

## Profile and social destinations

Edit `src/config/site.ts` locally for verified identity, role, introduction, location, focus,
biography, skills, interests, timeline, and social links. Omit unknown values rather than guessing.
A replaceable value can use neutral sample wording only when it is visibly generic and cannot be
mistaken for an owner fact.

Destinations have explicit states. Use `kind: "active"` only with the correct URL; otherwise keep a
supported destination as `kind: "pending"`. The X destination currently remains pending because the
CV did not provide it.

## Public documents

Publishing a document is an explicit two-part action:

1. Place the reviewed public file under `public/documents/`.
2. Add its exact public path and truthful metadata to `src/config/documents.ts`.

Anything under `public/` enters the static artifact even if no page links to it. Never place a CV,
identity document, private record, credential, token, salary information, or unapproved document in
that directory. Pages CMS cannot manage public documents.

## Media

Pages CMS uploads only image files in the reviewed allowlist to `public/media/projects/` and writes
paths below `/media/projects`. Use safe descriptive filenames, accurate alternative text, and the
real intrinsic width and height. Do not use external placeholder services, fabricated screenshots,
or media for which publication rights are unclear.

## Preview and validation

Use `npm.cmd run dev` for quick local review and `npm.cmd run build` for the exact static artifact.
The production artifact is `out/`. Check the affected index and detail pages at narrow and wide
viewport sizes, activate every added link, and confirm Draft and Demo states are truthful.

Focused read-only audits and the fail-fast aggregate check are available through:

```powershell
npm.cmd run audit:cms
npm.cmd run audit:artifact
npm.cmd run audit:documents
npm.cmd run audit:design
npm.cmd run audit:repository
npm.cmd run verify
npm.cmd run verify:help
```

`verify` checks formatting, zero-warning lint, strict types, coverage, a fresh static build, and all
repository audits in that order. Each audit reads source or output and reports findings; it never
modifies content, configuration, source, or built files.

## Rollback

Content changes are ordinary Git commits. If a change is wrong but not deployed, correct it on a new
branch or revert the commit and rerun validation. If it has been deployed, first restore the last
known-good Git commit and static artifact using the deployment handbook, then make a reviewed
forward fix. Never delete Git history or overwrite the production branch to hide a mistake.
