# Business Rules - Portfolio Experience

## Content Truthfulness and Replacement

- **U2-BR-001**: Missing personal data must never be inferred from the GitHub profile, repository content, demonstration content, or generic copy.
- **U2-BR-002**: Generic personal-area text may describe the site's purpose or unavailable state but must not assert owner biography, role, employer, location, experience, skills, achievements, metrics, testimonials, or opinions.
- **U2-BR-003**: Generic site-state copy must be replaceable through typed configuration or repository content without changing component structure.
- **U2-BR-004**: A configured personal field replaces only its corresponding generic or absent presentation; missing sibling fields remain omitted.
- **U2-BR-005**: Demonstration records must have `demo: true` and show a textual `Demo` label on home previews, indexes, and details.
- **U2-BR-006**: Demonstration disclosure must state that the material is illustrative and not presented as the owner's work or opinion.
- **U2-BR-007**: Demo projects must not include invented owner roles, clients, adoption claims, outcomes, metrics, repository URLs, or live deployments.
- **U2-BR-008**: Demo articles must use an impersonal educational voice and must not attribute experience or preference to the owner.
- **U2-BR-009**: Test fixtures must never be rendered as demonstration or genuine public content.
- **U2-BR-010**: Removing all demonstration records must reveal designed collection-specific empty states without breaking routes.

## Application Shell and Navigation

- **U2-BR-011**: Every page must contain one header landmark, one main landmark, and one footer landmark.
- **U2-BR-012**: The first focusable control must be a skip link targeting the main landmark.
- **U2-BR-013**: Primary navigation must include Overview, Projects, Blog, Reading, and Docs in a consistent order.
- **U2-BR-014**: Current-route indication must include text or an accessible current-page state, not color alone.
- **U2-BR-015**: The narrow navigation disclosure must expose expanded state and an accessible name.
- **U2-BR-016**: Escape closes an open narrow menu and restores focus to its disclosure control.
- **U2-BR-017**: Route selection closes the narrow menu; no navigation state persists between pages.
- **U2-BR-018**: The About route must not appear in primary navigation until meaningful profile content is explicitly configured.
- **U2-BR-019**: Unknown, draft, or otherwise unavailable detail routes must render the shared not-found recovery experience.

## Home Page

- **U2-BR-020**: Home sections must retain semantic source order when wide asymmetric layouts collapse to one column.
- **U2-BR-021**: Every major home section must expose a stable `data-od-id`.
- **U2-BR-022**: The home page must render introduction, focus, projects, writing, reading, GitHub, and social areas even when personal collections are incomplete.
- **U2-BR-023**: Featured projects and latest posts must preserve the deterministic service order.
- **U2-BR-024**: Empty reading and contribution states must be distinct and route appropriate.
- **U2-BR-025**: The GitHub area must retain the verified profile link when contribution data is absent.
- **U2-BR-026**: A CV or document action must not be interactive unless a public document is explicitly available.

## Project Filtering

- **U2-BR-027**: Filters are derived only from available project types and technologies.
- **U2-BR-028**: At most one project type and one technology may be active simultaneously.
- **U2-BR-029**: Active type and technology filters combine using AND logic.
- **U2-BR-030**: Project type matching and technology matching use the normalized values supplied by Unit 1.
- **U2-BR-031**: Activating an already selected option clears that category.
- **U2-BR-032**: Reset restores the full published project list.
- **U2-BR-033**: Selected state and result count must be perceivable without color.
- **U2-BR-034**: Filter state remains page-local and must not use URL parameters, cookies, or persistent storage.
- **U2-BR-035**: Zero filter matches must show a reset action; a genuinely empty collection must not show meaningless filters.

## Project Detail and Media

- **U2-BR-036**: Optional project sections and external actions render only when their typed values exist.
- **U2-BR-037**: Project technologies and status must remain textual.
- **U2-BR-038**: Inline media is the baseline and must remain available without JavaScript.
- **U2-BR-039**: Only image media opens in the modal lightbox; video remains inline.
- **U2-BR-040**: The lightbox must provide an accessible dialog name, close control, bounded previous and next navigation, focus containment, Escape handling, and trigger focus restoration.
- **U2-BR-041**: Previous and next controls may wrap within the image collection, but their accessible labels must announce the resulting item.
- **U2-BR-042**: Images require meaningful alternative text; contextual media requires a visible caption.
- **U2-BR-043**: Below-the-fold images must lazy-load, and video must be muted by default with a poster when configured.
- **U2-BR-044**: Reduced motion must disable nonessential lightbox and media transitions and any autoplay.

## Blog and MDX Presentation

- **U2-BR-045**: Blog previews render title, description, publication date, reading time, optional tags, and demo disclosure.
- **U2-BR-046**: Article content must use the curated compiled representation supplied by Unit 1; Unit 2 must not execute arbitrary content code.
- **U2-BR-047**: A table of contents renders only when the record opts in and at least three meaningful level-two or level-three headings exist.
- **U2-BR-048**: Table-of-contents links must use deterministic heading IDs and remain keyboard operable.
- **U2-BR-049**: Code and preformatted content must scroll within their own bounds rather than forcing page-level horizontal overflow.
- **U2-BR-050**: External article links must be visually identifiable without using icon-only meaning.

## Reading and Documents

- **U2-BR-051**: Empty reading state copy must not suggest reading history or interests that have not been supplied.
- **U2-BR-052**: Non-empty reading groups render in queued, reading, and completed order, omitting groups with no records.
- **U2-BR-053**: Reading status must be expressed as text.
- **U2-BR-054**: Internal note links render only for records eligible for a detail route.
- **U2-BR-055**: External reading links identify the source destination and never imply local PDF hosting.
- **U2-BR-056**: An empty document collection renders no view or download link.
- **U2-BR-057**: Configured document actions use only the validated public path supplied by Unit 1.

## Destinations and Contribution State

- **U2-BR-058**: Active destinations render anchors; pending destinations render non-focusable text.
- **U2-BR-059**: Pending LinkedIn, X, and Email labels must include the visible words `link pending`.
- **U2-BR-060**: GitHub links must target `https://github.com/Rohaim137` wherever GitHub is offered.
- **U2-BR-061**: No contribution grid, inferred activity, or external GitHub request may be rendered when contribution data is absent.

## Editorial and Interaction Quality

- **U2-BR-062**: The palette uses warm off-white, near-black, and one muted rust or vermilion accent through shared tokens.
- **U2-BR-063**: Prohibited indigo and violet values and prohibited two-stop trust gradients must not appear.
- **U2-BR-064**: Level-one and level-two headings use the display typography token consistently.
- **U2-BR-065**: No rounded card may use a colored left-border accent.
- **U2-BR-066**: Controls must not use emoji as icons; necessary icons use monoline SVG with `currentColor`.
- **U2-BR-067**: No typical viewport may contain more than two conspicuous accent applications.
- **U2-BR-068**: Primary actions use a two-pixel pressed response without delaying activation or changing document flow.
- **U2-BR-069**: Reduced-motion preference removes nonessential transition duration while retaining understandable states.
- **U2-BR-070**: All interactive elements require stable purpose-based `data-testid` values.
- **U2-BR-071**: Controls require visible focus and native semantics wherever a native element exists.
- **U2-BR-072**: Local demonstration SVGs must not resemble fabricated screenshots or contain third-party trademarks.

## Validation Summary

These rules are deterministic, testable, and consistent with the approved Unit 1 contracts. No Mermaid or ASCII diagram is included.

## Extension Compliance

- Resiliency Baseline: disabled; not applicable.
- Security Baseline: disabled; not applicable. Core content and destination safety rules remain included.
- Property-Based Testing: disabled; not applicable.

No enabled extension has an unresolved finding.
