import type {
  ProjectFilterOptions,
  ProjectSummary,
} from "@/lib/content-application-foundation/domain";

import { portfolioCopy } from "./copy";
import type {
  FilteredCollectionPresentation,
  ProjectFilterSelection,
  ProjectFilterState,
} from "./types";

export const emptyProjectFilter: ProjectFilterSelection = Object.freeze({});

export function normalizeProjectFilter(
  selection: ProjectFilterSelection,
  options: ProjectFilterOptions,
): ProjectFilterSelection {
  return {
    ...(selection.projectType && options.projectTypes.includes(selection.projectType)
      ? { projectType: selection.projectType }
      : {}),
    ...(selection.technology && options.technologies.includes(selection.technology)
      ? { technology: selection.technology }
      : {}),
  };
}

export function filterProjects(
  projects: readonly ProjectSummary[],
  selection: ProjectFilterSelection,
): readonly ProjectSummary[] {
  return projects.filter(
    (project) =>
      (!selection.projectType || project.projectType === selection.projectType) &&
      (!selection.technology || project.technologies.includes(selection.technology)),
  );
}

export function toggleProjectFilter(
  selection: ProjectFilterSelection,
  category: keyof ProjectFilterSelection,
  value: string,
): ProjectFilterSelection {
  return {
    ...selection,
    [category]: selection[category] === value ? undefined : value,
  };
}

export function describeProjectFilter(
  projects: readonly ProjectSummary[],
  selection: ProjectFilterSelection,
): ProjectFilterState {
  const visibleCount = filterProjects(projects, selection).length;
  return {
    selection,
    totalCount: projects.length,
    visibleCount,
    hasAnyFilter: Boolean(selection.projectType || selection.technology),
  };
}

export function resolveFilteredProjects(
  projects: readonly ProjectSummary[],
  selection: ProjectFilterSelection,
): FilteredCollectionPresentation<ProjectSummary> {
  if (projects.length === 0) {
    return { kind: "empty", ...portfolioCopy.emptyProjects };
  }

  const visible = filterProjects(projects, selection);
  if (visible.length === 0) {
    return { kind: "no-filter-match", ...portfolioCopy.noFilterMatch };
  }

  return { kind: "populated", items: visible };
}
