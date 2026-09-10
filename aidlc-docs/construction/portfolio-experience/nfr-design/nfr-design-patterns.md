# NFR Design Patterns - Portfolio Experience

## Design Objective

Unit 2 meets its performance, availability, accessibility, security, privacy, and maintainability targets through static rendering and deliberately isolated interaction patterns. No runtime infrastructure is introduced.

## Static-First Rendering

### Pattern

Every public route is composed from Unit 1 view models during static generation. The initial HTML contains headings, copy, lists, links, disclosure text, inline media, and recovery paths.

### Consequences

- Visitors can read and navigate before hydration.
- Search and sharing metadata do not depend on browser JavaScript.
- JavaScript failure affects convenience features rather than content access.
- Runtime service availability cannot take down published content.

### NFR coverage

U2-NFR-001 through U2-NFR-003, U2-NFR-027 through U2-NFR-033, and U2-NFR-070.

## Progressive Enhancement Bulkheads

### Pattern

Narrow navigation, project filtering, and media lightbox behavior are separate client islands. Each island receives only its own serializable props and owns only its local interaction state.

### Failure behavior

- Navigation failure leaves direct links visible.
- Filter failure leaves the complete project list visible.
- Lightbox failure leaves all media inline.
- One island cannot replace or suppress route content owned by another island.

No retry loop is used. A visitor may use the static fallback or reload manually; Unit 2 performs no network operation for which retry would improve correctness.

### NFR coverage

U2-NFR-002, U2-NFR-003, U2-NFR-027 through U2-NFR-031, U2-NFR-047, and U2-NFR-052.

## Build-Time Fail Fast, Runtime Render Total

### Pattern

Invalid source data fails through Unit 1 before Unit 2 receives a model. Once a valid view model exists, Unit 2 uses exhaustive presentation variants for every optional state.

### Presentation variants

- Configured or generic profile
- Owner or demo content provenance
- Populated, empty, or no-filter-match collection
- Active or pending destination
- Open or closed menu
- Open or closed lightbox
- Visible or hidden table of contents

This separates authoring defects from ordinary absence. Missing optional data renders a complete state; invalid required data prevents publication.

### NFR coverage

U2-NFR-031, U2-NFR-043 through U2-NFR-050.

## Deterministic In-Memory Selection

### Pattern

The project filter operates on the preloaded immutable summary array. It checks at most one selected type and one selected technology in a single pass and preserves original service order.

### Scale behavior

- Work is linear in the number of published projects.
- No sorting occurs during interaction.
- Filter options are supplied or derived once from validated summaries.
- Stable slug keys preserve component identity.
- The approved 250-record collection needs neither virtualization nor pagination infrastructure.

### NFR coverage

U2-NFR-006, U2-NFR-008, U2-NFR-045, and U2-NFR-050.

## Feature-Boundary Code Splitting

### Pattern

Server components remain the default. Each interactive feature begins at the smallest useful `use client` boundary. The image lightbox implementation is loaded only when gallery enhancement is needed and must not enter unrelated route bundles.

### Guardrails

- No barrel export may accidentally pull server services into a client graph.
- Client imports are checked during build and bundle review.
- Shared presentational components remain server-compatible unless they require state or effects.
- No general component framework or gallery package is introduced.

### NFR coverage

U2-NFR-002, U2-NFR-003, U2-NFR-012, U2-NFR-052, U2-NFR-059, and U2-NFR-060.

## Media Budget and Layout Stability

### Pattern

Media contracts provide intrinsic dimensions or aspect ratios. Above-the-fold visual assets are intentionally selected; below-the-fold images lazy-load. Video remains native, muted by default, and uses a poster when supplied.

Local abstract SVG demo covers provide low-cost layout evaluation without external requests or fabricated screenshots. Decorative images use empty alternative text only when adjacent text carries all meaning.

### NFR coverage

U2-NFR-004, U2-NFR-005, U2-NFR-009 through U2-NFR-011, U2-NFR-021, U2-NFR-022, U2-NFR-038, and U2-NFR-066.

## Accessible Interaction State Machines

### Navigation state machine

- `closed + toggle` becomes `open`.
- `open + toggle` becomes `closed`.
- `open + escape` becomes `closed` and restores disclosure-button focus.
- `open + route-selected` becomes `closed`.
- Any state plus desktop-layout entry becomes `closed`.

### Lightbox state machine

- `closed + open(index, trigger)` validates the image index and becomes `open`.
- `open + next` selects the next image, wrapping at the end.
- `open + previous` selects the previous image, wrapping at the beginning.
- `open + close` becomes `closed` and restores trigger focus.
- With one image, next and previous controls are absent.

### Focus containment

Native focusable elements define modal order. On open, focus moves to the dialog or close control. Tab and Shift+Tab remain inside while the modal is active. Background interaction is blocked, and close restores focus deterministically.

### Reduced motion

Pressed, menu, and lightbox states retain immediate visual changes while transition duration is removed under reduced-motion preference. Video autoplay is disabled.

### NFR coverage

U2-NFR-013 through U2-NFR-026 and U2-NFR-046.

## Semantic Status Pattern

### Pattern

Status is always encoded in visible text and programmatic semantics before color or decoration.

- Current route uses `aria-current="page"`.
- Toggle and filter state uses native state or `aria-expanded` and `aria-pressed`.
- Result changes use a polite status region.
- Demo content shows `Demo` and a disclosure.
- Pending destinations show `link pending` as non-interactive text.
- Reading and project status remain visible labels.

### NFR coverage

U2-NFR-015 through U2-NFR-020 and U2-NFR-026.

## Trusted Model and Curated Rendering Boundary

### Pattern

Routes accept validated Unit 1 view models. Client islands accept narrow serializable projections. Compiled content renders only through an explicit component map.

### Prohibitions

- No client imports from file sources, repositories, or composition roots.
- No raw front matter or MDX source in client props.
- No arbitrary raw HTML or content-defined runtime import.
- No environment variable, credential, absolute path, or secret in serialized state.
- No active destination synthesized from a missing URL.

### NFR coverage

U2-NFR-034 through U2-NFR-042 and U2-NFR-048.

## Memory-Only Privacy Pattern

### Pattern

Menu, filters, and modal selection use component memory only. The design adds no cookie, analytics call, fingerprint, storage key, account, or form submission.

### Consequences

- Refresh restores canonical default state.
- Navigation discards stale interaction state.
- No consent layer is necessary for Unit 2 behavior.
- No production telemetry is required to render or verify the site.

### NFR coverage

U2-NFR-039 and U2-NFR-040.

## Token-Governed Editorial System

### Pattern

Shared CSS tokens own canvas, ink, muted text, accent, rule, focus, spacing, type, and surface behavior. Route composition uses typography, proportion, rules, and spacing rather than generic card decoration.

### Guardrails

- Display typography is applied consistently to level-one and level-two headings.
- Accent is restricted to purposeful states and at most two conspicuous uses per typical viewport.
- Prohibited color, gradient, icon, blob, wave, filler-copy, invented-metric, and card patterns are absent.
- Wide asymmetry is implemented with CSS while source order remains logical.

### NFR coverage

U2-NFR-061 through U2-NFR-067.

## Verification Without Visitor Monitoring

### Pattern

Quality signals come from local and CI-compatible build evidence rather than production visitor tracking.

- Formatting and zero-warning lint
- Strict type checking
- Unit 1 regression suite
- Unit 2 state and component tests
- Automated DOM accessibility assertions
- Coverage thresholds
- Static production build and route output
- Bundle inspection
- Unit 3 cross-browser, keyboard, Lighthouse, and artifact review

### NFR coverage

U2-NFR-012 and U2-NFR-053 through U2-NFR-060.

## Infrastructure Applicability

| Component type | Applicability | Reason |
|---|---|---|
| Database | Not applicable | Content is validated and compiled at build time |
| Runtime API | Not applicable | Routes receive static view models |
| Queue or worker | Not applicable | No asynchronous runtime workload exists |
| Distributed cache | Not applicable | Static assets and build output provide the delivery boundary |
| Circuit breaker or retry service | Not applicable | Unit 2 makes no runtime service call |
| Service worker | Not applicable | Offline application behavior is not required |
| Runtime monitoring | Not applicable | Privacy scope excludes visitor telemetry; build evidence is sufficient |

## Extension Compliance

- Resiliency Baseline: disabled; not applicable. Static degradation patterns are part of core requirements.
- Security Baseline: disabled; not applicable. Trusted-model and client-boundary patterns remain mandatory.
- Property-Based Testing: disabled; not applicable.

No enabled extension has an unresolved finding.
