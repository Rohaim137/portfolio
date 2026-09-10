# Business Logic Model - Portfolio Experience

## Purpose

Unit 2 turns Unit 1's validated, serializable view models into the complete static visitor experience. It owns presentation decisions and small client-side interaction state, but it does not read files, parse MDX, call external services, or persist visitor data.

## Content Provenance Model

Every rendered statement belongs to one of three presentation categories:

1. **Configured owner content** comes from an explicitly populated `PublicProfile` or a non-demo content record.
2. **Demonstration content** comes from a record with `demo: true` and is disclosed with visible `Demo` labeling at preview and detail level.
3. **Generic site-state copy** describes what the portfolio can contain or why information is unavailable. It never claims personal history, employment, results, skills, location, preferences, or opinions.

Generic site-state copy is a fallback in the presentation layer, not fabricated `PublicProfile` data. When genuine profile fields are added later, configured values replace the fallback automatically without component changes.

## Route Composition Flow

1. A static route requests its typed model from the Unit 1 query or detail service.
2. The route resolves metadata through the Unit 1 metadata service.
3. The route chooses configured, demo, empty, pending, or generic presentation states from explicit model values.
4. Server-rendered components establish semantic content and baseline controls.
5. Serializable data is passed only to the navigation, project-filter, and media-lightbox client islands.
6. Missing or unpublished detail records resolve through the shared not-found experience.

## Home Page Logic

The home page renders these major sections in logical reading order:

1. Introduction
2. Current focus
3. Featured projects
4. Latest writing
5. Reading
6. GitHub presence
7. Social destinations

At wide viewports, sections may use asymmetric proportions and alternating density. At narrow widths, CSS collapses the same semantic order into one column.

### Introduction resolution

- If one or more verified profile fields exist, render only those configured fields.
- If all personal profile fields are absent, render a concise generic heading and explanation of the available portfolio areas.
- Never interpolate inferred role, employer, location, experience, or skill claims.
- The verified GitHub identity may be shown only as a destination label or account handle, not as evidence for inferred biography.

### Collection resolution

- Featured projects and latest posts render supplied summaries in service order.
- Demo records retain visible disclosure in every home preview.
- An empty reading collection renders a truthful reading-specific state.
- Contribution state `not-connected` renders no heatmap and keeps the GitHub profile action available.
- The home-page document or CV action remains non-interactive when no public document is configured.

## Project Discovery Logic

The project page receives all published summaries and filter options before hydration.

### Filter state

- Initial selection is `{ projectType: undefined, technology: undefined }`.
- A visitor may select at most one project type and one technology simultaneously.
- When both values exist, a project must match both values.
- Selecting the active option again clears only that category.
- Reset clears both categories.
- Filter state is local to the current page and is not written to the URL or persistent storage.
- Result count and selected labels communicate state without depending on color.
- Zero matches produce a filter-specific empty result with a reset action; a truly empty collection produces a different owner-content empty state.

## Project Detail and Media Logic

- A valid detail record composes summary, problem or context, audience, architecture or flow, decisions, technologies, retrospective, optional results, and curated body content.
- Missing optional sections are omitted; no replacement claims are synthesized.
- Demo details begin with a visible disclosure that the case study is illustrative and not attributed to the owner.
- Repository and live actions exist only when valid URLs are present.
- All media remains usable inline without client JavaScript.
- Image triggers may open a modal lightbox after hydration; video remains inline.
- Opening the lightbox stores the trigger and selected image index.
- Arrow keys move within the image collection, Escape closes, Tab remains within modal controls, and close restores focus to the trigger.
- Reduced motion removes nonessential transitions. Video never starts with audible playback.

## Blog Logic

- The blog index renders summaries in the order supplied by Unit 1.
- Each preview exposes title, description, publication date, reading time, optional tags, and demo state.
- A demonstration article uses an impersonal educational voice and displays disclosure before article content.
- A table of contents renders only when `showTableOfContents` is true and the compiled body contains at least three meaningful level-two or level-three headings.
- Table-of-contents links target deterministic heading anchors supplied by Unit 1.
- Build-rendered prose and code remain usable without client JavaScript.

## Reading and Document Logic

- With no reading records, `/reading` and the home reading section render concise, specific empty states.
- Future reading records render under textual queued, reading, and completed headings; empty groups are omitted.
- An internal reading-note link appears only when Unit 1 supplies a valid detail destination.
- External source links use the validated source URL and never imply that the site hosts the source document.
- With no documents, `/docs` renders a non-interactive unavailable state and no view or download control.
- Configured documents expose only actions supplied by the validated model.

## Navigation Logic

- Desktop navigation renders direct links and identifies the route whose path owns the current location.
- Narrow navigation uses a disclosure button controlling a vertical menu.
- Opening moves focus to the first menu link only when initiated from the keyboard.
- Escape closes the menu and returns focus to the disclosure button.
- Selecting a route closes the menu.
- Resize to a desktop layout clears stale open state.
- The skip link targets the route's main content landmark.

## About Route Logic

- The route exists so genuine profile content can be added without structural work later.
- It remains outside primary navigation while all profile fields are absent.
- In the empty profile state it renders concise generic site-state copy, not a fictional biography.
- Once meaningful profile data exists, configured sections render and the route becomes eligible for navigation through explicit site configuration.
- Absent optional profile sections collapse without filler.

## Social and GitHub Logic

- Active destinations render real anchors from typed configuration.
- Pending LinkedIn, X, and email destinations render plain text followed by `link pending`; they are never anchors, buttons, or focusable elements.
- GitHub always targets the verified configured profile.
- Missing contribution data renders a short not-connected explanation and never generates a calendar substitute.

## Demonstration Content Model

The initial content set uses replaceable repository records:

- Project themes: a web experience, a content system, and a data workflow.
- Article themes: static architecture, accessible interfaces, and reliable content modeling.
- Demonstration cover art: three local abstract SVG diagrams with no fabricated screenshots, trademarks, external placeholders, or implied production usage.

All six records remain independently replaceable. Removing or replacing one does not require component changes or a permanent demo-count rule.

## Restrained Motion Logic

Primary action links and buttons use the designated two-pixel pressed response. The response must not delay activation, alter layout flow, or obscure focus. Under `prefers-reduced-motion: reduce`, transitions are removed while pressed and selected states remain visually understandable.

## Failure and Recovery Semantics

- Missing detail data resolves to not found rather than an incomplete page.
- Empty collections render route-specific states rather than generic errors.
- Invalid records fail before Unit 2 receives a model.
- Client-island initialization failure leaves server-rendered navigation links, project lists, and inline media usable.
- No Unit 2 component catches content validation failures and converts them into misleading public output.

## Traceability

| Logic area | Stories |
|---|---|
| Shell and navigation | US-001, US-013 |
| Home composition and content states | US-002, US-009, US-012 |
| Project filters and cards | US-003, US-012, US-013 |
| Case studies and media | US-004, US-013 |
| Blog discovery and articles | US-005, US-006 |
| Reading and documents | US-007, US-008 |
| Demo and generic-content provenance | US-002 through US-010 |
| Metadata presentation inputs | US-011 |
| Static progressive enhancement | US-013, US-014 |

## Extension Compliance

- Resiliency Baseline: disabled; not applicable.
- Security Baseline: disabled; not applicable. Approved core link, content, and secret boundaries remain enforced.
- Property-Based Testing: disabled; not applicable.

No enabled extension has an unresolved finding.
