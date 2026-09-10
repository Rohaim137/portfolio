# NFR Requirements - Portfolio Experience

## Scope

These requirements govern Unit 2's static routes, shared shell, responsive editorial presentation, generic and demonstration content states, project filtering, media lightbox, long-form reading, and accessibility behavior. Unit 1 remains responsible for validated content inputs; Unit 3 remains responsible for integrated browser automation, CI, artifact inspection, and host preparation.

## Performance and Capacity

- **U2-NFR-001**: All route content must be present in server-rendered static HTML before client hydration.
- **U2-NFR-002**: Client JavaScript is permitted only for narrow navigation state, project filtering, and image-lightbox enhancement.
- **U2-NFR-003**: Each client island must be independently loadable and must not import server-only services or unrelated feature code.
- **U2-NFR-004**: Representative home, project index, project detail, blog index, and article routes should meet good Core Web Vitals thresholds under the agreed audit profile.
- **U2-NFR-005**: Representative production routes should target Lighthouse scores near or above 90 for performance, accessibility, best practices, and SEO; useful-media exceptions must be measured and documented.
- **U2-NFR-006**: Project filters must update visible results within one animation frame for the approved maximum of 250 published projects on the reference development environment.
- **U2-NFR-007**: Lightbox next, previous, open, and close state transitions must update without network access or content refetching.
- **U2-NFR-008**: The presentation must support 250 projects, 250 posts, 250 reading records, and 1,000 media references without architectural changes.
- **U2-NFR-009**: Images below the fold must lazy-load and include intrinsic dimensions or aspect-ratio reservation to control layout shift.
- **U2-NFR-010**: Video must use a local poster when configured and must not autoplay with audio.
- **U2-NFR-011**: Code highlighting remains build-time; no browser editor or syntax-highlighting runtime may be added.
- **U2-NFR-012**: Production build review must report route-specific client chunks so accidental client-component expansion is detectable.

## Accessibility and Usability

- **U2-NFR-013**: Representative Unit 2 behavior must conform to WCAG 2.2 Level AA success criteria applicable to the implemented content and controls.
- **U2-NFR-014**: Every public route must expose skip navigation plus header, main, and footer landmarks.
- **U2-NFR-015**: All functionality must be operable with a keyboard and must show a visible focus indicator.
- **U2-NFR-016**: Focus order must follow semantic document order at narrow and wide viewport widths.
- **U2-NFR-017**: Current route, selected filters, project status, reading status, demo state, pending state, and unavailable state must not rely on color alone.
- **U2-NFR-018**: Text, controls, focus indication, and meaningful non-text UI must meet applicable AA contrast thresholds.
- **U2-NFR-019**: Navigation disclosure and modal lightbox controls must expose names, state, and relationships to assistive technology.
- **U2-NFR-020**: The modal lightbox must contain focus while open, close on Escape, support documented arrow-key movement, and restore focus to its trigger.
- **U2-NFR-021**: Images require meaningful alternative text; decorative local SVGs use empty alternative text only when adjacent content provides equivalent meaning.
- **U2-NFR-022**: Captions must be available when media context is not conveyed by adjacent prose.
- **U2-NFR-023**: `prefers-reduced-motion: reduce` must remove nonessential transitions and autoplay without hiding content or state.
- **U2-NFR-024**: Narrow layouts must not introduce page-level horizontal scrolling at 320 CSS pixels, except within intentionally scrollable code or tabular regions.
- **U2-NFR-025**: Touch targets and control spacing must remain operable at representative mobile sizes.
- **U2-NFR-026**: Generic, demo, pending, and empty-state copy must remain concise, truthful, and understandable without implementation knowledge.

## Availability and Progressive Enhancement

- **U2-NFR-027**: Every route must remain readable and navigable when client JavaScript fails or is disabled.
- **U2-NFR-028**: Project summaries remain visible without JavaScript; only interactive filtering may degrade to the complete unfiltered list.
- **U2-NFR-029**: Project media remains usable inline when modal enhancement is unavailable.
- **U2-NFR-030**: Desktop and baseline narrow navigation links remain present in HTML independent of hydration.
- **U2-NFR-031**: Missing reading, documents, profile fields, contribution data, and optional media must produce designed states rather than exceptions.
- **U2-NFR-032**: No Unit 2 route may require a database, runtime application server, external content API, or authenticated GitHub request.
- **U2-NFR-033**: The built static site remains available independently of Pages CMS, GitHub API, font providers, and image CDNs.

## Security and Privacy

- **U2-NFR-034**: Client bundles and serialized props must contain no environment secrets, access tokens, absolute source paths, raw unvalidated content, or server service objects.
- **U2-NFR-035**: Unit 2 must render only curated compiled content supplied by Unit 1 and must not add `dangerouslySetInnerHTML` for untrusted input.
- **U2-NFR-036**: External links must use validated destinations and safe new-context behavior when a new browsing context is intentionally used.
- **U2-NFR-037**: Pending destinations must contain no dummy URL, click handler, button role, or tab stop.
- **U2-NFR-038**: Local SVG assets must contain no scripts, external resource references, embedded credentials, or third-party tracking.
- **U2-NFR-039**: The interface must add no analytics, cookies, fingerprinting, local storage, session storage, visitor accounts, or visitor-submitted data.
- **U2-NFR-040**: Interaction state must remain process-local in the browser tab and must be discarded on navigation or refresh.
- **U2-NFR-041**: No contribution heatmap or activity inference may appear without separately approved generated data.
- **U2-NFR-042**: Public document controls must render only from the explicit validated document model.

## Reliability and Correctness

- **U2-NFR-043**: Exhaustive typed variants must cover configured, generic, demo, empty, no-filter-match, pending, active, open, and closed presentation states.
- **U2-NFR-044**: Unknown or unpublished detail records must resolve to the shared not-found route with valid recovery links.
- **U2-NFR-045**: Filter results must be deterministic for identical records and selections.
- **U2-NFR-046**: Lightbox selection must always reference a valid image and must remain valid at first, last, and single-image boundaries.
- **U2-NFR-047**: Failure of one optional presentation area must not suppress unrelated valid page content.
- **U2-NFR-048**: Route components must consume Unit 1 query and metadata services rather than duplicate visibility, ordering, slug, or validation rules.
- **U2-NFR-049**: Generic personal-area copy must never be stored as verified `PublicProfile` data.
- **U2-NFR-050**: Replacing generic or demo content with genuine values must require content or configuration edits only, not component rewrites.

## Maintainability and Verification

- **U2-NFR-051**: Shared behavior must use typed reusable components while route-specific composition remains explicit.
- **U2-NFR-052**: Client components must have narrow serializable props and no dependency on content repositories.
- **U2-NFR-053**: Interactive elements require stable purpose-based `data-testid` attributes.
- **U2-NFR-054**: Major route sections require stable `data-od-id` attributes.
- **U2-NFR-055**: Unit 2 logic and interactive components must have focused positive, negative, empty, boundary, and keyboard tests.
- **U2-NFR-056**: Unit 2's selected coverage scope must enforce at least 90 percent statements, functions, lines, and branches.
- **U2-NFR-057**: Automated DOM accessibility checks must cover representative rendered states, supplemented by explicit keyboard and reduced-motion assertions.
- **U2-NFR-058**: Formatting, zero-warning lint, strict type checking, Unit 1 regression tests, Unit 2 tests, coverage, and static production build must pass before Unit 2 code completion.
- **U2-NFR-059**: Dependencies must remain exactly pinned in the lockfile and no forced peer-dependency override may be used.
- **U2-NFR-060**: New packages require a demonstrated responsibility that cannot be met clearly by the existing platform or a small local component.

## Visual Quality Constraints

- **U2-NFR-061**: All colors, typography, spacing, rules, focus treatment, and surfaces must derive from shared tokens.
- **U2-NFR-062**: No prohibited indigo or violet accent, prohibited trust gradient, emoji control icon, decorative blob or wave, or colored-left-border rounded card may appear.
- **U2-NFR-063**: Level-one and level-two headings must use the display typography token consistently.
- **U2-NFR-064**: Accent usage must remain limited to no more than two conspicuous applications in a typical viewport.
- **U2-NFR-065**: The wide layout must use intentional asymmetry while preserving logical source order and a coherent single-column narrow layout.
- **U2-NFR-066**: Demo covers must be local, distinct, responsive, and free of fabricated screenshots or external placeholder services.
- **U2-NFR-067**: The rendered interface must contain no lorem ipsum, generic feature numbering, invented metrics, unlabelled fictional work, or personal claims not supplied by the user.

## Browser Compatibility

- **U2-NFR-068**: The interface targets the current and previous major versions of Chrome, Edge, Firefox, and Safari at verification time.
- **U2-NFR-069**: Representative behavior must also be checked in current mobile Safari and Chrome viewport profiles.
- **U2-NFR-070**: Unsupported enhancement APIs must degrade to server-rendered links, lists, and inline media rather than blocking access.

## Traceability Summary

| NFR area | Primary requirement sources |
|---|---|
| Performance and capacity | NFR-006 through NFR-009, AC-001, AC-002, US-014 support |
| Accessibility and usability | NFR-001 through NFR-005, AC-009, US-001 through US-013 |
| Availability and progressive enhancement | NFR-006, NFR-016, US-001, US-003, US-004 |
| Security and privacy | NFR-010 through NFR-014, AC-005, AC-012 |
| Reliability and maintainability | NFR-015 through NFR-019, AC-006 through AC-008, AC-013 |
| Visual quality | UI-001 through UI-014, AC-010, AC-011 |

## Extension Compliance

- Resiliency Baseline: disabled; not applicable. Static fallback requirements remain part of the approved core scope.
- Security Baseline: disabled; not applicable. Core privacy, rendering, link, and secret-boundary requirements remain mandatory.
- Property-Based Testing: disabled; not applicable. Example-based component and interaction coverage remains mandatory.

No enabled extension has an unresolved finding.
