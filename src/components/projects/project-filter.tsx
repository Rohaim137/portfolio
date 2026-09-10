"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui";
import type {
  ProjectFilterOptions,
  ProjectSummary,
} from "@/lib/content-application-foundation/domain";
import {
  describeProjectFilter,
  emptyProjectFilter,
  portfolioCopy,
  resolveFilteredProjects,
  toggleProjectFilter,
  type ProjectFilterSelection,
} from "@/lib/portfolio-experience";

import { ProjectGrid } from "./project-grid";

type ProjectFilterProps = Readonly<{
  projects: readonly ProjectSummary[];
  options: ProjectFilterOptions;
}>;

export function ProjectFilter({ projects, options }: ProjectFilterProps) {
  const [selection, setSelection] = useState<ProjectFilterSelection>(emptyProjectFilter);
  const presentation = useMemo(
    () => resolveFilteredProjects(projects, selection),
    [projects, selection],
  );
  const summary = describeProjectFilter(projects, selection);

  if (projects.length === 0) {
    return <EmptyState {...portfolioCopy.emptyProjects} testId="projects-empty-state" />;
  }

  function renderOptions(category: keyof ProjectFilterSelection, values: readonly string[]) {
    return values.map((value) => {
      const selected = selection[category] === value;
      return (
        <button
          aria-pressed={selected}
          className="filter-button"
          data-testid={`project-filter-${toTestId(category)}-${toTestId(value)}`}
          key={value}
          onClick={() => setSelection((current) => toggleProjectFilter(current, category, value))}
          type="button"
        >
          {value}
        </button>
      );
    });
  }

  return (
    <>
      <div className="project-filter" data-od-id="projects-filters">
        <div className="filter-group">
          <span className="filter-group-label">Type</span>
          {renderOptions("projectType", options.projectTypes)}
        </div>
        <div className="filter-group">
          <span className="filter-group-label">Technology</span>
          {renderOptions("technology", options.technologies)}
        </div>
        <p aria-live="polite" className="filter-status" data-testid="project-filter-status">
          Showing {summary.visibleCount} of {summary.totalCount} projects
        </p>
        {summary.hasAnyFilter ? (
          <button
            className="filter-reset"
            data-testid="project-filter-reset"
            onClick={() => setSelection(emptyProjectFilter)}
            type="button"
          >
            Reset filters
          </button>
        ) : null}
      </div>
      {presentation.kind === "populated" ? (
        <ProjectGrid projects={presentation.items} />
      ) : presentation.kind === "no-filter-match" ? (
        <EmptyState
          action={
            <button
              className="filter-reset"
              data-testid="project-filter-empty-reset"
              onClick={() => setSelection(emptyProjectFilter)}
              type="button"
            >
              {presentation.resetLabel}
            </button>
          }
          description={presentation.description}
          heading={presentation.heading}
          testId="project-filter-no-match"
        />
      ) : (
        <EmptyState {...presentation} testId="projects-empty-state" />
      )}
    </>
  );
}

function toTestId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
