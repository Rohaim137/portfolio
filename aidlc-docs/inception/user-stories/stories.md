# Portfolio User Stories

## Story Conventions

- Stories are organized by product feature, as approved in the story-generation plan.
- Behavioral criteria use Given-When-Then. Static and cross-cutting constraints use verification checklists.
- `Demo` always means visibly disclosed demonstration content, not a live-demo URL or a claim about the owner's genuine work.

## Navigation and Application Shell

### US-001: Navigate the portfolio confidently

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want consistent, responsive navigation and page context so that I can move among the portfolio's major areas without losing my place.

**Value**: Makes every route discoverable and usable regardless of entry point or device.

**Requirements**: FR-001, FR-002, FR-006; NFR-001, NFR-002; AC-002, AC-009

#### Acceptance criteria

**Scenario: Navigate a major route**

- Given I am on any public page
- When I use the primary navigation to choose Overview, Projects, Blog, Reading, or Docs
- Then I reach the corresponding route and the navigation identifies the current area

**Scenario: Navigate by keyboard on a narrow viewport**

- Given the navigation is in its narrow-screen presentation
- When I use only the keyboard to open it, traverse its items, and close it
- Then focus remains visible, order is logical, and no control traps focus

#### Quality checklist

- [ ] A skip link reaches the main content.
- [ ] Header, main, and footer landmarks are present.
- [ ] The custom not-found experience offers a useful path back into the site.

## Home Overview

### US-002: Understand the portfolio at a glance

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want an editorial overview of available work and interests so that I can decide quickly what to explore.

**Value**: Provides a useful front door even before all personal content is available.

**Requirements**: FR-007 through FR-010; UI-009, UI-010; NFR-016; AC-003, AC-005, AC-011

#### Acceptance criteria

**Scenario: Review the initial overview**

- Given the owner has not supplied identity, reading, document, or contribution data
- When I visit the home page
- Then I see structurally complete introduction, focus, projects, writing, reading, GitHub, and social areas without invented personal claims

**Scenario: Distinguish content states**

- Given demonstration projects and posts exist while reading and contribution data do not
- When I scan the overview
- Then demonstration entries are marked `Demo`, unavailable collections use truthful empty states, and no fabricated heatmap appears

#### Quality checklist

- [ ] Every major section has a stable `data-od-id`.
- [ ] Content order remains logical when the asymmetric desktop layout becomes a single-column mobile layout.
- [ ] The GitHub area includes the working profile destination.

## Projects

### US-003: Discover and filter projects honestly

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want to browse and filter project summaries with clear provenance so that I can find relevant work without mistaking demonstration entries for genuine owner projects.

**Value**: Demonstrates the project experience while preserving credibility.

**Requirements**: FR-011 through FR-013, FR-015, FR-016, FR-037A; UI-013; AC-003, AC-006, AC-008

#### Acceptance criteria

**Scenario: Browse initial projects**

- Given the initial project collection contains three demonstration records
- When I open `/projects`
- Then I see exactly three project cards and each one has a conspicuous `Demo` label

**Scenario: Filter available projects**

- Given published projects contain type or technology metadata
- When I select an available filter
- Then only matching projects remain and I can restore the complete set

**Scenario: Exclude drafts**

- Given a project has `draft: true`
- When production routes and indexes are generated
- Then that project appears in neither the project index nor a public detail route

#### Quality checklist

- [ ] Cards use substantive summaries without invented outcomes or metrics.
- [ ] Filter state is understandable without relying on color alone.
- [ ] An empty collection still has a truthful designed state after demonstration entries are removed.

### US-004: Evaluate a project case study and its media

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want a structured project detail page with accessible media and explicit trade-offs so that I can understand how a project is framed and evaluated.

**Value**: Turns a project card into an evidence-oriented technical narrative.

**Requirements**: FR-014, FR-015, FR-017; NFR-004, NFR-007; AC-002, AC-009

#### Acceptance criteria

**Scenario: Read a demonstration case study**

- Given I open one of the three demonstration project routes
- When the detail page renders
- Then it identifies itself as `Demo` and presents a problem, audience, role framing, architecture or flow, decisions and trade-offs, technology, and retrospective without personal attribution

**Scenario: Use project media accessibly**

- Given a project contains images or a short clip
- When I navigate its gallery by keyboard or request reduced motion
- Then controls remain keyboard operable, images have meaningful alternatives, clips are muted, poster images prevent blank frames, and nonessential autoplay is disabled

#### Quality checklist

- [ ] Repository and live-demo controls appear only when valid URLs exist.
- [ ] Below-the-fold media is lazy-loaded.
- [ ] Captions are present where media needs context.

## Blog

### US-005: Discover technical writing

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want to scan dated and tagged writing previews so that I can choose an article relevant to my interests while understanding which entries are demonstrations.

**Value**: Makes writing discoverable without fabricating the owner's views or experience.

**Requirements**: FR-018, FR-019, FR-021, FR-037A; AC-003, AC-006, AC-008

#### Acceptance criteria

**Scenario: Browse initial writing**

- Given the initial blog collection contains three demonstration posts
- When I open `/blog`
- Then I see exactly three posts in reverse publication order with title, description, date, reading time, optional tags, and a conspicuous `Demo` label

**Scenario: Exclude a draft post**

- Given a post has `draft: true`
- When production routes and indexes are generated
- Then the post appears in neither the blog index nor a public article route

#### Quality checklist

- [ ] Demonstration previews do not attribute opinions or experience to the owner.
- [ ] The index has a truthful empty state after demonstration posts are removed.

### US-006: Read a well-structured article

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want readable long-form articles with usable code, media, and navigation so that I can engage with technical writing on any device.

**Value**: Provides a durable publishing surface for future genuine writing.

**Requirements**: FR-020, FR-022; NFR-001, NFR-004, NFR-008, NFR-015; AC-007, AC-009

#### Acceptance criteria

**Scenario: Read a demonstration article**

- Given I open a demonstration blog route
- When the article renders
- Then the page identifies itself as `Demo` and displays semantic prose, build-time highlighted code, images, links, and a table of contents only when the heading structure benefits from one

**Scenario: Reject invalid article content**

- Given a post is missing required front matter or contains an invalid required value
- When content validation runs
- Then the process fails with the offending file and field identified

#### Quality checklist

- [ ] Long lines, code blocks, and media do not cause narrow-screen horizontal page overflow.
- [ ] Heading links and table-of-contents links are keyboard accessible.

## Reading and Research

### US-007: Explore reading activity when available

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want reading items grouped by explicit status with legitimate source links so that I can understand the owner's research interests without ambiguity or unauthorized document hosting.

**Value**: Supports a future research record while handling the initial absence of content honestly.

**Requirements**: FR-023 through FR-028; NFR-012, NFR-016; AC-002, AC-003, AC-006, AC-007

#### Acceptance criteria

**Scenario: View the initial reading state**

- Given no genuine reading records have been published
- When I open `/reading` or review the home-page reading area
- Then I see a concise truthful empty state and no invented paper or book entries

**Scenario: View future reading records**

- Given valid published records exist in queued, reading, or completed states
- When I open `/reading`
- Then records are grouped under textual status headings and each external paper link targets a legitimate source

**Scenario: Open a detailed note**

- Given a published reading record contains body content
- When I follow its detail link
- Then a static `/reading/[slug]` note is available; records without publishable body content do not create misleading detail links

#### Quality checklist

- [ ] Status is conveyed through visible text rather than color alone.
- [ ] Draft records are absent from production indexes and routes.
- [ ] Required reading front matter is validated with actionable errors.

## Documents

### US-008: Access only deliberate public documents

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want document availability and actions to be explicit so that I never encounter fake downloads and can access genuine public files when the owner supplies them.

**Value**: Creates a trustworthy document experience without risking accidental disclosure.

**Requirements**: FR-029 through FR-032; NFR-010, NFR-016; AC-003, AC-012

#### Acceptance criteria

**Scenario: View documents before a CV is supplied**

- Given no document is explicitly configured
- When I open `/docs` or encounter a CV area
- Then I see a truthful non-interactive unavailable state and no fake view or download control

**Scenario: Access a configured public document**

- Given the owner has deliberately placed and configured a public PDF
- When I view the documents index
- Then its title, description, optional category and date, and valid view or download actions appear

#### Quality checklist

- [ ] Documentation warns that every file under `public/` is downloadable.
- [ ] Sensitive document categories are explicitly prohibited from publication.

## GitHub and Social Destinations

### US-009: Reach verified destinations without misleading links

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want verified destinations to work and unavailable destinations to be visibly pending so that I can contact or evaluate the owner without encountering dummy controls.

**Value**: Preserves trust and accessibility while profile configuration is incomplete.

**Requirements**: FR-003 through FR-005, FR-009, FR-038 through FR-041; NFR-011, NFR-016; AC-004, AC-005, AC-012

#### Acceptance criteria

**Scenario: Open GitHub**

- Given GitHub is offered in the header, overview, activity area, or footer
- When I activate it
- Then it opens the verified destination `https://github.com/Rohaim137`

**Scenario: Recognize pending destinations**

- Given LinkedIn, X, and email do not have configured destinations
- When I encounter the social area
- Then each appears as non-interactive text marked `link pending` and receives no keyboard focus

**Scenario: View activity before secure automation exists**

- Given authenticated build-time contribution collection is not configured
- When I reach the GitHub activity area
- Then no contribution heatmap or scraped data appears, the profile link remains available, and the page remains complete

#### Quality checklist

- [ ] Future contribution data consumes generated static input behind a replaceable boundary.
- [ ] Future automation is build-time only, secrets stay outside the browser, and missing data cannot fail the site.

## Content Authoring

### US-010: Maintain content safely through repository files

**Persona**: P-02 Portfolio Owner

**Story**: As the portfolio owner, I want typed, validated, version-controlled content workflows so that I can replace demonstrations and publish genuine work without maintaining a database or changing page components.

**Value**: Keeps ongoing ownership portable, predictable, and low cost.

**Requirements**: FR-033 through FR-037A; NFR-015 through NFR-017; AC-006 through AC-008, AC-014

#### Acceptance criteria

**Scenario: Add valid content**

- Given I create a record that satisfies its project, post, or reading schema
- When the content loaders run
- Then typed data is returned in deterministic order and the applicable route can render it

**Scenario: Keep a draft private**

- Given I mark a content record as a draft
- When I run a production build
- Then it is excluded from public indexes and static detail routes

**Scenario: Replace demonstration content**

- Given three demonstration projects and three demonstration posts are present
- When I follow the authoring instructions
- Then I can identify, edit, unpublish, or remove each demo without changing presentation components

**Scenario: Reject invalid content**

- Given a record violates its schema
- When validation runs
- Then it reports the file and invalid field and does not silently publish malformed content

#### Quality checklist

- [ ] Pages CMS supports the same collections but is not a runtime dependency.
- [ ] Test fixtures are separate from production demonstration and genuine content.
- [ ] Authoring guidance covers drafting, validation, publication, demo replacement, and public documents.

## Metadata and Discovery

### US-011: Understand and share any public route

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want meaningful page metadata and stable discovery files so that browser tabs, search systems, and shared links describe the page accurately.

**Value**: Makes static content discoverable and understandable outside the visual page itself.

**Requirements**: FR-042 through FR-045; NFR-006, NFR-012; AC-001, AC-002

#### Acceptance criteria

**Scenario: Open an index or detail page**

- Given I visit a generated public route
- When the document metadata is inspected
- Then it contains an appropriate title and description derived from site or content data

**Scenario: Share a page without custom artwork**

- Given a page lacks a specific social image
- When its Open Graph metadata is generated
- Then it uses a local default asset rather than an external placeholder service

#### Quality checklist

- [ ] Static output includes a sitemap and robots directives.
- [ ] Canonical URL generation remains configurable until the production hostname is approved.
- [ ] Draft and nonexistent routes do not appear in discovery output.

## Cross-Cutting Visual Quality

### US-012: Experience a deliberate editorial design

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor, I want the interface to feel intentionally designed and specific to this portfolio so that presentation reinforces credibility rather than resembling a generic generated template.

**Value**: Directly enforces the user's visual direction and anti-slop quality bar.

**Requirements**: UI-001 through UI-014; FR-008, FR-010, FR-045; AC-010, AC-011

#### Acceptance criteria

**Scenario: View the site at desktop and mobile widths**

- Given the editorial engineering theme is active
- When I move among representative routes
- Then I see a warm off-white canvas, near-black typography, a restrained rust or vermilion accent, expressive hierarchy, intentional asymmetry, and coherent responsive composition

**Scenario: Interact with a memorable control**

- Given motion is allowed
- When I press the designated interactive control
- Then it provides a purposeful subtle response such as a two-pixel movement without delaying or obscuring the action

#### Quality checklist

- [ ] No prohibited indigo or violet value serves as the accent.
- [ ] No prohibited two-stop hero gradient is present.
- [ ] Emoji are not used as feature or control icons; necessary icons are monoline SVG using `currentColor`.
- [ ] Display heading tokens are applied consistently.
- [ ] No rounded card uses a colored left-border accent.
- [ ] There are no decorative blob or wave backgrounds.
- [ ] The accent has no more than two conspicuous uses in a typical viewport.
- [ ] Copy contains no lorem ipsum, generic feature numbering, invented metrics, or unlabelled fictional work.
- [ ] Major sections use stable `data-od-id` attributes.
- [ ] One polished light mode ships, with future-ready color tokens.

## Cross-Cutting Accessibility

### US-013: Use the complete portfolio accessibly

**Persona**: P-01 Portfolio Visitor

**Story**: As a portfolio visitor using any supported input method or motion preference, I want equivalent access to content and controls so that I can understand and operate the site without avoidable barriers.

**Value**: Makes the full portfolio usable rather than treating accessibility as isolated polish.

**Requirements**: NFR-001 through NFR-005; FR-002, FR-017, FR-028; UI-010 through UI-012; AC-009

#### Acceptance criteria

**Scenario: Complete representative journeys by keyboard**

- Given I do not use a pointing device
- When I navigate the shell, filters, links, articles, and any media controls
- Then every action is reachable in logical order, focus is visible, and no keyboard trap occurs

**Scenario: Request reduced motion**

- Given my system requests reduced motion
- When I browse pages containing transitions or media
- Then nonessential animation and autoplay are disabled without hiding content or state changes

**Scenario: Interpret status without color**

- Given a project, reading item, demo, pending destination, or disabled state is shown
- When I inspect it without relying on color
- Then visible text or another non-color cue communicates the meaning

#### Quality checklist

- [ ] Semantic landmarks and a logical heading hierarchy are present.
- [ ] Text, controls, focus, and meaningful states meet accepted AA contrast thresholds.
- [ ] Images have appropriate alternative text and contextual media has captions.
- [ ] Videos are muted by default and never create surprise audio.
- [ ] Representative routes pass automated checks and documented manual keyboard review.

## Static Build, Security, and Delivery

### US-014: Build and prepare the portfolio safely at zero mandatory cost

**Persona**: P-02 Portfolio Owner

**Story**: As the portfolio owner, I want a repeatable, secure, portable static build that works with user-space tooling so that I can verify the site locally and later deploy it without a database, server, or mandatory recurring fee.

**Value**: Delivers the core architectural promise while preserving control over external publication.

**Requirements**: NFR-006 through NFR-022; FR-032, FR-040, FR-041; AC-001, AC-007, AC-012 through AC-014

#### Acceptance criteria

**Scenario: Produce the static site locally**

- Given supported Node.js and npm are available without administrator privileges
- When I run the documented install and production build commands
- Then a complete static artifact is produced without a database or runtime application server

**Scenario: Run quality checks**

- Given dependencies are installed from the lockfile
- When formatting, linting, type checking, targeted tests, and the static build run
- Then every required check succeeds or reports an actionable failure

**Scenario: Keep external changes under owner control**

- Given local construction is complete but no deployment approval has been given
- When the workflow reaches deployment preparation
- Then no external account is connected and no production site, secret, or canonical hostname is created automatically

#### Quality checklist

- [ ] Browser bundles and static output contain no tokens, API keys, or private documents.
- [ ] External content cannot enable arbitrary script execution.
- [ ] A lockfile pins dependencies and available dependency audits are documented.
- [ ] Empty collections, missing optional media, and absent contribution data do not break builds or pages.
- [ ] Responsive media, lazy loading, poster assets, and build-time highlighting support the performance target.
- [ ] Representative pages target Lighthouse scores near or above 90, with useful-media exceptions documented.
- [ ] The output is suitable for Cloudflare Pages Free and portable to another static host.
- [ ] No user accounts, contact backend, analytics tracker, or mandatory paid service is introduced.

## Requirements-to-Story Coverage

| Requirement group | Covering stories |
|---|---|
| FR-001, FR-002, FR-006 | US-001 |
| FR-003 through FR-005 | US-001, US-009 |
| FR-007 through FR-010 | US-002, US-012 |
| FR-011 through FR-013, FR-015, FR-016 | US-003 |
| FR-014, FR-017 | US-004 |
| FR-018, FR-019, FR-021 | US-005 |
| FR-020, FR-022 | US-006 |
| FR-023 through FR-028 | US-007 |
| FR-029 through FR-032 | US-008, US-014 |
| FR-033 through FR-037A | US-003, US-005, US-010 |
| FR-038 through FR-041 | US-009, US-014 |
| FR-042 through FR-045 | US-011, US-012 |
| UI-001 through UI-014 | US-002, US-003, US-012, US-013 |
| NFR-001 through NFR-005 | US-001, US-004, US-006, US-013 |
| NFR-006 through NFR-009 | US-004, US-006, US-011, US-014 |
| NFR-010 through NFR-014 | US-007 through US-009, US-011, US-014 |
| NFR-015 through NFR-019 | US-002, US-006, US-007, US-009, US-010, US-014 |
| NFR-020 through NFR-022 | US-014 |
| AC-001 through AC-014 | US-001 through US-014, as referenced within each story |

All functional, visual, non-functional, and acceptance requirements have at least one covering story.

## INVEST Review

| Story | Independent | Negotiable | Valuable | Estimable | Small | Testable |
|---|---|---|---|---|---|---|
| US-001 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-002 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-003 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-004 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-005 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-006 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-007 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-008 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-009 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-010 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-011 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-012 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-013 | Yes | Yes | Yes | Yes | Yes | Yes |
| US-014 | Yes | Yes | Yes | Yes | Yes | Yes |

### Review notes

- Each story produces a distinct user-observable outcome and can be accepted independently, although implementation ordering may reflect shared foundations.
- Statements describe user value and remain negotiable about internal implementation where requirements do not constrain it.
- Medium granularity keeps route-level behavior cohesive without collapsing the entire portfolio into epics.
- Every story has observable scenarios and static-quality checks.
- No story invents owner identity, professional claims, outcomes, metrics, or genuine portfolio content.

## Extension Compliance

- **Resiliency Baseline**: Disabled; not applicable to story generation.
- **Security Baseline**: Disabled; not applicable as an extension. Core security and privacy requirements remain covered by US-008, US-009, and US-014.
- **Property-Based Testing**: Disabled; not applicable as an extension. Testable acceptance behavior remains defined for every story.

No enabled extension has an unresolved blocking finding.
