# NFR Requirements Plan - Portfolio Experience

## Unit Context

- **Unit**: Unit 2 - Portfolio Experience
- **Prerequisite**: Unit 2 Functional Design approved
- **Existing stack**: Next.js, React, TypeScript, Tailwind CSS, Vitest, static export, and Unit 1 content services
- **NFR scope**: Accessibility, responsiveness, performance, progressive enhancement, static availability, privacy, security, maintainability, compatibility, and presentation testing

## Planning Checklist

- [x] Read the approved Unit 2 Functional Design artifacts.
- [x] Read project-wide NFRs and acceptance criteria.
- [x] Inspect the pinned Unit 1 toolchain and static-export configuration.
- [x] Assess scalability, performance, availability, security, reliability, maintainability, usability, and technology needs.
- [x] Generate questions for remaining NFR choices.
- [x] Apply the user's delegated decision authority and validate all answers.
- [x] Generate measurable Unit 2 NFR requirements.
- [x] Generate Unit 2 technology decisions.
- [x] Validate Markdown, traceability, and extension status.
- [x] Obtain explicit approval of Unit 2 NFR Requirements.

## Question 1

What content scale should the visitor interface support without redesign?

A) Preserve Unit 1's verified envelope of 250 projects, 250 posts, 250 reading records, and 1,000 media references while keeping the initial public set intentionally small (recommended)

B) Optimize only for the initial three projects and three posts

C) Introduce pagination and virtualization now for substantially larger collections

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2

What user-perceived performance target should representative production routes use?

A) Target Core Web Vitals good thresholds and Lighthouse category scores near or above 90, with documented media exceptions (recommended)

B) Require only successful static generation with no numeric browser performance targets

C) Require perfect Lighthouse scores of 100 in every category on every route

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3

How tightly should Unit 2 constrain client-side JavaScript?

A) Keep route content server-rendered and permit client code only for navigation, filters, and the lightbox, with each feature isolated and measured during production build review (recommended)

B) Use client components broadly for simpler implementation

C) Eliminate all client JavaScript, including filters and lightbox enhancement

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4

Which accessibility baseline should Unit 2 design and test against?

A) WCAG 2.2 Level AA behaviors for representative routes, including keyboard, focus, semantics, status, contrast, and reduced motion (recommended)

B) Automated accessibility scanning only, without manual interaction criteria

C) Basic semantic HTML without a named conformance target

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5

What browser compatibility baseline should the static interface use?

A) Current and previous major versions of Chrome, Edge, Firefox, and Safari, including current mobile Safari and Chrome, with progressive enhancement fallbacks (recommended)

B) Chromium desktop browsers only

C) Include legacy Internet Explorer compatibility

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6

What availability behavior should apply when JavaScript or optional data is unavailable?

A) All content and navigation remain usable as static HTML; only menu convenience, filtering, and modal enlargement may degrade, while inline fallbacks remain available (recommended)

B) Require JavaScript for all route interaction and content visibility

C) Show a generic failure screen when optional data is absent

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7

What privacy and browser-storage policy should Unit 2 use?

A) No analytics, cookies, tracking, local storage, user accounts, or visitor-submitted data; keep all interaction state in memory (recommended)

B) Add anonymous analytics and consent handling now

C) Persist interface preferences and filter state in browser storage

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8

What testing approach should cover Unit 2 presentation behavior?

A) Keep Vitest and add focused DOM component testing with Testing Library, user-event simulation, and compatible automated accessibility checks; defer full cross-browser journeys to Unit 3 (recommended)

B) Test only pure helper functions in Unit 2

C) Add a full browser automation suite in Unit 2 and duplicate it in Unit 3

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9

How should typography and demo visuals avoid external runtime dependencies?

A) Use a deliberate system serif display stack, system sans body stack, and local SVG demo art with no runtime font or image request (recommended)

B) Fetch fonts and placeholder imagery from external CDNs at runtime

C) Bundle a new font family and photographic demo library before layout implementation

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10

What quality gate should Unit 2 require before code completion?

A) Formatting, zero-warning lint, strict type checking, targeted interaction tests, accessibility assertions, coverage thresholds for Unit 2 logic, and a full static production build (recommended)

B) Type checking and production build only

C) Manual browser inspection only

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Decision Record

The user previously delegated Unit 2 questions to the assistant and then approved continuation. Option A was selected for all ten questions because it preserves the approved static, accessible, private, zero-runtime-service architecture without expanding Unit 2 into deployment work.

## Outputs

- `aidlc-docs/construction/portfolio-experience/nfr-requirements/nfr-requirements.md`
- `aidlc-docs/construction/portfolio-experience/nfr-requirements/tech-stack-decisions.md`

## Validation Notes

- All questions include meaningful alternatives and a final Other option.
- All answer tags contain valid selections with no contradiction.
- No Mermaid or ASCII diagram is present.
- Optional extensions remain disabled and are not applicable.
