# Consolidated Application Design

## Design Summary

The portfolio will be a feature-first Next.js static application. Routes render at build time from typed, file-backed content services. Shared UI remains small and accessibility-focused. Client JavaScript is limited to navigation state, project filtering, and progressive gallery enhancement. The architecture has no runtime database, content API, or application server.

## Approved Decisions

| Decision | Selected design |
|---|---|
| Component organization | Feature-first domains with a small shared layout and UI layer |
| Content access | Typed build-time services hide file-system and MDX details from routes |
| MDX | Curated component map; unsupported or unsafe constructs are rejected |
| Rendering | Build-rendered by default, with small serializable client islands |
| Validation | Required-field errors fail with file and field context; drafts are excluded; optional absence is explicit |
| Project media | Accessible inline gallery progressively enhanced with a reusable lightbox |

## Architecture Layers

### Route layer

Owns static route parameters, route metadata hooks, and composition for home, projects, blog, reading, documents, about, not found, sitemap, and robots.

### Feature presentation layer

Owns domain-specific presentation for project discovery and case studies, writing discovery and articles, reading groups and notes, public documents, GitHub presence, and the home overview.

### Shared presentation layer

Owns the shell, navigation, footer, accessible actions, pending destinations, demo disclosure, status labels, empty states, section framing, and media framing.

### Application service layer

Owns route view-model orchestration, site configuration, project content, blog content, reading content, documents, metadata, and the dormant future contribution-data boundary.

### Content infrastructure layer

Owns constrained file reading, front-matter parsing, schema validation, curated MDX compilation, heading extraction, and reading-time calculation.

### Delivery adapter layer

Owns later CI checks, Pages CMS configuration, generated data inputs, and Cloudflare Pages preparation. It is not allowed to leak host-specific behavior into feature components or to publish without explicit approval.

## Key Components

- `RootLayout`, `SiteHeader`, `PrimaryNavigation`, `SiteFooter`
- `HomePage` and stable section compositions
- `ProjectGrid`, `ProjectFilterBar`, `ProjectCard`, `ProjectCaseStudy`, `ProjectGallery`
- `PostList`, `PostCard`, `ArticleLayout`, curated `MDXComponents`
- `ReadingGroups`, `ReadingItem`, `DocumentList`, `DocumentItem`
- `SocialDestinations`, `GitHubPresence`, dormant `ContributionCalendarBoundary`
- `DemoBadge`, `DemoDisclosure`, `StatusLabel`, `EmptyState`, `ActionLink`, `PendingDestination`
- `PageMetadataFactory`, `SitemapFactory`, `RobotsFactory`

Detailed definitions appear in `components.md`.

## Core Services

- `SiteConfigService`
- `FileContentSource`
- `SchemaValidationService`
- `MdxCompilationService`
- `ProjectContentService`
- `BlogContentService`
- `ReadingContentService`
- `DocumentService`
- `PortfolioQueryService`
- `MetadataService`
- Dormant `ContributionDataSource`

Service responsibilities and route orchestration appear in `services.md`. High-level TypeScript contracts appear in `component-methods.md`.

## Primary Flow

1. A static route requests a route-specific view model.
2. The query or detail service reads source files through a constrained source.
3. Schemas validate configuration and front matter with file context.
4. Curated MDX compilation transforms supported body content at build time.
5. Content services apply publication visibility, deterministic ordering, and derived metadata.
6. Routes pass serializable models to feature and shared components.
7. The build emits static HTML, CSS, minimal JavaScript islands, and local assets.

The dependency matrix and validated flow diagram appear in `component-dependency.md`.

## Content State Design

### Demonstration content

- Exactly three projects and three blog posts carry `demo: true`.
- Summary and detail presentations show a textual `Demo` label.
- Demonstration writing does not attribute experience or opinions to the owner.
- Demonstration projects contain no invented owner role, result, metric, repository, or live-demo link.

### Draft content

- Production list and static-slug methods exclude `draft: true` records.
- Draft state is enforced in services, not left to individual cards or pages.

### Empty and unavailable content

- Reading and documents begin as empty typed collections.
- Empty states are truthful and route-specific.
- Missing optional sections are omitted rather than populated with filler.
- Missing required values fail validation.

### Social destinations

- GitHub is active at `https://github.com/Rohaim137` everywhere it is offered.
- LinkedIn, X, and email use the typed pending state and render as non-focusable `link pending` text.

## Interaction Design

- The navigation menu may use a client island for narrow-screen state and focus behavior.
- Project filtering is a client island operating on preloaded published summaries.
- Gallery media is functional inline before JavaScript enhancement.
- The enhanced lightbox manages focus, close, previous, and next behavior and restores focus to the trigger.
- The memorable micro-interaction remains subtle and is disabled or simplified under reduced motion.

## Accessibility Design

- Semantic route and section structure is established by build-rendered components.
- Shared controls use native links and buttons.
- Status, demo, pending, disabled, and selected states use text or non-color cues.
- Media contracts require alternative text and optional captions.
- Reduced-motion preferences affect animation and autoplay.
- Client islands own explicit keyboard and focus contracts.

## Visual System Boundary

- A warm off-white, near-black, and muted rust or vermilion palette is defined through tokens.
- Prohibited default indigo and violet accents are excluded.
- Typography, spacing, imagery, rules, and asymmetric proportion create hierarchy.
- No purple or blue trust gradient, decorative blobs, wave backgrounds, emoji controls, excessive accent use, or colored-left-border rounded cards are permitted.
- Major sections expose stable `data-od-id` values.

## Security and Privacy Design

- File access is limited to configured collection roots.
- Public documents require explicit metadata and existence validation.
- Curated MDX prevents arbitrary client script or component imports.
- Client islands receive no service objects, raw file paths, or secrets.
- Authenticated GitHub contribution collection remains a later CI or build adapter and is inactive in V1.
- External account connection and deployment remain outside the application runtime and require approval.

## Static and Delivery Design

- All public routes are statically generated from validated records.
- Missing or unpublished detail records resolve to not found.
- Metadata, sitemap, and robots output derive from published routes.
- Canonical URLs remain disabled until a production site URL exists.
- The artifact is portable to Cloudflare Pages or another static host.

## Testing Strategy at Design Level

- Unit-test validators, visibility, ordering, filtering, grouping, destination resolution, and metadata factories.
- Component-test demo disclosure, pending destinations, empty states, navigation, filters, article structure, and gallery keyboard behavior.
- Verify draft slugs and invalid content at build boundaries.
- Run automated accessibility checks plus documented keyboard and reduced-motion review.
- Add automated anti-slop checks for prohibited colors and detectable markup patterns, supplemented by visual review.
- Use the production static build as the integrated architecture test.

## Deferred Detailed Design

- Exact schema libraries, front-matter rules, parsing implementation, and error formatting
- Exact file and package layout
- Filter URL or local-state semantics
- Lightbox state machine and focus implementation
- Tailwind and framework version-specific configuration
- CI workflow events and Cloudflare build settings
- Concrete test framework and browser automation selection

These decisions belong to Units Generation and the applicable Functional, NFR, Infrastructure, and Code Generation stages.

## Traceability

| Design area | User stories |
|---|---|
| Shell and overview | US-001, US-002 |
| Projects and media | US-003, US-004 |
| Blog and MDX | US-005, US-006 |
| Reading and documents | US-007, US-008 |
| Social and GitHub | US-009 |
| Content authoring | US-010 |
| Metadata and discovery | US-011 |
| Editorial visual quality | US-012 |
| Accessibility | US-013 |
| Static build and delivery | US-014 |

All approved stories and requirement groups have an application boundary. No route or service requires a database or runtime application API.

## Extension Compliance

- **Resiliency Baseline**: Disabled; not applicable.
- **Security Baseline**: Disabled; not applicable as an extension. Approved core security and privacy boundaries are included.
- **Property-Based Testing**: Disabled; not applicable as an extension. Focused tests are defined at the design level.

No enabled extension has an unresolved blocking finding.

## Artifact Index

- `components.md` - component responsibilities and interfaces
- `component-methods.md` - high-level TypeScript contracts
- `services.md` - build-time service definitions and orchestration
- `component-dependency.md` - dependency matrix, communication, and validated data flow
- `application-design.md` - consolidated design and traceability
