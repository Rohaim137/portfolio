# Portfolio Personas

## Persona P-01: Portfolio Visitor

### Profile

The Portfolio Visitor represents prospective employers, collaborators, technical peers, and readers who arrive with limited context. Some visitors are evaluating professional fit; others are interested in technical work or writing. The persona deliberately combines these audiences because they share the same public navigation and content-discovery experience.

### Goals

- Understand what the portfolio contains within the first screen and first navigation choices.
- Evaluate projects through concise summaries, technical decisions, media, and honest status labels.
- Find and read technical writing without visual or navigational friction.
- Explore reading and research interests when genuine records are available.
- Access deliberately public documents when provided.
- Reach the verified GitHub profile and recognize which other contact destinations are not yet available.

### Motivations

- Quickly determine relevance before investing time in detailed pages.
- Distinguish genuine owner work from demonstration content.
- Assess technical thinking through clarity, trade-offs, and evidence rather than inflated claims.
- Use the site comfortably across device sizes and input methods.

### Needs

- Clear information architecture and current-route feedback
- Honest `Demo`, status, draft, pending-link, and empty-state communication
- Readable long-form content and accessible media
- Fast static pages with stable URLs and useful metadata
- Keyboard operation, visible focus, sufficient contrast, and reduced-motion support

### Constraints and frustrations

- May browse on a narrow screen, slow connection, or keyboard-only setup.
- Has no patience for template filler, fake metrics, misleading links, or unexplained animation.
- Cannot infer meaning from color alone.
- May enter through a detail page rather than the home page.

### Primary journeys

1. Land on the overview, understand the available areas, and choose a relevant path.
2. Browse and filter demonstration or genuine projects, then inspect a case study.
3. Browse demonstration or genuine writing, then read an article.
4. Inspect reading or document availability without encountering broken controls.
5. Follow the working GitHub profile link or recognize that another social destination is pending.

### Relevant stories

US-001 through US-009, US-011 through US-013, and the visitor-facing outcomes of US-014.

## Persona P-02: Portfolio Owner

### Profile

The Portfolio Owner maintains identity configuration, social destinations, projects, posts, reading items, and public document records through version-controlled files. The owner may edit locally, in GitHub, or through Pages CMS and wants publication to remain understandable without operating a database or custom admin service.

### Goals

- Replace demonstration entries with genuine work without redesigning pages.
- Draft, validate, preview, and publish content safely.
- Add real social destinations and public documents through explicit configuration.
- Keep private material, secrets, and drafts out of production output.
- Build and verify the complete static site without administrator privileges or recurring service costs.
- Prepare deployment only after explicitly choosing to connect external services.

### Motivations

- Maintain professional credibility through accurate content and clear presentation.
- Own portable content in the repository rather than a proprietary database.
- Make routine content changes with predictable build-time feedback.
- Keep operating cost and maintenance burden low.

### Needs

- Typed content schemas with actionable errors
- Deterministic ordering and draft filtering
- Clear authoring and replacement instructions for demonstration content
- Optional Pages CMS configuration that does not become a runtime dependency
- Repeatable formatting, linting, type checking, testing, and static build commands
- Explicit boundaries around public files, credentials, canonical URLs, and deployment

### Constraints and frustrations

- Personal profile copy, several social URLs, reading records, and public documents are not yet supplied.
- System Git may be unavailable locally, while Node.js and npm are available in user space.
- A contribution heatmap cannot be supported safely until authenticated build-time automation is configured.
- A static host and custom domain are not connected during local construction.

### Primary journeys

1. Edit typed configuration and replace a pending social destination with a valid one.
2. Create, preview, validate, draft, publish, or remove a project, post, or reading item.
3. Replace demonstration entries while preserving the established design.
4. Deliberately add a safe public document and expose its view or download action.
5. Run all local quality checks and produce a portable static export.
6. Later authorize deployment or GitHub contribution automation as a separate operation.

### Relevant stories

US-003 through US-011 and US-014.

## Persona-to-Story Coverage

| Story | Portfolio Visitor | Portfolio Owner |
|---|---|---|
| US-001 Global navigation and shell | Primary | Secondary |
| US-002 Portfolio overview | Primary | Secondary |
| US-003 Project discovery | Primary | Secondary |
| US-004 Project case studies and media | Primary | Secondary |
| US-005 Writing discovery | Primary | Secondary |
| US-006 Article reading | Primary | Secondary |
| US-007 Reading and research | Primary | Secondary |
| US-008 Public documents | Primary | Secondary |
| US-009 GitHub and social destinations | Primary | Secondary |
| US-010 Content authoring and validation | Secondary | Primary |
| US-011 Metadata and discovery | Primary | Primary |
| US-012 Editorial visual quality | Primary | Secondary |
| US-013 Accessible responsive experience | Primary | Secondary |
| US-014 Safe static build and delivery | Secondary | Primary |

## Persona Validation

- Both personas have distinct goals, responsibilities, and success conditions.
- Every persona maps to multiple user stories; no persona is orphaned.
- The combined visitor persona retains employer, collaborator, peer, and reader motivations without inventing demographic attributes.
- Persona details describe product needs only and make no unsupported claims about the portfolio owner.
