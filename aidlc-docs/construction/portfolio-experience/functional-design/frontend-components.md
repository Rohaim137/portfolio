# Frontend Component Design - Portfolio Experience

## Design Intent

Unit 2 implements an editorial, static-first portfolio with restrained client enhancement. Server-rendered content is complete before hydration. JavaScript is limited to narrow navigation, project filtering, and image lightbox state.

## Component Hierarchy

### Shared shell

- `RootLayout`
  - `SkipLink`
  - `SiteHeader`
    - `BrandLink`
    - `PrimaryNavigation`
    - `NavigationDisclosure`
  - Route `main`
  - `SiteFooter`
    - `SocialDestinations`

### Home route

- `HomePage`
  - `HomeIntroduction`
  - `CurrentFocus`
  - `FeaturedProjects`
    - `ProjectCard`
  - `LatestWriting`
    - `PostCard`
  - `HomeReadingState`
  - `GitHubPresence`
  - `SocialDestinations`

### Project routes

- `ProjectsIndexPage`
  - `PageIntroduction`
  - `ProjectFilterBar`
  - `ProjectGrid`
    - `ProjectCard`
  - `EmptyState` or `NoFilterMatch`
- `ProjectDetailPage`
  - `DemoDisclosure`
  - `ProjectCaseStudy`
  - `ProjectGallery`
    - `MediaFrame`
    - `MediaLightbox`

### Blog routes

- `BlogIndexPage`
  - `PageIntroduction`
  - `PostList`
    - `PostCard`
  - `EmptyState`
- `BlogArticlePage`
  - `DemoDisclosure`
  - `ArticleLayout`
    - `ArticleMetadata`
    - `TableOfContents`
    - `MDXComponents`

### Reading, documents, and About

- `ReadingIndexPage`
  - `ReadingGroups`
    - `ReadingItem`
  - `EmptyState`
- `ReadingDetailPage`
  - `ArticleLayout`
- `DocumentsPage`
  - `DocumentList`
    - `DocumentItem`
  - `EmptyState`
- `AboutPage`
  - `ProfileSections` or `EmptyState`
- `NotFoundPage`
  - `RecoveryLinks`

## Shared Component Contracts

### `SkipLink`

- Targets `#main-content`.
- Becomes visually prominent on focus.
- Test ID: `site-skip-link`.

### `PrimaryNavigation`

- Inputs: navigation items and current path.
- Server output always contains usable anchors.
- Narrow enhancement owns only open or closed state.
- Uses `aria-current="page"` for the current route.
- Disclosure test ID: `primary-navigation-menu-button`.
- Container test ID: `primary-navigation`.

### `SocialDestinations`

- Exhaustively switches on active or pending state.
- Active links use stable IDs such as `social-github-link`.
- Pending values render text with no interactive role or tab stop.

### `DemoBadge` and `DemoDisclosure`

- Badge text is exactly `Demo`.
- Disclosure explains illustrative provenance in plain language.
- Badge and disclosure do not rely on accent color alone.
- Test IDs: `demo-badge` and `demo-disclosure`.

### `EmptyState`

- Inputs: route-specific heading, explanation, and optional valid action.
- Never generates an action from absent data.
- Avoids generic filler terminology in rendered copy.

### `ActionLink`

- Uses a native anchor for a validated destination.
- Applies external-target behavior only to external destinations.
- Receives an explicit accessible label when visible text lacks context.
- Uses the global two-pixel pressed treatment.

## Home Components

### `HomeIntroduction`

- Receives `ProfilePresentation`.
- Configured state renders only supplied fields.
- Generic state renders centralized neutral copy about work, writing, and notes becoming available through the portfolio.
- It never displays blank labels or fabricated profile values.

### `CurrentFocus`

- Renders a configured focus value when present.
- Otherwise renders a concise state indicating that a current focus has not been published.
- Uses no invented skill or subject list.

### `FeaturedProjects` and `LatestWriting`

- Preserve service order and render demonstration badges consistently.
- Provide valid links to the corresponding full indexes.
- Keep a readable list structure even when visual composition is asymmetric.

### `HomeReadingState`

- Renders available reading records or the reading-specific empty state.
- Never synthesizes books, papers, authors, or status.

### `GitHubPresence`

- Shows the verified GitHub profile link.
- When contribution state is `not-connected`, renders a short textual explanation and no calendar-shaped placeholder.

## Project Components

### `ProjectFilterBar`

- Client component with type selection, technology selection, and reset.
- Receives the complete published summaries and available options.
- Each control uses `aria-pressed` or an equivalent native selected state.
- Announces result-count changes through a polite status region.
- Test IDs follow `project-filter-type-{value}`, `project-filter-technology-{value}`, and `project-filter-reset`.

### `ProjectGrid`

- Uses a semantic list.
- Receives the filtered records, not filter state setters.
- Preserves DOM order during filtering.
- Renders `NoFilterMatch` when filters exclude every published record.

### `ProjectCard`

- Displays cover, title, summary, status, technologies, and demo provenance.
- The detail-page link is the primary card action.
- Repository and live links render separately only when configured.
- Does not turn the entire card into nested interactive content.

### `ProjectCaseStudy`

- Renders only supplied narrative sections.
- Maintains one logical heading hierarchy.
- Results are omitted for demonstration content unless factual non-owner example data is explicitly and safely framed.

### `ProjectGallery`

- Server output provides a labelled inline media list.
- Image triggers enhance into modal-open buttons; their media remains visible inline.
- Video uses native controls, muted default, poster support, and no surprise autoplay.

### `MediaLightbox`

- Client component rendered only after an image trigger is used.
- Uses an accessible modal dialog with labelled current item and position.
- Contains close, previous, and next buttons where applicable.
- Handles Escape and arrow keys, traps focus while open, prevents background interaction, and restores trigger focus.
- Test IDs: `media-lightbox`, `media-lightbox-close`, `media-lightbox-previous`, and `media-lightbox-next`.

## Blog Components

### `PostList` and `PostCard`

- Use semantic list and article elements.
- Render title, description, date, reading time, tags, and provenance.
- Never add an author voice or personal endorsement not present in content.

### `ArticleLayout`

- Constrains prose measure while allowing media to use deliberate wider breaks.
- Keeps heading hierarchy, metadata, content, and optional table of contents semantically separate.
- Prevents code blocks and long links from causing page overflow.

### `TableOfContents`

- Server component derived from compiled headings.
- Renders only for opt-in articles with three or more eligible headings.
- Uses a labelled navigation landmark and ordinary anchors.

### `MDXComponents`

- Maps only Unit 1's curated component names.
- Provides heading anchors, safe links, responsive images, video, figures, captions, code, and note callouts.
- Adds no runtime evaluator or dynamic import from content.

## Reading, Documents, and About Components

### `ReadingGroups`

- Groups records in queued, reading, and completed order.
- Omits empty groups and expresses every status as visible text.

### `ReadingItem`

- Renders known title, source, topics, optional authorship metadata, and status.
- External source and internal note are distinct actions.

### `DocumentList` and `DocumentItem`

- Render only explicitly configured documents.
- View and download actions come from validated model values.
- Empty state contains no disabled or fake anchor.

### `AboutPage`

- Exists but is omitted from default primary navigation while the profile is empty.
- Renders generic, replaceable site-state copy in the empty condition.
- Configured sections appear independently and absent sections collapse cleanly.

## Route-Level Stable Section IDs

| Route area | `data-od-id` |
|---|---|
| Home introduction | `home-introduction` |
| Home focus | `home-focus` |
| Featured projects | `home-projects` |
| Latest writing | `home-writing` |
| Home reading | `home-reading` |
| GitHub presence | `home-github` |
| Home social | `home-social` |
| Projects index | `projects-index` |
| Project filters | `projects-filters` |
| Project detail | `project-detail` |
| Project gallery | `project-gallery` |
| Blog index | `blog-index` |
| Blog article | `blog-article` |
| Reading index | `reading-index` |
| Documents index | `documents-index` |
| About | `about-page` |

## Responsive Behavior

- The primary container targets 1100 to 1200 pixels at wide viewports.
- Reading order remains DOM order; CSS grid placement never changes semantic order.
- Narrow layouts use one column and avoid page-level horizontal scrolling.
- Touch targets remain comfortably operable without oversized dashboard styling.
- Media uses intrinsic dimensions or aspect ratio to limit layout shift.

## Visual Token Contract

- Warm off-white canvas token.
- Near-black primary text token.
- Muted rust or vermilion accent token.
- Display typography token used by level-one and level-two headings.
- Restrained rule, surface, muted-text, focus, and spacing tokens.
- No prohibited indigo or violet accents, trust gradients, decorative blobs, waves, excessive shadows, or colored-left-border rounded cards.

## Generic and Demo Assets

- Three local abstract SVG covers distinguish the demo projects through composition rather than invented screenshots.
- SVGs contain no external requests, scripts, personal marks, or third-party branding.
- Generic copy is centralized in configuration or a presentation-copy module for later replacement.
- Genuine content can replace each demo file and switch `demo` to false without changing components.

## Verification Responsibilities

- Component tests cover demo disclosure, pending destinations, empty states, route navigation, filters, article structure, and gallery keyboard behavior.
- Accessibility checks cover landmarks, heading order, focus, accessible names, status text, dialog behavior, and reduced motion.
- Responsive checks cover representative narrow and wide compositions.
- Visual checks cover accent restraint and every blocking anti-slop rule.
- Static build checks ensure all public routes render from Unit 1 models.

## Extension Compliance

- Resiliency Baseline: disabled; not applicable.
- Security Baseline: disabled; not applicable. Core safe rendering and link rules remain included.
- Property-Based Testing: disabled; not applicable.

No enabled extension has an unresolved finding.
