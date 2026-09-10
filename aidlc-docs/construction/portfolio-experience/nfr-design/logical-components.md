# Logical Components - Portfolio Experience NFR Design

## Boundary Summary

Unit 2 is a presentation layer over Unit 1's validated services. Logical components below are application modules and UI boundaries, not independently deployed services.

## `StaticRouteComposer`

**Purpose**: Build each public route from one typed query or detail model.

**Responsibilities**:

- Request route data and metadata at build time.
- Select the appropriate populated, empty, generic, demo, or not-found state.
- Render semantic static HTML before hydration.
- Pass only narrow serializable values to client islands.

**Dependencies**: Unit 1 query and metadata services, server presentation components.

**Must not depend on**: Browser state, runtime network APIs, raw file adapters, or deployment providers.

**NFR contribution**: Static availability, deterministic output, security boundary, SEO, and progressive enhancement.

## `PresentationStateResolver`

**Purpose**: Convert explicit optional values into exhaustive route-facing presentation states.

**Responsibilities**:

- Resolve configured versus generic profile presentation.
- Resolve owner versus demo provenance.
- Resolve populated, empty, and no-filter-match collections.
- Resolve active versus pending destinations.
- Resolve table-of-contents eligibility.

**Dependencies**: Unit 1 serializable model types and centralized generic copy.

**NFR contribution**: Runtime-total rendering, truthfulness, type safety, and replaceability.

## `GenericCopyRegistry`

**Purpose**: Centralize neutral copy used when verified personal information is absent.

**Responsibilities**:

- Store route-specific generic introduction and unavailable-state strings.
- Describe site state without asserting owner facts.
- Provide one replacement point for future genuine copy.

**Must not contain**: Invented biography, role, employer, location, experience, skills, achievements, testimonials, metrics, or personal opinions.

**NFR contribution**: Maintainability, content truthfulness, and safe future personalization.

## `EditorialTokenSystem`

**Purpose**: Provide the complete visual contract through CSS custom properties and shared base styles.

**Responsibilities**:

- Define canvas, ink, muted text, accent, rule, focus, surface, type, spacing, and layout tokens.
- Apply the display font token consistently to level-one and level-two headings.
- Encode reduced-motion behavior and visible focus defaults.
- Keep prohibited color and decoration patterns out of component code.

**Dependencies**: Static CSS and Tailwind build processing.

**NFR contribution**: Visual consistency, contrast, performance, responsive behavior, and anti-slop compliance.

## `ResponsiveShell`

**Purpose**: Own page landmarks, container behavior, skip navigation, header, and footer.

**Responsibilities**:

- Preserve one semantic source order across viewport sizes.
- Limit the wide content measure while supporting deliberate full-width breaks.
- Prevent page-level overflow at narrow widths.
- Compose static navigation links and social destinations.

**Dependencies**: Site configuration and server presentation primitives.

**NFR contribution**: Accessibility, responsive usability, and static fallback.

## `NavigationIsland`

**Purpose**: Enhance narrow navigation with disclosure and focus behavior.

**State**: `closed` or `open`.

**Responsibilities**:

- Toggle disclosure state.
- Close on Escape, route selection, or desktop-layout entry.
- Restore disclosure-button focus after Escape.
- Preserve direct anchors as the underlying navigation mechanism.

**Dependencies**: Serializable navigation items and current route.

**Must not depend on**: Router data fetching, persistent storage, or Unit 1 server modules.

**NFR contribution**: Keyboard access, progressive enhancement, privacy, and failure isolation.

## `ProjectFilterIsland`

**Purpose**: Filter preloaded published projects without network or navigation.

**State**: Optional selected project type and optional selected technology.

**Responsibilities**:

- Apply deterministic AND filtering in original service order.
- Toggle one selection per category and reset all filters.
- Report visible result count through textual and programmatic status.
- Distinguish no-filter-match from an empty published collection.

**Dependencies**: Serializable project summaries and filter options.

**NFR contribution**: Linear scale, low latency, accessibility, no persistence, and offline behavior.

## `ProjectPresentation`

**Purpose**: Render project discovery cards and structured case studies.

**Responsibilities**:

- Preserve status, technologies, and demo provenance.
- Omit absent optional content and actions.
- Keep detail links distinct from optional external actions.
- Compose media using the static gallery boundary.

**Dependencies**: Unit 1 project summaries and details, shared presentation primitives.

**NFR contribution**: Truthfulness, semantic consistency, and maintainability.

## `InlineMediaGallery`

**Purpose**: Provide the complete non-JavaScript media experience.

**Responsibilities**:

- Render responsive image and video figures with dimensions, alternatives, captions, and posters.
- Lazy-load below-the-fold images.
- Expose image triggers for optional modal enhancement.
- Keep video inline and muted by default.

**Dependencies**: Validated `ProjectMedia[]` and local static assets.

**NFR contribution**: Layout stability, accessibility, media performance, and graceful degradation.

## `LightboxIsland`

**Purpose**: Enhance project images with an accessible modal view.

**State**: Closed or open with selected index and originating trigger.

**Responsibilities**:

- Validate opening selection against the image-only collection.
- Manage next, previous, Escape, close, and focus containment.
- Restore trigger focus on close.
- Remove nonessential transitions under reduced motion.

**Dependencies**: Serializable image metadata only.

**Must not depend on**: Video playback state, network fetch, repository services, or a third-party gallery runtime.

**NFR contribution**: Accessible enhancement, isolated failure, small client scope, and deterministic behavior.

## `CuratedArticleRenderer`

**Purpose**: Render safe compiled blog and reading-note content with editorial semantics.

**Responsibilities**:

- Map approved compiled nodes to curated headings, links, code, media, figures, and callouts.
- Constrain prose measure and code overflow.
- Render a table of contents only for opted-in content with three eligible headings.
- Preserve deterministic heading anchors.

**Dependencies**: Unit 1 compiled content and heading metadata.

**Must not depend on**: Raw MDX source, runtime evaluation, arbitrary imports, or browser syntax highlighting.

**NFR contribution**: Content security, reading usability, static performance, and accessibility.

## `TruthfulStateComponents`

**Purpose**: Share accessible rendering of demo, pending, status, empty, and unavailable conditions.

**Components**:

- `DemoBadge`
- `DemoDisclosure`
- `StatusLabel`
- `EmptyState`
- `PendingDestination`
- `NotConnectedState`

**Responsibilities**:

- Provide visible text before decorative cues.
- Avoid dummy controls and synthesized links.
- Use concise route-specific copy.
- Remain server-renderable.

**NFR contribution**: Truthfulness, non-color communication, low bundle cost, and reuse.

## `LocalAssetBoundary`

**Purpose**: Keep typography, icons, demo art, and social imagery local and static.

**Responsibilities**:

- Provide monoline `currentColor` SVG icons.
- Provide three abstract demo project covers.
- Reject scripts, external references, and third-party marks in created SVG assets.
- Expose dimensions and aspect ratios to layout components.

**NFR contribution**: Availability, privacy, predictable layout, and visual quality.

## `PresentationVerificationHarness`

**Purpose**: Produce repeatable evidence for Unit 2 behavior without runtime visitor tracking.

**Responsibilities**:

- Render components in a DOM test environment.
- Simulate keyboard and pointer interactions.
- Assert accessible names, states, focus movement, and reduced-motion variants.
- Enforce Unit 2 coverage thresholds.
- Run Unit 1 regressions and static production build.
- Expose route and client-bundle outputs for Unit 3 browser audits.

**Dependencies**: Vitest, compatible Testing Library packages, compatible axe-core integration, and the application build toolchain.

**NFR contribution**: Maintainability, regression detection, accessibility evidence, and bundle accountability.

## Dependency Rules

| Consumer | May depend on | Must not depend on |
|---|---|---|
| Static routes | Unit 1 service facade, metadata service, server components | Raw file readers, browser-only state |
| Server presentation | Serializable domain models, token classes | Repositories, environment secrets, client hooks |
| Client islands | Narrow serializable props, pure local helpers | Unit 1 server modules, filesystem, environment values |
| Curated article renderer | Compiled safe content and approved component map | Raw MDX, runtime evaluators, arbitrary imports |
| Verification harness | Public components and pure state helpers | Production telemetry or external accounts |

## NFR Coverage Matrix

| NFR concern | Primary logical components |
|---|---|
| Static availability | `StaticRouteComposer`, `ResponsiveShell`, `InlineMediaGallery` |
| Failure isolation | `NavigationIsland`, `ProjectFilterIsland`, `LightboxIsland` |
| Scale and latency | `ProjectFilterIsland`, `StaticRouteComposer` |
| Accessibility | `ResponsiveShell`, all three client islands, `TruthfulStateComponents` |
| Security | `StaticRouteComposer`, `CuratedArticleRenderer`, `LocalAssetBoundary` |
| Privacy | Client islands, `PresentationVerificationHarness` |
| Maintainability | `PresentationStateResolver`, `EditorialTokenSystem`, `PresentationVerificationHarness` |
| Visual quality | `EditorialTokenSystem`, `LocalAssetBoundary`, route compositions |

## Infrastructure Components Not Introduced

Unit 2 introduces no database, API, queue, worker, cache server, circuit breaker, service mesh, monitoring vendor, analytics SDK, authentication provider, storage service, or deployment adapter. Its logical components compile into the same static application established by Unit 1.

## Extension Compliance

- Resiliency Baseline: disabled; not applicable. Core bulkhead and graceful-degradation behavior is documented above.
- Security Baseline: disabled; not applicable. Core safe-rendering and serialization boundaries remain mandatory.
- Property-Based Testing: disabled; not applicable.

No enabled extension has an unresolved finding.
