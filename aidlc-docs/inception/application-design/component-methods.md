# Component and Service Method Contracts

These signatures describe high-level TypeScript boundaries. Detailed algorithms and business rules are deferred to per-unit Functional Design.

## Core Types

```ts
type Slug = string;
type ISODate = string;
type ReadingStatus = "queued" | "reading" | "completed";
type ProjectStatus = "shipped" | "prototype" | "coursework" | "research" | "archived";
type DestinationState =
  | { kind: "active"; label: string; href: string }
  | { kind: "pending"; label: string };

type ContentVisibility = {
  draft: boolean;
  demo?: boolean;
};

type ContentError = {
  file: string;
  field?: string;
  message: string;
};
```

## Site Configuration

```ts
interface SiteConfigService {
  getSiteConfig(): SiteConfig;
  getPublicProfile(): PublicProfile;
  getSocialDestinations(): DestinationState[];
}

function resolveDestination(
  label: string,
  configuredValue?: string,
): DestinationState;
```

`resolveDestination` validates active URLs and otherwise returns a non-interactive pending state.

## Generic Content Repository

```ts
interface ContentRepository<TFrontmatter, TCompiled> {
  list(options?: ListOptions): Promise<TFrontmatter[]>;
  getBySlug(slug: Slug, options?: GetOptions): Promise<TCompiled | null>;
  getStaticSlugs(options?: StaticSlugOptions): Promise<Slug[]>;
}

type ListOptions = {
  includeDrafts?: boolean;
  includeDemo?: boolean;
};

type GetOptions = {
  includeDrafts?: boolean;
};

type StaticSlugOptions = {
  production: boolean;
};
```

Production callers never enable `includeDrafts`.

## Validation and MDX Compilation

```ts
interface ContentValidator<T> {
  parse(input: unknown, context: { file: string }): T;
  safeParse(input: unknown, context: { file: string }): ValidationResult<T>;
}

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: ContentError[] };

interface MdxCompiler {
  compile(source: string, options: MdxCompileOptions): Promise<CompiledMdx>;
  extractHeadings(source: string): HeadingEntry[];
  estimateReadingTime(source: string): ReadingTime;
}

type MdxCompileOptions = {
  contentKind: "project" | "post" | "reading";
  componentNames: readonly string[];
};
```

The compiler accepts only the curated component map and does not expose arbitrary runtime imports.

## Project Service

```ts
interface ProjectContentService {
  listPublishedProjects(): Promise<ProjectSummary[]>;
  listFeaturedProjects(limit?: number): Promise<ProjectSummary[]>;
  getProject(slug: Slug): Promise<ProjectDetail | null>;
  getProjectFilters(projects: ProjectSummary[]): ProjectFilterOptions;
  getStaticProjectSlugs(): Promise<Slug[]>;
}

function filterProjects(
  projects: readonly ProjectSummary[],
  filter: ProjectFilter,
): ProjectSummary[];
```

## Blog Service

```ts
interface BlogContentService {
  listPublishedPosts(): Promise<PostSummary[]>;
  listLatestPosts(limit?: number): Promise<PostSummary[]>;
  getPost(slug: Slug): Promise<PostDetail | null>;
  getStaticPostSlugs(): Promise<Slug[]>;
}
```

Post summaries include build-time reading time and explicit demo state.

## Reading Service

```ts
interface ReadingContentService {
  listPublishedReading(): Promise<ReadingSummary[]>;
  groupByStatus(items: readonly ReadingSummary[]): ReadingGroups;
  getReadingNote(slug: Slug): Promise<ReadingDetail | null>;
  getStaticReadingSlugs(): Promise<Slug[]>;
}
```

Only records with publishable body content expose an internal detail destination.

## Document Service

```ts
interface DocumentService {
  listPublicDocuments(): Promise<PublicDocument[]>;
  verifyConfiguredAssets(documents: readonly PublicDocument[]): Promise<AssetCheck[]>;
}

type AssetCheck = {
  file: string;
  exists: boolean;
};
```

The service reads explicit document configuration and never enumerates all public files for display.

## Portfolio Query Service

```ts
interface PortfolioQueryService {
  getHomePage(): Promise<HomePageViewModel>;
  getProjectsIndex(): Promise<ProjectsIndexViewModel>;
  getBlogIndex(): Promise<BlogIndexViewModel>;
  getReadingIndex(): Promise<ReadingIndexViewModel>;
  getDocumentsIndex(): Promise<DocumentsViewModel>;
}
```

This facade coordinates content services for route composition without becoming a runtime API.

## Metadata Service

```ts
interface MetadataService {
  forIndex(input: IndexMetadataInput): Metadata;
  forProject(project: ProjectDetail): Metadata;
  forPost(post: PostDetail): Metadata;
  forReading(item: ReadingDetail): Metadata;
  sitemap(routes: readonly PublishedRoute[]): SitemapEntry[];
  robots(config: SiteConfig): RobotsDefinition;
}
```

Canonical values are emitted only when `SiteConfig.siteUrl` is a valid configured URL.

## GitHub Boundary

```ts
interface ContributionDataSource {
  readGenerated(): Promise<ContributionCalendarData | null>;
}

type ContributionCalendarData = {
  username: string;
  generatedAt: ISODate;
  weeks: ContributionWeek[];
};
```

No V1 route invokes an authenticated or browser-time fetch. This interface exists for later build-time activation.

## Interactive Component Contracts

```ts
type PrimaryNavigationProps = {
  items: NavigationItem[];
  currentPath: string;
};

type ProjectFilterBarProps = {
  projects: ProjectSummary[];
  options: ProjectFilterOptions;
};

type ProjectGalleryProps = {
  items: ProjectMedia[];
  label: string;
};

type MediaLightboxProps = {
  items: ProjectMedia[];
  initialIndex: number;
  onClose(): void;
};

type SocialDestinationsProps = {
  destinations: DestinationState[];
};
```

Interactive props are serializable. Client components do not accept service objects, file paths, raw front matter, or secrets.

## Method Error Semantics

- Invalid required content raises a structured build-time error containing file and field context.
- A missing valid slug returns `null`, allowing the route to resolve to the not-found experience.
- Missing optional content returns explicit optional values or empty typed collections.
- Missing generated contribution data returns `null` and never fails an ordinary site build.
- Invalid configured public-document paths fail verification before publication.

## Extension Compliance

Optional extensions are disabled, so extension-specific method requirements are not applicable. Core validation and secret-boundary contracts remain mandatory.
