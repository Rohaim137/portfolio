import { describe, expect, it } from "vitest";

import type {
  ProjectFilterOptions,
  ProjectSummary,
} from "@/lib/content-application-foundation/domain";
import {
  describeProjectFilter,
  emptyProjectFilter,
  filterProjects,
  normalizeProjectFilter,
  portfolioCopy,
  resolveFilteredProjects,
  toggleProjectFilter,
} from "@/lib/portfolio-experience";

const projects = [
  {
    title: "Interface",
    slug: "interface",
    summary: "A web interface.",
    featured: true,
    technologies: ["TypeScript", "CSS"],
    cover: { kind: "image", src: "/media/interface.svg", alt: "Abstract cover" },
    status: "prototype",
    demo: true,
    projectType: "Web experience",
  },
  {
    title: "Workflow",
    slug: "workflow",
    summary: "A data workflow.",
    featured: false,
    technologies: ["TypeScript"],
    cover: { kind: "image", src: "/media/workflow.svg", alt: "Abstract cover" },
    status: "research",
    demo: true,
    projectType: "Data workflow",
  },
] as unknown as readonly ProjectSummary[];

const options: ProjectFilterOptions = {
  projectTypes: ["Data workflow", "Web experience"],
  technologies: ["CSS", "TypeScript"],
};

describe("project filtering", () => {
  it("normalizes selections against deterministic options", () => {
    expect(
      normalizeProjectFilter({ projectType: "Web experience", technology: "TypeScript" }, options),
    ).toEqual({ projectType: "Web experience", technology: "TypeScript" });
    expect(normalizeProjectFilter({ projectType: "Unknown", technology: "Rust" }, options)).toEqual(
      {},
    );
  });

  it("uses AND semantics without changing source order", () => {
    expect(filterProjects(projects, emptyProjectFilter)).toEqual(projects);
    expect(
      filterProjects(projects, { projectType: "Web experience" }).map(({ slug }) => slug),
    ).toEqual(["interface"]);
    expect(filterProjects(projects, { technology: "TypeScript" }).map(({ slug }) => slug)).toEqual([
      "interface",
      "workflow",
    ]);
    expect(filterProjects(projects, { projectType: "Data workflow", technology: "CSS" })).toEqual(
      [],
    );
  });

  it("toggles one category independently and supports reset", () => {
    const selected = toggleProjectFilter(emptyProjectFilter, "projectType", "Web experience");
    expect(selected).toEqual({ projectType: "Web experience" });
    expect(toggleProjectFilter(selected, "projectType", "Web experience")).toEqual({
      projectType: undefined,
    });
    expect(toggleProjectFilter(selected, "technology", "CSS")).toEqual({
      projectType: "Web experience",
      technology: "CSS",
    });
    expect(emptyProjectFilter).toEqual({});
  });

  it("describes counts and active-filter state", () => {
    expect(describeProjectFilter(projects, {})).toMatchObject({
      totalCount: 2,
      visibleCount: 2,
      hasAnyFilter: false,
    });
    expect(describeProjectFilter(projects, { technology: "CSS" })).toMatchObject({
      totalCount: 2,
      visibleCount: 1,
      hasAnyFilter: true,
    });
  });

  it("distinguishes collection absence, filter mismatch, and visible results", () => {
    expect(resolveFilteredProjects([], {})).toEqual({
      kind: "empty",
      ...portfolioCopy.emptyProjects,
    });
    expect(resolveFilteredProjects(projects, { technology: "Rust" })).toEqual({
      kind: "no-filter-match",
      ...portfolioCopy.noFilterMatch,
    });
    expect(resolveFilteredProjects(projects, { technology: "CSS" })).toEqual({
      kind: "populated",
      items: [projects[0]],
    });
  });
});
