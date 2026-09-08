# Unit of Work Story Map

## Primary Story Assignment

Every approved story has exactly one primary unit owner.

| Story | Summary | Primary unit | Supporting unit |
|---|---|---|---|
| US-001 | Navigate the portfolio confidently | Unit 2: Portfolio Experience | Unit 1 provides route and configuration foundations |
| US-002 | Understand the portfolio at a glance | Unit 2: Portfolio Experience | Unit 1 provides the home view model |
| US-003 | Discover and filter projects honestly | Unit 2: Portfolio Experience | Unit 1 provides project records and filter inputs |
| US-004 | Evaluate a project case study and its media | Unit 2: Portfolio Experience | Unit 1 compiles project content |
| US-005 | Discover technical writing | Unit 2: Portfolio Experience | Unit 1 provides ordered post summaries |
| US-006 | Read a well-structured article | Unit 2: Portfolio Experience | Unit 1 compiles curated MDX and headings |
| US-007 | Explore reading activity when available | Unit 2: Portfolio Experience | Unit 1 provides grouped records and empty collections |
| US-008 | Access only deliberate public documents | Unit 2: Portfolio Experience | Unit 1 validates explicit document configuration; Unit 3 verifies artifact safety |
| US-009 | Reach verified destinations without misleading links | Unit 2: Portfolio Experience | Unit 1 supplies exhaustive destination states |
| US-010 | Maintain content safely through repository files | Unit 1: Content and Application Foundation | Unit 3 completes CMS and authoring documentation |
| US-011 | Understand and share any public route | Unit 1: Content and Application Foundation | Unit 2 supplies route-specific presentation assets; Unit 3 verifies output |
| US-012 | Experience a deliberate editorial design | Unit 2: Portfolio Experience | Unit 3 automates detectable anti-slop checks |
| US-013 | Use the complete portfolio accessibly | Unit 2: Portfolio Experience | Unit 3 integrates automated quality checks |
| US-014 | Build and prepare the portfolio safely at zero mandatory cost | Unit 3: Quality, Authoring, and Delivery Preparation | Units 1 and 2 provide the integrated static application |

## Unit 1 Story Slice

### Primary value

- US-010 establishes safe owner-controlled content maintenance.
- US-011 establishes metadata and static discovery foundations.

### Supporting capabilities

- US-002: home view model
- US-003 and US-004: project schemas, services, and compilation
- US-005 and US-006: blog schemas, ordering, reading time, and compilation
- US-007: reading validation, grouping, and optional notes
- US-008: explicit document records and asset verification
- US-009: social destination and contribution-data contracts
- US-014: static export and quality command foundation

### Acceptance focus

- Valid, invalid, draft, demo, empty, missing, and published data states
- Deterministic lists and static slugs
- Safe content roots and curated MDX
- Route metadata, sitemap, robots, and configurable canonicals

## Unit 2 Story Slice

### Primary value

- US-001 through US-009 deliver the full visitor route set and content journeys.
- US-012 and US-013 deliver the editorial visual system and accessible experience.

### Supporting capabilities

- US-010: clear UI treatment for replaceable demos and owner-managed states
- US-011: route-specific metadata inputs and local visual assets
- US-014: responsive, performant presentation suitable for static delivery

### Acceptance focus

- Navigation and overview comprehension
- Project filtering, case studies, and accessible media
- Blog discovery and article reading
- Honest reading and document empty states
- Working GitHub and pending social destinations
- Demo disclosure, keyboard behavior, focus, contrast, reduced motion, and anti-slop quality

## Unit 3 Story Slice

### Primary value

- US-014 delivers repeatable quality, authoring, CI, artifact, and host preparation.

### Supporting capabilities

- US-001 through US-009: integrated route, link, content-state, and media verification
- US-010: Pages CMS configuration and authoring instructions
- US-011: metadata and static artifact verification
- US-012: automated detectable anti-slop checks
- US-013: integrated accessibility checks and manual review instructions

### Acceptance focus

- Clean user-space installation and build
- Consistent local and CI commands
- Complete authoring and demo-replacement guidance
- Secret and public-document safety
- Static output portability and zero mandatory runtime cost
- No external deployment without separate approval

## Persona Coverage by Unit

| Persona | Unit 1 | Unit 2 | Unit 3 |
|---|---|---|---|
| P-01 Portfolio Visitor | Indirect data and metadata foundation | Primary visitor experience | Integrated quality assurance |
| P-02 Portfolio Owner | Primary content-maintenance foundation | Secondary preview and presentation | Primary authoring and delivery preparation |

## Application Design Coverage

| Application Design area | Owning unit |
|---|---|
| Route scaffolding and static generation contracts | Unit 1 |
| Site configuration and social destination types | Unit 1 |
| Content sources, schemas, services, MDX, and query facade | Unit 1 |
| Metadata and discovery services | Unit 1 |
| Route composition and feature components | Unit 2 |
| Shared UI, layout, demo, status, pending, and empty states | Unit 2 |
| Navigation, filters, gallery, and lightbox client islands | Unit 2 |
| Editorial design system and accessibility behavior | Unit 2 |
| Pages CMS and authoring documentation | Unit 3 |
| CI, integrated tests, artifact inspection, and host preparation | Unit 3 |
| Future GitHub automation documentation | Unit 3, consuming Unit 1's dormant contract |

## Coverage Validation

- All fourteen stories have exactly one primary unit.
- Both personas receive value in all three units and have a clear primary interaction boundary.
- Every Application Design component and service category has an owning unit.
- Cross-unit support is explicit and does not transfer primary story accountability.
- No story requires an independent deployment or runtime service.

## Extension Compliance

All optional extensions are disabled. Extension-specific story-to-unit mappings are not applicable; approved core NFR stories remain assigned.
