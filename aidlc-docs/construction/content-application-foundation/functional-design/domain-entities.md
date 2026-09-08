# Domain Entities - Content and Application Foundation

## Entity Principles

- Source entities retain authored values and diagnostics context.
- Published entities are validated, normalized, immutable, and safe for build-time use.
- Summary and detail view models contain only what presentation needs.
- Draft and demo are independent state dimensions.
- Missing optional information remains explicit.

## Shared Value Objects

### Slug

- Lowercase kebab-case identifier
- Matches the source filename stem
- Unique within its collection
- Forms one static route segment

### CalendarDate

- Valid ISO `YYYY-MM-DD` value
- Represents an authored calendar day, not an instant
- Formats without server-timezone shifting

### ExternalWebUrl

- Absolute secure HTTP URL
- Parsed and protocol-validated without network access

### MailDestination

- Valid mail destination when email is eventually configured
- Remains absent until a genuine address is supplied

### ContentSource

- Workspace-relative source path
- Collection identifier
- Filename stem
- Raw front matter and optional body

### PublicationState

```ts
type PublicationState = {
  draft: boolean;
  demo: boolean;
};
```

## Project Entities

### ProjectRecord

Required attributes:

- title
- slug
- summary
- featured
- technologies
- cover media
- project status
- publication state

Optional attributes:

- project type
- authored dates
- repository URL
- live-demo URL
- gallery media
- architecture content
- technical decisions
- factual results
- retrospective
- compiled body

### ProjectSummary

Contains route slug, title, summary, featured, technology tags, status, cover, publication demo state, and only valid action URLs.

### ProjectDetail

Extends the summary with compiled case-study content, gallery media, heading outline, and optional factual sections.

### ProjectMedia

```ts
type ProjectMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      width: number;
      height: number;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      alt: string;
      caption?: string;
    };
```

## Blog Entities

### PostRecord

Required attributes:

- title
- slug
- description
- publication date
- publication state
- non-empty body

Optional attributes:

- tags
- cover media
- update date
- series
- table-of-contents preference

### PostSummary

Contains slug, title, description, publication date, reading time, tags, optional cover, and demo state.

### PostDetail

Extends the summary with compiled body, heading outline, update metadata, and optional series information.

## Reading Entities

### ReadingRecord

Required attributes:

- title
- slug
- reading status
- legitimate source URL
- topics
- draft state

Optional attributes:

- authors
- year
- venue
- start date
- completion date
- rating
- summary
- body notes

### ReadingSummary

Contains index metadata, textual status, external source, and an optional internal detail destination derived from eligible body content.

### ReadingDetail

Exists only for a published reading record with non-empty body content. Extends the summary with compiled notes and headings.

### ReadingGroups

```ts
type ReadingGroups = {
  queued: ReadingSummary[];
  reading: ReadingSummary[];
  completed: ReadingSummary[];
};
```

## Document Entities

### PublicDocument

Required attributes:

- title
- safe public-relative file path
- description

Optional attributes:

- update date
- category
- featured

The entity is valid for presentation only after the referenced asset exists.

## Site and Social Entities

### SiteConfig

Contains site title, default description, optional production origin, local default social image, navigation definitions, public profile, and social configuration.

### PublicProfile

Contains optional name, role, introduction, location, focus, biography, skills, interests, and timeline data. No field is synthesized when absent.

### DestinationState

```ts
type DestinationState =
  | {
      kind: "active";
      label: "GitHub" | "LinkedIn" | "X" | "Email";
      href: string;
    }
  | {
      kind: "pending";
      label: "LinkedIn" | "X" | "Email";
    };
```

GitHub is active in the initial configuration. Other destinations remain pending until valid values exist.

## Compiled Content Entities

### CompiledMdx

- Serialized or renderable build-time content
- Curated component names used
- Heading outline
- Derived reading time where applicable

### HeadingEntry

- depth
- visible text
- deterministic unique anchor

### ReadingTime

- positive display estimate derived from body content
- never treated as an owner achievement or metric

## Metadata Entities

### PageMetadataModel

- title
- description
- optional canonical URL
- local Open Graph image
- page type
- optional authored and updated dates

### PublishedRoute

- pathname
- optional last-modified calendar date
- source kind
- source slug when applicable

### SitemapEntry

- public location
- optional last-modified date

## Contribution Data Entities

### ContributionCalendarData

- username
- generation timestamp
- ordered weeks
- contribution days containing date, count, and level

The entity is optional, generated externally, read-only in Unit 1, and not exposed by V1 route models.

## Error Entities

### ContentError

```ts
type ContentError = {
  collection?: "site" | "projects" | "blog" | "reading" | "documents" | "generated";
  file: string;
  field?: string;
  code: string;
  message: string;
};
```

### ValidationReport

```ts
type ValidationReport = {
  errors: ContentError[];
};
```

An empty error array represents success. A non-empty report is blocking for the applicable validation operation.

## Relationships

- One site configuration contains one optional public profile and multiple exhaustive destination states.
- One collection contains zero or more records, each identified by a unique collection-local slug.
- One project contains one cover and zero or more gallery media items.
- One post contains one compiled body and zero or more tags and headings.
- One reading record has one external source and zero or one internal detail representation.
- One public-document manifest contains zero or more explicitly configured documents.
- One content record produces at most one summary and at most one public detail route.
- Many published records contribute to one route discovery set and one sitemap.

## Entity Invariants

- Draft entities never become production view models or public routes.
- Demo state is never dropped between record, summary, detail, and metadata transformations.
- A pending destination has no `href`.
- An active destination always has a validated `href`.
- A reading detail cannot exist without non-empty body content.
- A public document cannot become presentable before asset verification.
- Entity construction never performs network access.

## Extension Compliance

All optional extensions are disabled. Extension-specific entity requirements are not applicable; core typed-state and validation guarantees remain required.
