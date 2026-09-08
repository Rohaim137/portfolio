# Personal Portfolio Website Requirements

## 1. Intent Analysis

- **User request**: Build a personal portfolio website through AI-DLC using `portfolioPlan.docx`, while applying `anti-ai-slop.md` to the UI design.
- **Request type**: New project
- **Project state**: Greenfield
- **Scope estimate**: System-wide, multi-route static website
- **Complexity estimate**: Complex because the product spans responsive UI, typed file-backed content, media, accessibility, SEO, CMS configuration, automation, and deployment preparation.
- **Requirements depth**: Comprehensive

## 2. Product Outcome

The product shall be a static-first personal portfolio that can eventually present the owner's identity, projects, technical writing, reading and research notes, public documents, GitHub presence, and social destinations. The initial implementation shall provide the complete experience and content infrastructure. It shall include three clearly labelled demonstration projects and three clearly labelled demonstration blog posts so the layouts can be evaluated without presenting those entries as the owner's genuine work. Personal claims, identity details, results, and metrics shall not be invented.

The application shall run without a database or persistent application server and shall have no mandatory recurring service cost. Local implementation and verification are in scope. Connecting external accounts or deploying to Cloudflare Pages requires separate user approval after the local application is complete.

## 3. Confirmed Product Decisions

| Area | Confirmed decision |
|---|---|
| Personal profile content | Build the structure and omit identity details not supplied by the user. |
| Social destinations | Use `https://github.com/Rohaim137` as a working GitHub link everywhere. Show LinkedIn, X, and email as non-interactive labels marked `link pending`. |
| Projects | Publish three substantive demonstration entries, visibly identified as demonstrations rather than the owner's genuine work. |
| Blog and reading | Publish three visibly identified demonstration blog posts. Keep reading content empty until genuine entries are supplied. |
| CV and documents | Build the document experience but publish no document until a deliberately public file is supplied. |
| Visual direction | Editorial engineering: warm off-white canvas, near-black type, muted rust or vermilion accent, expressive typography, and asymmetric composition. |
| Color modes | Deliver one polished light mode with tokens that can support a later dark mode. |
| GitHub activity | Do not render a contribution heatmap until authenticated build-time automation is configured. Retain an ordinary working profile link. |
| Delivery | Build and verify locally first. Prepare Cloudflare Pages deployment only after separate approval. |
| Optional extensions | Resiliency Baseline, Security Baseline, and Property-Based Testing are disabled. The plan's ordinary security, privacy, and testing requirements still apply. |

## 4. Users and Primary Journeys

### 4.1 Prospective employer or collaborator

The visitor shall be able to understand the purpose of the site, navigate its main areas, inspect published work when available, and reach the public GitHub profile without searching through decorative content.

### 4.2 Technical peer or reader

The visitor shall be able to browse published articles and reading notes, understand content status and metadata, and read long-form content with accessible typography and code presentation.

### 4.3 Portfolio owner

The owner shall be able to add or edit projects, posts, reading records, site configuration, and public document metadata through repository files. Pages CMS shall be an optional authoring convenience rather than a runtime dependency.

## 5. Functional Requirements

### 5.1 Global application shell

- **FR-001**: The site shall provide responsive navigation to Overview, Projects, Blog, Reading, and Docs.
- **FR-002**: The navigation shall identify the current route and remain usable by keyboard at mobile and desktop widths.
- **FR-003**: The site shall provide a working GitHub link to `https://github.com/Rohaim137` in each designed social-link location.
- **FR-004**: LinkedIn, X, and email shall render as clearly non-interactive labels marked `link pending`; they shall not use dummy URLs or focusable fake controls.
- **FR-005**: Social destinations shall come from typed site configuration so a real value can replace a pending state without component changes.
- **FR-006**: The application shall include a coherent header, footer, skip link, error boundary where supported, and custom not-found experience.

### 5.2 Home page

- **FR-007**: `/` shall contain structural areas for an introduction, current focus, featured projects, latest writing, currently reading, GitHub activity, and social destinations.
- **FR-008**: Sections without genuine owner content shall use concise, truthful empty states or explicitly labelled demonstration content and shall not invent identity copy, achievements, metrics, or work history.
- **FR-009**: The GitHub activity area shall link to the public profile and explain that contribution history is not yet connected; it shall not render a fabricated or scraped heatmap.
- **FR-010**: Major home-page sections shall have stable `data-od-id` attributes for targeted review.

### 5.3 Projects

- **FR-011**: `/projects` shall render published project records from typed Markdown or MDX content.
- **FR-012**: The project index shall support filtering by available project type or technology when published content provides those values.
- **FR-013**: The initial project collection shall contain exactly three substantive demonstration entries. Every related card and detail page shall visibly identify its demonstration status and shall not imply that it is the owner's genuine work.
- **FR-014**: `/projects/[slug]` shall support the problem and audience, owner role, architecture or flow, technical decisions and trade-offs, technology stack, accessible media, factual results, links, and retrospective.
- **FR-015**: Project records shall support `draft`, `featured`, status, cover media, gallery media, short clips, repository URL, and demo URL.
- **FR-016**: Draft projects shall be excluded from production indexes and shall not produce public static detail routes.
- **FR-017**: Project media components shall support meaningful alternative text, optional captions, poster images, muted playback, and reduced-motion behavior.

### 5.4 Blog

- **FR-018**: `/blog` shall list published posts in reverse publication order with title, description, date, tags when present, and computed reading time.
- **FR-019**: The initial blog collection shall contain exactly three substantive demonstration posts. Every related preview and article page shall visibly identify its demonstration status and shall not attribute opinions or experience to the owner.
- **FR-020**: `/blog/[slug]` shall render MDX content with semantic prose, code blocks, images, links, and an optional table of contents when headings warrant one.
- **FR-021**: Draft posts shall be absent from production indexes and static route generation.
- **FR-022**: Blog content parsing shall validate required front matter and report actionable build-time errors for invalid records.

### 5.5 Reading and research

- **FR-023**: `/reading` shall load typed reading records and group published entries into queued, reading, and completed states.
- **FR-024**: Reading items shall require title, status, source URL, and topics, and may include authors, year, venue, dates, rating, summary, and notes.
- **FR-025**: With no published reading records, the reading index and home-page reading area shall render truthful empty states.
- **FR-026**: `/reading/[slug]` shall support an optional detailed note when an item contains publishable body content.
- **FR-027**: The site shall link to legitimate external sources for papers and shall not host copyrighted PDFs without explicit redistribution permission.
- **FR-028**: Reading status shall be communicated with text, not color alone.

### 5.6 Documents

- **FR-029**: `/docs` shall provide an index capable of rendering a title, description, category, update date, and view or download actions for configured public documents.
- **FR-030**: With no configured documents, `/docs` and any home-page CV action shall render a non-interactive, truthful unavailable state.
- **FR-031**: Only explicitly configured files under `public/documents/` shall appear in the document index.
- **FR-032**: The repository shall document that files under `public/` are publicly downloadable and must not contain sensitive records.

### 5.7 Content and authoring

- **FR-033**: Projects, posts, and reading items shall be stored as version-controlled Markdown or MDX with schema-validated front matter.
- **FR-034**: Content loaders shall expose typed data and deterministic ordering to route components.
- **FR-035**: Pages CMS configuration shall cover the supported content collections without making the production site dependent on Pages CMS availability.
- **FR-036**: The repository shall include documented instructions for adding, drafting, validating, and publishing each content type.
- **FR-037**: The implementation may include non-published fixtures for automated tests, but test fixtures shall not render as real portfolio content in production.
- **FR-037A**: Project and blog schemas shall support an explicit `demo` flag. Rendered demonstration entries shall receive a consistent visible `Demo` label, and authoring documentation shall explain how to replace or remove them.

### 5.8 GitHub activity

- **FR-038**: V1 shall omit the contribution heatmap until authenticated build-time data collection is configured.
- **FR-039**: The codebase shall define a boundary that allows a future locally rendered contribution calendar to consume generated static data without redesigning the page.
- **FR-040**: A future contribution fetch shall use GitHub GraphQL at build or CI time with a secret and shall never expose a token to browser code.
- **FR-041**: Failure or absence of contribution data shall not fail the site build or break the live page.

### 5.9 Metadata and discovery

- **FR-042**: Every index and detail route shall generate an appropriate title and description from site or content data.
- **FR-043**: The static output shall include Open Graph defaults, `sitemap.xml`, and `robots.txt`.
- **FR-044**: Canonical URL generation shall remain configurable until the production hostname is approved.
- **FR-045**: Detail-page social images may fall back to a local default asset and shall not use an external placeholder image service.

## 6. Visual and Interaction Requirements

- **UI-001**: The design shall use a warm off-white background, near-black foreground, and one muted rust or vermilion accent defined through CSS tokens.
- **UI-002**: The accent shall not use `#6366f1`, `#4f46e5`, `#4338ca`, `#3730a3`, `#8b5cf6`, `#7c3aed`, or `#a855f7`.
- **UI-003**: The hero shall use a flat or materially restrained surface and shall not use purple-to-blue, blue-to-cyan, or indigo-to-pink gradients.
- **UI-004**: Display hierarchy shall use an expressive, intentionally selected type treatment. If the display token is serif, all level-one and level-two headings shall use it consistently.
- **UI-005**: The design shall rely on typography, spacing, rules, imagery, and proportion rather than decorative blobs, waves, excessive shadows, or generic rounded-card grids.
- **UI-006**: No component shall combine a rounded card with a colored left-border accent.
- **UI-007**: Icons, when necessary, shall use restrained monoline SVG with `currentColor`; emoji shall not serve as feature or control icons.
- **UI-008**: The accent shall be used sparingly, with no more than two conspicuous accent applications in a typical viewport.
- **UI-009**: The layout shall use intentional asymmetry and alternating section density while preserving clear reading order.
- **UI-010**: The primary content container shall target approximately 1100 to 1200 pixels at wide viewports and adapt cleanly down to narrow mobile sizes.
- **UI-011**: Motion shall be limited to purposeful state transitions and one memorable micro-interaction, such as a two-pixel pressed-button response.
- **UI-012**: Reduced-motion preferences shall disable nonessential animation and media autoplay.
- **UI-013**: The rendered product shall contain no lorem ipsum, unlabeled fictional work, invented metrics, generic feature numbering, or external placeholder imagery. User-requested demonstration projects and posts are permitted only when substantive and visibly labelled `Demo`.
- **UI-014**: The initial release shall ship one polished light color mode; tokens shall avoid blocking a later dark-mode design.

## 7. Non-Functional Requirements

### 7.1 Accessibility

- **NFR-001**: Pages shall use semantic landmarks, a logical heading hierarchy, real links and buttons, and descriptive accessible names.
- **NFR-002**: All interactive behavior shall be keyboard operable with visible focus indication.
- **NFR-003**: Text and interactive states shall meet accepted AA contrast thresholds, including focus and disabled-state communication.
- **NFR-004**: Media shall provide alternative text and captions where visual context is necessary; video shall not produce surprise audio.
- **NFR-005**: Automated accessibility checks and manual keyboard checks shall cover representative routes.

### 7.2 Performance

- **NFR-006**: The application shall be statically exportable and shall not require a runtime application server.
- **NFR-007**: Below-the-fold media shall lazy-load, responsive images shall use suitable modern formats, and video shall use poster assets.
- **NFR-008**: Code syntax highlighting shall occur at build time rather than through a large browser editor dependency.
- **NFR-009**: Representative production pages should target Lighthouse scores near or above 90 for performance, accessibility, best practices, and SEO, with documented exceptions for useful media.

### 7.3 Security and privacy

- **NFR-010**: Secrets, access tokens, private documents, IDs, salary or offer records, and other sensitive data shall not be committed or copied to public output.
- **NFR-011**: Client bundles and generated static files shall contain no authenticated GitHub credential.
- **NFR-012**: External content and links shall be treated as untrusted input and rendered without enabling arbitrary script execution.
- **NFR-013**: Dependencies shall be pinned through a lockfile and checked with the ecosystem's available linting and audit tooling.
- **NFR-014**: V1 shall not include user accounts, a contact-form backend, visitor-submitted content, or analytics tracking.

### 7.4 Reliability and maintainability

- **NFR-015**: Invalid content shall fail validation with the offending file and field identified.
- **NFR-016**: Empty content collections, missing optional media, and unavailable contribution data shall produce designed states rather than runtime failures.
- **NFR-017**: Shared presentation patterns shall be implemented as reusable typed components without obscuring route-specific composition.
- **NFR-018**: Quality checks shall include formatting, linting, type checking, unit or component tests, and a full static production build.
- **NFR-019**: The application shall use a supported Node.js toolchain available without administrator privileges.

### 7.5 Cost and deployment portability

- **NFR-020**: The production design shall require zero dollars in mandatory monthly hosting, database, CMS, storage, analytics, or API costs.
- **NFR-021**: The static artifact shall be deployable to Cloudflare Pages Free and remain portable to another static host.
- **NFR-022**: No external deployment, account connection, secret creation, or production publication shall occur without separate user approval.

## 8. Content Models

### 8.1 Project

Required fields: `title`, `slug`, `summary`, `featured`, `technologies`, `cover`, `status`, and `draft`.

Optional fields: `demo`, repository URL, live-demo URL, clips, gallery, dates, factual metrics, architecture, decisions, retrospective, and body content.

### 8.2 Blog post

Required fields: `title`, `slug`, `description`, `publishedAt`, `draft`, and body content.

Optional fields: `demo`, tags, cover, update date, series, and table-of-contents preference.

### 8.3 Reading item

Required fields: `title`, `slug`, `status`, `url`, `topics`, and `draft`.

Optional fields: authors, year, venue, start date, completion date, rating, summary, and notes.

### 8.4 Public document

Required fields: `title`, `file`, and `description`.

Optional fields: update date, category, and featured status.

### 8.5 Site configuration

The typed site configuration shall support optional identity fields, public GitHub username and URL, pending or active social destinations, canonical site URL, and default metadata assets.

## 9. Route Requirements

| Route | Initial behavior |
|---|---|
| `/` | Complete editorial composition with labelled demonstration project and blog previews, honest empty states elsewhere, and a working GitHub profile link. |
| `/projects` | Typed project index and filters populated by three visibly labelled demonstration projects. |
| `/projects/[slug]` | Statically generated only for valid, non-draft project records. |
| `/blog` | Typed post index populated by three visibly labelled demonstration posts. |
| `/blog/[slug]` | Statically generated only for valid, non-draft posts. |
| `/reading` | Status-grouped reading index; empty state until genuine records are published. |
| `/reading/[slug]` | Statically generated only for valid, non-draft detailed notes. |
| `/docs` | Public-document index; unavailable state until a public document is supplied. |
| `/about` | Optional structural biography page without invented personal details. |

## 10. Out of Scope for V1

- User authentication, comments, reactions, personalized feeds, or private dashboards
- Database-backed content or a custom administrative backend
- Contact-form processing or spam protection services
- Runtime server rendering required for ordinary page views
- Real-time or scraped GitHub contribution data
- A contribution heatmap before authenticated build-time automation is configured
- Large raw video hosting in the repository
- Analytics by default
- A required custom domain
- Unlabelled fictional portfolio work, fabricated personal claims, credentials, testimonials, outcomes, or metrics
- Production deployment during local construction without a separate approval

## 11. Acceptance Criteria

- **AC-001**: A production build creates a complete static export without a database, paid service, or application server.
- **AC-002**: All planned index routes render at mobile and desktop sizes, and content detail routes are generated only from valid, published records.
- **AC-003**: The home, projects, and blog pages render three demonstration projects and three demonstration posts with a conspicuous `Demo` label; reading and documents remain coherent with truthful empty states.
- **AC-004**: `https://github.com/Rohaim137` is a functional link wherever GitHub is offered; LinkedIn, X, and email are non-focusable labels visibly marked `link pending`.
- **AC-005**: No contribution heatmap is shown in V1, and the GitHub activity area does not scrape or fabricate contribution history.
- **AC-006**: Draft projects, posts, and reading items are absent from production listings and detail routes.
- **AC-007**: Invalid required front matter causes an actionable build or test failure.
- **AC-008**: Demonstration entries use an explicit `demo` field and remain distinguishable from automated test fixtures and future genuine portfolio content.
- **AC-009**: Keyboard navigation, skip navigation, visible focus, heading order, status labels, and reduced-motion behavior pass representative manual and automated checks.
- **AC-010**: The interface passes the blocking rules in `anti-ai-slop.md`, including its color, gradient, icon, card, metric, and filler-copy constraints.
- **AC-011**: Major page sections include stable `data-od-id` attributes.
- **AC-012**: No token, API key, private document, or sensitive record appears in tracked application files, browser bundles, or static output.
- **AC-013**: Formatting, linting, type checking, targeted automated tests, and static production build commands all succeed.
- **AC-014**: Content authoring and local verification instructions are complete, and Cloudflare Pages deployment remains a separately approved next action.

## 12. Requirements Traceability

| Source | Requirement coverage |
|---|---|
| User request | Entire portfolio implementation through AI-DLC; `UI-001` through `UI-014` enforce the requested UI constraint source. |
| `portfolioPlan.docx` | `FR-001` through `FR-045`, `NFR-001` through `NFR-022`, content models, routes, scope, and acceptance criteria. |
| `anti-ai-slop.md` | `FR-008`, `FR-010`, `FR-045`, `UI-001` through `UI-014`, `AC-003`, `AC-010`, and `AC-011`. |
| Verification answers | Confirmed documents and reading empty states, editorial visual direction, single color mode, local-first delivery, and disabled extensions. |
| Clarification answers | `FR-003`, `FR-004`, `FR-009`, `FR-038` through `FR-041`, `AC-004`, and `AC-005`. |
| Sample-content revision answers | Three production-visible demonstration projects and three production-visible demonstration posts: `FR-008`, `FR-013`, `FR-019`, `FR-037A`, `UI-013`, `AC-003`, and `AC-008`. |

## 13. Key Risks and Controls

| Risk | Control |
|---|---|
| Demonstration content could be mistaken for genuine work | Require an explicit `demo` field and conspicuous `Demo` labels on cards, previews, and detail pages; never fabricate identity, achievements, metrics, or personal attribution. |
| Dummy social links mislead keyboard and assistive-technology users | Render pending destinations as non-interactive labels. |
| GitHub credentials leak into static output | Omit the heatmap now and constrain any future fetch to authenticated CI or build execution. |
| Media degrades performance | Require optimized images, posters, lazy loading, short compressed clips, and size guidance. |
| Draft or private material becomes public | Validate content visibility, filter drafts, and explicitly configure public documents. |
| The UI resembles a generated template | Apply the checkable anti-slop rules and review composition, copy, token use, and section rhythm during implementation. |

## 14. Extension Configuration and Compliance

- **Resiliency Baseline**: Disabled by user choice; extension rules were not loaded or enforced.
- **Security Baseline**: Disabled by user choice; extension rules were not loaded or enforced. Requirements `NFR-010` through `NFR-014` still implement the security and privacy needs from the supplied plan.
- **Property-Based Testing**: Disabled by user choice; extension rules were not loaded or enforced. Focused unit, component, accessibility, and build validation remain required.

No enabled extension has an unresolved blocking finding at this stage.
