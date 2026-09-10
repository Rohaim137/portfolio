import type {
  DestinationState,
  HeadingEntry,
  ProfileTimelineEntry,
  ProjectFilter,
  PublicProfile,
} from "@/lib/content-application-foundation/domain";

export type ProfilePresentation =
  | Readonly<{
      kind: "configured";
      profile: PublicProfile;
    }>
  | Readonly<{
      kind: "generic";
      heading: string;
      description: string;
    }>;

export type ContentProvenance =
  | Readonly<{ kind: "owner" }>
  | Readonly<{
      kind: "demo";
      label: "Demo";
      disclosure: string;
    }>;

export type CollectionPresentation<T> =
  | Readonly<{ kind: "populated"; items: readonly T[] }>
  | Readonly<{
      kind: "empty";
      heading: string;
      description: string;
    }>;

export type FilteredCollectionPresentation<T> =
  | CollectionPresentation<T>
  | Readonly<{
      kind: "no-filter-match";
      heading: string;
      description: string;
      resetLabel: string;
    }>;

export type DestinationPresentation =
  | Readonly<{
      kind: "link";
      label: DestinationState["label"];
      href: string;
      external: true;
    }>
  | Readonly<{
      kind: "pending";
      label: DestinationState["label"];
      statusText: "link pending";
    }>;

export type ProjectFilterSelection = ProjectFilter;

export type ProjectFilterState = Readonly<{
  selection: ProjectFilterSelection;
  totalCount: number;
  visibleCount: number;
  hasAnyFilter: boolean;
}>;

export type NavigationMenuState = "closed" | "open";

export type NavigationInteraction =
  | Readonly<{ type: "toggle" }>
  | Readonly<{ type: "escape" }>
  | Readonly<{ type: "route-selected" }>
  | Readonly<{ type: "desktop-layout-entered" }>;

export type LightboxState =
  | Readonly<{ kind: "closed" }>
  | Readonly<{
      kind: "open";
      selectedIndex: number;
      triggerId: string;
    }>;

export type LightboxAction =
  | Readonly<{ type: "open"; index: number; triggerId: string }>
  | Readonly<{ type: "close" }>
  | Readonly<{ type: "previous" }>
  | Readonly<{ type: "next" }>;

export type TableOfContentsState =
  Readonly<{ kind: "hidden" }> | Readonly<{ kind: "visible"; headings: readonly HeadingEntry[] }>;

export type ConfiguredProfileSections = Readonly<{
  name?: string;
  role?: string;
  introduction?: string;
  location?: string;
  focus?: string;
  biography?: string;
  skills: readonly string[];
  interests: readonly string[];
  timeline: readonly ProfileTimelineEntry[];
}>;
