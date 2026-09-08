# Application Components

## Design Principles

- Organize by feature, with shared primitives only where behavior is genuinely reused.
- Render at build time by default; opt into client JavaScript only for stateful interaction.
- Keep route components declarative by moving file access, validation, compilation, and ordering behind typed services.
- Make `draft`, `demo`, pending, unavailable, and published states explicit in types and presentation.
- Keep content and UI portable to any static host.

## Route Composition Components

### RootLayout

**Purpose**: Establish the document shell shared by all routes.

**Responsibilities**:

- Apply global typography and design tokens.
- Compose skip navigation, `SiteHeader`, main content, and `SiteFooter`.
- Provide default metadata and shared structured page context.

**Interface**: Accepts route content as children. It does not read content files directly.

### HomePage

**Purpose**: Compose the editorial overview.

**Responsibilities**:

- Arrange introduction, current focus, featured projects, latest writing, reading status, GitHub presence, and social destinations.
- Render demonstration disclosures and honest empty states from supplied view models.
- Apply stable `data-od-id` values to major sections.

**Interface**: Receives a `HomePageViewModel` produced by the portfolio query service.

### ProjectsIndexPage and ProjectDetailPage

**Purpose**: Present project discovery and case studies.

**Responsibilities**:

- Compose filters, project cards, project metadata, case-study sections, and media.
- Preserve explicit demo and project-status labels.
- Avoid rendering repository or live-demo actions when their URLs are absent.

**Interface**: Receive `ProjectSummary[]`, filter options, or one compiled `ProjectDetail`.

### BlogIndexPage and BlogArticlePage

**Purpose**: Present writing discovery and long-form articles.

**Responsibilities**:

- Compose reverse-chronological previews and readable article layouts.
- Display demo disclosure on demonstration posts.
- Add a table of contents only when compiled headings justify it.

**Interface**: Receive `PostSummary[]` or one compiled `PostDetail`.

### ReadingIndexPage and ReadingDetailPage

**Purpose**: Present research and reading activity.

**Responsibilities**:

- Group records by textual status.
- Render an honest empty state until genuine records exist.
- Link to legitimate external sources and optional internal notes.

**Interface**: Receive grouped reading summaries or one compiled `ReadingDetail`.

### DocumentsPage

**Purpose**: Present deliberately public documents.

**Responsibilities**:

- Render configured public-document metadata and valid file actions.
- Render a non-interactive unavailable state when no document exists.

**Interface**: Receives `PublicDocument[]`; never discovers arbitrary files under `public/`.

### AboutPage

**Purpose**: Provide a future biography surface without inventing owner details.

**Responsibilities**:

- Render only configured identity, interests, skills, or timeline sections.
- Collapse absent sections cleanly.

**Interface**: Receives `PublicProfile` with optional fields.

### NotFoundPage

**Purpose**: Recover from unknown or unpublished routes.

**Responsibilities**:

- Explain that the requested page is unavailable.
- Offer valid navigation back to the overview and indexes.

## Layout and Shared UI Components

### SiteHeader and PrimaryNavigation

- Provide desktop and narrow-screen navigation.
- Identify the current route.
- Use a client island only for narrow-screen open or close state when needed.
- Preserve focus order, escape behavior, and visible focus.

### SiteFooter and SocialDestinations

- Render the verified GitHub link consistently.
- Render LinkedIn, X, and email as non-focusable `link pending` labels until configured.
- Consume typed destination states rather than branching on arbitrary strings.

### SectionHeader

- Render section eyebrow, heading, optional description, and action.
- Use the display typography token for applicable headings.
- Avoid imposing symmetric card layouts on feature sections.

### DemoBadge and DemoDisclosure

- Render a conspicuous textual `Demo` indicator on summaries and detail pages.
- Explain that demonstration content is illustrative and not owner-attributed.
- Never rely on accent color alone.

### StatusLabel

- Render project and reading states with text and optional monoline icon.
- Expose a meaningful accessible name.

### EmptyState

- Explain a genuinely unavailable collection or field without filler copy.
- Accept an optional valid action, but never render dummy links.

### ActionLink and PendingDestination

- `ActionLink` renders only a valid internal or external destination.
- `PendingDestination` renders plain text with `link pending` and is never focusable.

### MediaFrame

- Provide aspect-ratio, caption, poster, and loading behavior shared by project imagery and video.
- Use native image and video semantics.

## Project Feature Components

### ProjectGrid and ProjectCard

- Present image-led project summaries.
- Display title, substantive summary, technology tags, status, and demo disclosure.
- Expose only valid detail, repository, and live-demo actions.

### ProjectFilterBar

- Client island that filters an already supplied published project list.
- Derives choices from available project type and technology values.
- Supports an all-projects reset and clear non-color selected state.

### ProjectCaseStudy

- Compose problem, audience, role framing, architecture or flow, decisions, stack, retrospective, and optional factual results.
- Omit absent optional sections rather than synthesizing copy.

### ProjectGallery and MediaLightbox

- Present inline gallery media as the baseline experience.
- Enhance to an accessible modal view with keyboard movement, close behavior, focus containment, and focus restoration.
- Fall back to inline native media if enhancement cannot initialize.

## Blog Feature Components

### PostList and PostCard

- Present reverse-chronological post previews with title, description, date, reading time, tags, and demo disclosure.

### ArticleLayout and TableOfContents

- Provide readable prose width, semantic heading flow, metadata, and compiled content.
- Render table-of-contents navigation only when multiple meaningful headings exist.

### MDXComponents

- Curated mapping for headings, links, code, preformatted blocks, images, video, captions, and note callouts.
- Does not expose arbitrary runtime component loading or unreviewed raw script execution.

## Reading Feature Components

### ReadingGroups and ReadingItem

- Group entries into queued, reading, and completed sections.
- Show title, source, topics, authorship metadata when available, and textual status.
- Render internal-note links only when a detail route exists.

## Document Feature Components

### DocumentList and DocumentItem

- Render explicitly configured public document records.
- Provide view and download actions only when the configured asset exists.

## GitHub Feature Components

### GitHubPresence

- Render the verified profile destination and explain that contribution activity is not connected.
- Reserve a component boundary for a future generated-data visualization without enabling it in V1.

### ContributionCalendarBoundary

- Accept future static `ContributionCalendarData`.
- Render nothing or the approved unavailable state when data is absent.
- Never performs browser-time authenticated fetching.

## Metadata Components

### PageMetadataFactory

- Convert site and content view models into route metadata.
- Select a local route-specific or default social image.
- Leave canonical output disabled until a site URL is configured.

### SitemapFactory and RobotsFactory

- Produce discovery files from published static routes and site configuration.
- Exclude drafts and unavailable detail routes.

## Component Boundary Rules

- Route components depend on query services and feature components, not file-system modules.
- Feature components consume typed view models and never parse front matter.
- Shared UI components contain no portfolio-domain file access.
- Client islands receive serializable props and do not import server-only services.
- Infrastructure adapters may depend on domain types; domain services do not depend on deployment providers.

## Requirements and Story Coverage

- Application shell: US-001, US-002
- Projects and media: US-003, US-004
- Blog and MDX: US-005, US-006
- Reading and documents: US-007, US-008
- Social and GitHub: US-009
- Authoring and validation: US-010
- Metadata: US-011
- Editorial quality and accessibility: US-012, US-013
- Static delivery: US-014

## Extension Compliance

All optional extensions are disabled. Extension-specific component constraints are not applicable; approved core security, privacy, accessibility, and validation requirements remain represented.
