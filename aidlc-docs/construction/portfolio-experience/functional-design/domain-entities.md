# Domain Entities and Presentation State - Portfolio Experience

## Boundary

Unit 2 consumes Unit 1 domain records and view models without redefining their source-of-truth content shapes. The entities below are presentation-only state or component contracts. They contain no file paths, service instances, credentials, or persistence behavior.

## Existing Unit 1 Inputs

- `HomePageViewModel`
- `ProjectsIndexViewModel`
- `BlogIndexViewModel`
- `ReadingIndexViewModel`
- `DocumentsViewModel`
- `ProjectSummary` and `ProjectDetail`
- `PostSummary` and `PostDetail`
- `ReadingSummary` and `ReadingDetail`
- `PublicDocument`
- `PublicProfile`
- `DestinationState`
- `ProjectMedia`

## Profile Presentation

```ts
type ProfilePresentation =
  | Readonly<{
      kind: "configured";
      name?: string;
      role?: string;
      introduction?: string;
      location?: string;
      focus?: string;
      biography?: string;
      skills: readonly string[];
      interests: readonly string[];
      timeline: readonly ProfileTimelineEntry[];
    }>
  | Readonly<{
      kind: "generic";
      heading: string;
      description: string;
    }>;
```

The `generic` variant contains site-state copy only. It is never written back into `PublicProfile` and cannot be interpreted as verified owner data.

## Demonstration Presentation

```ts
type ContentProvenance =
  | Readonly<{ kind: "owner" }>
  | Readonly<{
      kind: "demo";
      label: "Demo";
      disclosure: string;
    }>;
```

`ContentProvenance` is derived from the existing `demo` Boolean. It gives shared components one exhaustive rendering contract while preserving Unit 1 as the publication-state owner.

## Project Filter State

```ts
type ProjectFilterSelection = Readonly<{
  projectType?: string;
  technology?: string;
}>;

type ProjectFilterState = Readonly<{
  selection: ProjectFilterSelection;
  totalCount: number;
  visibleCount: number;
  hasAnyFilter: boolean;
}>;
```

### Invariants

- Each category contains zero or one selected value.
- Selected values must exist in the supplied filter options.
- `visibleCount` is between zero and `totalCount`.
- Two selected categories use intersection semantics.
- State is ephemeral and page-local.

## Narrow Navigation State

```ts
type NavigationMenuState = "closed" | "open";

type NavigationInteraction =
  | Readonly<{ type: "toggle" }>
  | Readonly<{ type: "escape" }>
  | Readonly<{ type: "route-selected" }>
  | Readonly<{ type: "desktop-layout-entered" }>;
```

Every interaction except `toggle` resolves to `closed`. `toggle` switches between `closed` and `open`.

## Media Lightbox State

```ts
type LightboxState =
  | Readonly<{ kind: "closed" }>
  | Readonly<{
      kind: "open";
      selectedIndex: number;
      triggerId: string;
    }>;

type LightboxAction =
  | Readonly<{ type: "open"; index: number; triggerId: string }>
  | Readonly<{ type: "close" }>
  | Readonly<{ type: "previous" }>
  | Readonly<{ type: "next" }>;
```

### Invariants

- Only image entries participate in modal indexing.
- `selectedIndex` always references an available image.
- Closing restores focus using `triggerId` and then discards modal state.
- With one image, previous and next controls are omitted.
- Inline media remains the non-modal fallback.

## Article Navigation State

```ts
type ArticleHeading = Readonly<{
  id: string;
  text: string;
  depth: 2 | 3;
}>;

type TableOfContentsState =
  | Readonly<{ kind: "hidden" }>
  | Readonly<{
      kind: "visible";
      headings: readonly ArticleHeading[];
    }>;
```

The visible variant requires both content opt-in and at least three meaningful headings.

## Collection Presentation State

```ts
type CollectionPresentation<T> =
  | Readonly<{ kind: "populated"; items: readonly T[] }>
  | Readonly<{
      kind: "empty";
      heading: string;
      description: string;
    }>;

type FilteredCollectionPresentation<T> =
  | CollectionPresentation<T>
  | Readonly<{
      kind: "no-filter-match";
      heading: string;
      description: string;
      resetLabel: string;
    }>;
```

`empty` describes absence of published owner content. `no-filter-match` describes a visitor-created view over an otherwise populated collection.

## Destination Presentation

```ts
type DestinationPresentation =
  | Readonly<{
      kind: "link";
      label: string;
      href: string;
      external: boolean;
    }>
  | Readonly<{
      kind: "pending";
      label: string;
      statusText: "link pending";
    }>;
```

The pending variant has no `href`, click handler, button role, or tab stop.

## About Availability

```ts
type AboutAvailability =
  | Readonly<{ kind: "configured"; profile: ProfilePresentation }>
  | Readonly<{
      kind: "not-configured";
      navigationEligible: false;
      heading: string;
      description: string;
    }>;
```

The configured state becomes navigation-eligible only through explicit site navigation configuration; Unit 2 does not silently mutate configuration.

## Demo Content Seeds

### Project subjects

| Subject | Neutral scope | Prohibited implication |
|---|---|---|
| Web experience | Responsive, accessible discovery interface | A real client, employer, usage count, or commercial result |
| Content system | Validated static publishing workflow | Owner authorship, production adoption, or measured efficiency gain |
| Data workflow | Deterministic transformation and review flow | Real customer data, live deployment, or performance claim |

### Article subjects

| Subject | Neutral scope | Voice constraint |
|---|---|---|
| Static architecture | Boundaries and trade-offs in static content systems | Educational and impersonal |
| Accessible interfaces | Keyboard, focus, status, and reduced-motion patterns | Educational and impersonal |
| Reliable content modeling | Schemas, drafts, provenance, and failure behavior | Educational and impersonal |

## Generic Copy Contract

Generic fallback strings must:

- State what is available now or what can be added later.
- Avoid first-person claims unless the user supplies that sentence.
- Avoid phrases such as `sample content`, `placeholder text`, generic feature numbering, invented quotes, and invented metrics.
- Be centralized so future owner copy can replace it without editing many components.
- Use truthful labels such as `Not published yet`, `Link pending`, or `Demo` where state must be explicit.

## Serialization and Safety

- All client-island props are JSON-serializable.
- No presentation entity contains raw MDX source, absolute paths, environment values, or authenticated data.
- External destinations originate from Unit 1 validation.
- Client state resets on navigation and is never used as a publication authority.

## Extension Compliance

- Resiliency Baseline: disabled; not applicable.
- Security Baseline: disabled; not applicable. Core serializable-boundary and truthful-link constraints remain included.
- Property-Based Testing: disabled; not applicable.

No enabled extension has an unresolved finding.
