import type { PublicDocument } from "./document";
import type { PostSummary } from "./post";
import type { ProjectFilterOptions, ProjectSummary } from "./project";
import type { ReadingGroups, ReadingSummary } from "./reading";
import type { DestinationState, PublicProfile } from "./site";

export type HomePageViewModel = Readonly<{
  profile: PublicProfile;
  featuredProjects: readonly ProjectSummary[];
  latestPosts: readonly PostSummary[];
  currentReading: readonly ReadingSummary[];
  destinations: readonly DestinationState[];
  contributionState: "not-connected";
}>;

export type ProjectsIndexViewModel = Readonly<{
  projects: readonly ProjectSummary[];
  filters: ProjectFilterOptions;
}>;

export type BlogIndexViewModel = Readonly<{
  posts: readonly PostSummary[];
}>;

export type ReadingIndexViewModel = Readonly<{
  groups: ReadingGroups;
}>;

export type DocumentsViewModel = Readonly<{
  documents: readonly PublicDocument[];
}>;
