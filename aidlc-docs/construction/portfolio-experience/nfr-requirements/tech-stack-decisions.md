# Technology Stack Decisions - Portfolio Experience

## Decision Summary

Unit 2 extends the pinned Unit 1 stack rather than replacing it. The application remains statically exported, server-rendered by default, dependency-light, and free of runtime external services.

## Application Framework

- **Decision**: Retain the pinned Next.js App Router, React, and strict TypeScript versions already recorded in `package.json` and `package-lock.json`.
- **Use**: Static route composition, metadata integration, server-rendered components, and small client islands.
- **Rationale**: Unit 1 already verified compatibility and static export. Replacing the framework would add risk without changing Unit 2's requirements.
- **Constraint**: Do not add runtime server functions, middleware, server actions, or dynamic request dependencies.

## Rendering Boundary

- **Decision**: Use server components and static HTML by default.
- **Client islands**: Narrow navigation, project filtering, and media lightbox only.
- **Rationale**: This keeps content available before hydration and limits bundle growth and interactive failure scope.
- **Constraint**: Client modules receive serializable values and never import Unit 1 file, repository, validation, or server composition modules.

## Styling

- **Decision**: Retain Tailwind CSS for build-time utility processing while centralizing design values as CSS custom properties in the global stylesheet.
- **Rationale**: Existing configuration is verified and supports responsive composition without a runtime styling dependency.
- **Constraint**: Feature styles consume semantic tokens for canvas, ink, muted text, accent, rules, focus, spacing, and type.
- **Constraint**: Do not introduce a component theme package or generic card system.

## Typography

- **Decision**: Use a deliberate system serif stack for display type and a system sans stack for body text.
- **Rationale**: Builds remain offline and deterministic with no font CDN, tracking request, license artifact, or font-loading layout shift.
- **Display contract**: All level-one and level-two headings use `var(--font-display)`.
- **Future replacement**: A locally licensed font can replace the token value later without changing components.

## Icons and Demonstration Art

- **Decision**: Implement the small required icon set as local monoline SVG components using `currentColor`.
- **Decision**: Create three local abstract SVG demonstration covers in the repository.
- **Rationale**: The project needs few icons and deliberately avoids generic icon-library styling, runtime requests, external placeholders, and fabricated screenshots.
- **Constraint**: SVGs contain no scripts, remote references, third-party marks, or personal claims.

## Images and Video

- **Decision**: Retain static-export-compatible local media behavior and the existing unoptimized Next.js image configuration.
- **Rationale**: There is no runtime image optimization service in the zero-cost static architecture.
- **Implementation requirement**: Supply explicit dimensions or aspect ratios, responsive `sizes`, lazy loading below the fold, meaningful alternative text, and local posters for video.
- **Future option**: Unit 3 may document an authoring-time optimization workflow without adding a runtime service.

## Project Filtering

- **Decision**: Use React local state and a pure filter function over the preloaded `ProjectSummary[]`.
- **Rationale**: The approved maximum of 250 projects does not require a search service, index, worker, virtualization, URL router state, or persistent storage.
- **Constraint**: Selection is one type plus one technology using AND semantics.

## Narrow Navigation

- **Decision**: Use a small React client component around native button and anchor elements.
- **Rationale**: Open state and Escape focus restoration require client state, while route access remains ordinary static links.
- **Constraint**: No general menu or headless UI dependency is required.

## Media Lightbox

- **Decision**: Build a focused local dialog component using native dialog semantics where compatible, with a tested accessible fallback strategy.
- **Rationale**: Requirements are limited to images, focus handling, close, and bounded previous or next selection; a large gallery dependency is unnecessary.
- **Constraint**: Inline media is always the baseline, and video remains outside the modal.

## MDX Presentation

- **Decision**: Render Unit 1's curated compiled output through an explicit local component map.
- **Rationale**: This preserves the build-time safety boundary and avoids runtime content evaluation.
- **Constraint**: Do not add arbitrary MDX imports, client evaluators, raw untrusted HTML, or a browser syntax highlighter.

## Component Testing

- **Decision**: Retain Vitest and add compatible, exactly pinned development dependencies for React Testing Library, user-event simulation, and a DOM environment during Code Generation.
- **Accessibility checks**: Add a compatible axe-core integration only after verifying it against the resolved React, Vitest, and DOM environment versions.
- **Rationale**: These tools cover rendered semantics and keyboard state without requiring a full browser suite inside Unit 2.
- **Constraint**: Cross-browser journeys, Lighthouse execution, and broad artifact checks remain Unit 3 responsibilities, though Unit 2 must expose testable behavior.

## Coverage

- **Decision**: Extend Vitest coverage to Unit 2 pure logic and interactive components with 90 percent thresholds for statements, functions, lines, and branches.
- **Rationale**: Interaction state has meaningful boundary and negative paths that should be enforced independently of browser-level checks.
- **Constraint**: Coverage exclusions must be explicit and must not remove core filters, reducers, destination rendering, or content-state selection.

## Accessibility Target

- **Decision**: Design and test applicable behavior against WCAG 2.2 Level AA.
- **Verification mix**: DOM assertions, compatible automated accessibility scans, keyboard interaction tests, reduced-motion assertions, contrast calculation, and later representative browser review.
- **Rationale**: Automated scanning alone cannot verify focus restoration, logical order, meaningful copy, or progressive enhancement.

## Browser Support

- **Decision**: Target the current and previous major versions of Chrome, Edge, Firefox, and Safari at verification time, plus current mobile Safari and Chrome profiles.
- **Rationale**: This covers modern static-host visitors while avoiding legacy polyfills that conflict with bundle and maintenance goals.
- **Constraint**: Enhancement failure must preserve readable static content.

## Privacy and Storage

- **Decision**: Add no analytics, cookies, consent platform, local storage, session storage, user account, or form-processing dependency.
- **Rationale**: Unit 2 needs no persistence, and the approved product excludes tracking and visitor submission.
- **Constraint**: Filter, navigation, and lightbox state exist only in component memory.

## Rejected Alternatives

| Alternative | Reason not selected |
|---|---|
| Broad client-rendered application | Weakens static fallback and increases JavaScript without product benefit |
| UI component framework | Adds generic visual language and dependency weight for a small bespoke interface |
| Runtime font or image CDN | Adds availability, privacy, and layout risks |
| Hosted search or filtering service | Unnecessary for the approved collection size |
| Third-party gallery package | Excessive for the focused image-only lightbox contract |
| Runtime MDX evaluation | Violates the curated build-time content boundary |
| Browser persistence | Adds privacy and stale-state complexity with no approved need |
| Unit 2 full browser suite | Duplicates Unit 3 integrated verification responsibilities |

## Implementation-Time Compatibility Gate

Before adding any Unit 2 development dependency, Code Generation must:

1. Inspect the current lockfile and peer ranges.
2. Select a stable version compatible with the pinned framework and test runner.
3. Avoid prereleases and forced peer overrides.
4. Record exact versions in the lockfile.
5. Run the full Unit 1 regression suite after installation.

## Extension Compliance

- Resiliency Baseline: disabled; not applicable.
- Security Baseline: disabled; not applicable. Core static-rendering and privacy decisions remain mandatory.
- Property-Based Testing: disabled; not applicable.

No enabled extension has an unresolved finding.
