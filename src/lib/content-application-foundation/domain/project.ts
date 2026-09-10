import type { CalendarDate, CompiledMdx, ExternalWebUrl, PublicationState, Slug } from "./shared";
import type { CoverMedia, ProjectMedia } from "./media";

export type ProjectStatus = "shipped" | "prototype" | "coursework" | "research" | "archived";

export type ProjectRecord = Readonly<{
  title: string;
  slug: Slug;
  summary: string;
  featured: boolean;
  technologies: readonly string[];
  cover: CoverMedia;
  status: ProjectStatus;
  publication: PublicationState;
  projectType?: string;
  startedAt?: CalendarDate;
  completedAt?: CalendarDate;
  repositoryUrl?: ExternalWebUrl;
  demoUrl?: ExternalWebUrl;
  gallery?: readonly ProjectMedia[];
  architecture?: string;
  decisions?: readonly string[];
  results?: readonly string[];
  retrospective?: string;
  body?: CompiledMdx;
}>;

export type ProjectSummary = Readonly<{
  title: string;
  slug: Slug;
  summary: string;
  featured: boolean;
  technologies: readonly string[];
  cover: CoverMedia;
  status: ProjectStatus;
  demo: boolean;
  projectType?: string;
  completedAt?: CalendarDate;
  repositoryUrl?: ExternalWebUrl;
  demoUrl?: ExternalWebUrl;
}>;

export type ProjectDetail = ProjectSummary &
  Readonly<{
    body: CompiledMdx;
    gallery: readonly ProjectMedia[];
    architecture?: string;
    decisions: readonly string[];
    results: readonly string[];
    retrospective?: string;
  }>;

export type ProjectFilter = Readonly<{
  projectType?: string;
  technology?: string;
}>;

export type ProjectFilterOptions = Readonly<{
  projectTypes: readonly string[];
  technologies: readonly string[];
}>;
