# Application Services

## Service Style

Services are build-time modules, not network services or long-running processes. They encapsulate file access, validation, content transformation, and route view-model creation so feature components remain deterministic and presentational.

## SiteConfigService

**Responsibilities**:

- Load typed site identity, navigation, social, canonical, and metadata configuration.
- Convert absent LinkedIn, X, and email values into pending destination states.
- Enforce the verified GitHub destination.

**Consumers**: Root layout, home query, footer, metadata service.

**Does not**: Read page content or connect external accounts.

## FileContentSource

**Responsibilities**:

- Locate files only within configured content collection roots.
- Read source text and return file context for errors.
- Normalize slugs and reject traversal outside collection roots.

**Consumers**: Project, blog, and reading repositories.

**Does not**: Interpret front matter or decide publication visibility.

## SchemaValidationService

**Responsibilities**:

- Validate project, post, reading, document, and site configuration records.
- Produce actionable file and field errors.
- Preserve explicit optional fields rather than inventing values.

**Consumers**: All content repositories and site configuration.

**Does not**: Render UI or silently repair invalid required data.

## MdxCompilationService

**Responsibilities**:

- Compile approved Markdown or MDX at build time.
- Bind only the curated component map.
- Extract heading metadata and calculate reading time.
- Keep arbitrary runtime imports and scripts outside the authoring surface.

**Consumers**: Project, blog, and reading repositories.

## ProjectContentService

**Responsibilities**:

- Validate and compile project records.
- Exclude drafts from production listings and static slugs.
- Preserve explicit demo status.
- Sort and select featured records deterministically.
- Derive filter choices from published records.

**Consumers**: Home and project routes through `PortfolioQueryService`.

## BlogContentService

**Responsibilities**:

- Validate and compile post records.
- Exclude drafts from production.
- Sort posts in reverse publication order.
- Attach reading time and heading information.
- Preserve explicit demo status.

**Consumers**: Home and blog routes through `PortfolioQueryService`.

## ReadingContentService

**Responsibilities**:

- Validate reading records and legitimate source URLs.
- Exclude drafts and group published items by explicit status.
- Expose an internal note only when body content exists.

**Consumers**: Home and reading routes through `PortfolioQueryService`.

## DocumentService

**Responsibilities**:

- Load explicitly configured public document records.
- Validate metadata and confirm configured assets exist.
- Never treat unconfigured public files as publishable documents.

**Consumers**: Home and documents routes through `PortfolioQueryService`.

## PortfolioQueryService

**Responsibilities**:

- Orchestrate site configuration and content services for each index page.
- Produce serializable route-specific view models.
- Apply list limits for featured projects and latest posts.
- Preserve typed empty collections for truthful empty states.

**Interactions**:

1. A static route requests a view model.
2. The query service invokes only the content services needed for that route.
3. Services read, validate, filter, sort, and optionally compile content.
4. The query service returns presentation-ready typed data.
5. Route and feature components render without direct file-system access.

## MetadataService

**Responsibilities**:

- Generate route titles, descriptions, Open Graph data, sitemap entries, and robots directives.
- Use local route-specific media or a local default social asset.
- Exclude drafts and unavailable detail routes.
- Emit canonicals only after a valid site URL is configured.

**Consumers**: Route metadata functions and static discovery routes.

## ContributionDataSource

**V1 state**: Dormant boundary.

**Responsibilities when later enabled**:

- Read generated static contribution data.
- Validate its username, timestamp, weeks, and days.
- Return `null` when data is unavailable.

**Constraint**: Authenticated GitHub collection belongs to CI or build scripting and never to browser components. No heatmap renders in V1.

## Service Orchestration by Route

| Route | Primary services |
|---|---|
| `/` | SiteConfigService, PortfolioQueryService, ProjectContentService, BlogContentService, ReadingContentService, DocumentService |
| `/projects` | PortfolioQueryService, ProjectContentService, MetadataService |
| `/projects/[slug]` | ProjectContentService, MdxCompilationService, MetadataService |
| `/blog` | PortfolioQueryService, BlogContentService, MetadataService |
| `/blog/[slug]` | BlogContentService, MdxCompilationService, MetadataService |
| `/reading` | PortfolioQueryService, ReadingContentService, MetadataService |
| `/reading/[slug]` | ReadingContentService, MdxCompilationService, MetadataService |
| `/docs` | PortfolioQueryService, DocumentService, MetadataService |
| `/about` | SiteConfigService, MetadataService |
| `sitemap.xml` | MetadataService and published-slug queries |
| `robots.txt` | MetadataService and SiteConfigService |

## Dependency Injection and Composition

- Server/build modules instantiate concrete repositories from configured collection roots.
- Services receive sources, validators, and compilers through module construction rather than importing UI code.
- Tests substitute in-memory sources and deterministic fixtures.
- Route modules import composed service instances from a server-only composition root.
- Client islands receive serializable results, never service instances.

## Failure and Recovery

- Required-data validation failures stop the affected build with actionable context.
- Missing optional data yields typed absence and designed presentation states.
- Missing slugs resolve to not found.
- Missing future contribution data does not stop the build.
- No service mutates source content during an ordinary site build.

## Security and Privacy Boundaries

- File paths remain constrained to known content and public-document roots.
- MDX uses a curated component map and no untrusted runtime evaluation.
- Secrets may be consumed only by separately enabled CI or build scripts.
- Public document presentation requires explicit configuration.
- External deployment and account connections remain outside application services.

## Extension Compliance

All optional extensions are disabled. Extension-specific service requirements are not applicable; the approved core boundaries above still enforce content safety and static operation.
