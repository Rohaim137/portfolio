# Functional Design Plan - Portfolio Experience

## Unit Context

- **Unit**: Unit 2 - Portfolio Experience
- **Primary stories**: US-001 through US-009, US-012, and US-013
- **Supporting stories**: US-010, US-011, and US-014
- **Dependency**: Approved Unit 1 content, query, metadata, and destination contracts
- **Scope**: Visitor-facing route composition, shared presentation behavior, project filtering, accessible media, blog reading, truthful empty states, social destinations, responsive navigation, and editorial interaction rules
- **Explicit exclusions**: Content parsing internals, CMS setup, CI, hosting configuration, authenticated GitHub fetching, and deployment

## Planning Checklist

- [x] Read the Unit 2 definition and boundaries.
- [x] Read the Unit 2 story slice and acceptance criteria.
- [x] Read the approved application components, service boundaries, and interaction design.
- [x] Read the visual, accessibility, content-state, and anti-slop requirements.
- [x] Confirm that Unit 1 supplies the required typed contracts and services.
- [x] Identify remaining functional ambiguities that affect route and component behavior.
- [x] Create context-specific questions with valid answer options.
- [x] Validate this Markdown file for headings, lists, answer tags, and CommonMark spacing.
- [x] Collect answers for every question.
- [x] Check all answers for ambiguity or contradiction.
- [x] Generate the Unit 2 business logic model.
- [x] Generate the Unit 2 business rules.
- [x] Generate the Unit 2 domain entity and presentation-state definitions.
- [x] Generate the Unit 2 frontend component design.
- [x] Validate all generated artifacts and update stage tracking.
- [x] Obtain explicit approval of the completed Functional Design.

## Question 1

How should the home-page introduction handle the absence of verified personal biography and career details?

A) Use the verified name or GitHub identity only, with concise neutral copy about the site's sections and no personal claims (recommended)

B) Use only the portfolio title and navigation, with no introductory prose until personal copy is supplied

C) Pause the introduction design until owner-written biography and positioning copy are supplied

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2

What subject mix should the three clearly labelled demonstration projects use?

A) Three varied, product-neutral technical case studies covering a web experience, a content system, and a data workflow, with no owner attribution or invented results (recommended)

B) Three frontend-focused interface demonstrations emphasizing responsive layout, accessibility, and interaction patterns

C) Use project topics and outlines supplied by the owner before implementation

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3

What subject mix should the three clearly labelled demonstration blog posts use?

A) Standalone educational articles on static architecture, accessible interfaces, and reliable content modeling, written in an impersonal editorial voice (recommended)

B) Companion articles that explain the architecture and decisions behind the three demonstration projects

C) Use article topics and outlines supplied by the owner before implementation

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4

How should project filtering behave?

A) Allow one project-type selection and one technology selection at the same time, combine them with AND logic, keep state local to the page, and provide a clear reset (recommended)

B) Allow only one active filter across all categories at a time and keep state local to the page

C) Allow type and technology selections together and persist them in URL query parameters for shareable filtered views

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5

How should primary navigation behave on narrow screens?

A) Use an accessible disclosure button that opens a vertical menu, closes on Escape or route selection, and returns focus predictably (recommended)

B) Keep all navigation links visible and allow them to wrap into multiple lines without a menu control

C) Present the links in a horizontally scrollable navigation rail with no disclosure state

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6

Which progressive gallery behavior should project detail pages use?

A) Keep all media usable inline, open images in an accessible modal lightbox, leave video inline, and support Escape plus previous and next keys with focus restoration (recommended)

B) Open both images and video in the same accessible modal lightbox with equivalent keyboard controls

C) Keep all media inline and omit modal enlargement from V1

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7

When should a blog article render its table of contents?

A) Require the content opt-in flag and at least three meaningful level-two or level-three headings (recommended)

B) Require the content opt-in flag and at least two meaningful headings

C) Render it whenever the content opt-in flag is true, even for a single heading

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8

How should the optional About route behave before genuine biography content is available?

A) Implement the route structure but omit it from primary navigation and show only a concise truthful unavailable state until profile content exists (recommended)

B) Omit the About route entirely until genuine profile content is supplied

C) Include About in primary navigation and render a fuller explanation that personal details are pending

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9

Which interaction should carry the site's single memorable but restrained motion detail?

A) Give primary action links and buttons a two-pixel pressed response, removed under reduced motion (recommended)

B) Use a short underline movement on the active navigation item and remove it under reduced motion

C) Use a restrained project-media expansion transition and remove it under reduced motion

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10

What visual source should the demonstration project covers use before genuine project media exists?

A) Use three local, purpose-designed abstract SVG diagrams that are visually distinct and contain no fabricated product screenshots (recommended)

B) Use CSS-only editorial compositions with typography and rules instead of image assets

C) Wait for owner-supplied images before implementing project cards and detail layouts

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Planned Functional Design Outputs

- `aidlc-docs/construction/portfolio-experience/functional-design/business-logic-model.md`
- `aidlc-docs/construction/portfolio-experience/functional-design/business-rules.md`
- `aidlc-docs/construction/portfolio-experience/functional-design/domain-entities.md`
- `aidlc-docs/construction/portfolio-experience/functional-design/frontend-components.md`

## Decision Record

The user delegated all plan answers to the assistant and required generic, replaceable information wherever verified personal information is unavailable. Option A was selected for Questions 1 through 10 because each recommended choice satisfies the approved requirements while preserving a direct replacement path for genuine owner content.

## Answer Analysis

- The user delegated all design decisions and required generic, replaceable content wherever verified personal information is unavailable.
- Recommended option A was selected for Questions 1 through 10 because those options preserve the approved accessibility, static delivery, and anti-fabrication constraints.
- Generic personal-area copy describes only the current state of the site. It must never assert biography, employment, skill level, achievements, location, metrics, or opinions.
- Demonstration projects and articles are substantive design fixtures with explicit `demo: true` provenance and visible `Demo` disclosure. They are not owner claims and can be replaced independently through repository content.
- No answer is missing, contradictory, or ambiguous; no clarification file is required.

## Validation Notes

- No Mermaid or ASCII diagram is present.
- All questions use mutually exclusive meaningful options plus a final Other option.
- Each answer uses the required `[Answer]:` tag.
- Optional extensions remain disabled in `aidlc-state.md`; their rules are not applicable to this plan.
