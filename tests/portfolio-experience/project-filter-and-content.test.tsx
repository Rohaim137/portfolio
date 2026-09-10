// @vitest-environment jsdom

import axe from "axe-core";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArticleLayout } from "@/components/blog";
import { HomePageContent } from "@/components/home";
import { ProjectFilter } from "@/components/projects";
import type {
  HomePageViewModel,
  PostDetail,
  ProjectSummary,
} from "@/lib/content-application-foundation/domain";

vi.mock("@/components/ui/compiled-content", () => ({
  CompiledContent: () => <p>Compiled article body.</p>,
}));

afterEach(cleanup);

const projects = [
  {
    title: "Interface",
    slug: "interface",
    summary: "A web interface.",
    featured: true,
    technologies: ["TypeScript", "CSS"],
    cover: {
      kind: "image",
      src: "/media/projects/editorial-interface.svg",
      alt: "Abstract interface cover",
      width: 1200,
      height: 800,
    },
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
    cover: {
      kind: "image",
      src: "/media/projects/data-workflow.svg",
      alt: "Abstract workflow cover",
      width: 1200,
      height: 800,
    },
    status: "research",
    demo: true,
    projectType: "Data workflow",
  },
] as unknown as readonly ProjectSummary[];

describe("project filter", () => {
  it("announces counts, applies intersecting filters, shows no-match recovery, and resets", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ProjectFilter
        options={{
          projectTypes: ["Data workflow", "Web experience"],
          technologies: ["CSS", "TypeScript"],
        }}
        projects={projects}
      />,
    );

    expect(screen.getByTestId("project-filter-status").textContent).toBe("Showing 2 of 2 projects");
    await user.click(screen.getByTestId("project-filter-projecttype-data-workflow"));
    await user.click(screen.getByTestId("project-filter-technology-css"));
    expect(screen.getByTestId("project-filter-status").textContent).toBe("Showing 0 of 2 projects");
    expect(screen.getByTestId("project-filter-no-match")).toBeTruthy();

    await user.click(screen.getByTestId("project-filter-empty-reset"));
    expect(screen.getByTestId("project-filter-status").textContent).toBe("Showing 2 of 2 projects");
    expect(
      (await axe.run(container, { rules: { "color-contrast": { enabled: false } } })).violations,
    ).toEqual([]);
  });

  it("renders a truthful collection-level empty state without filter controls", () => {
    render(<ProjectFilter options={{ projectTypes: [], technologies: [] }} projects={[]} />);
    expect(screen.getByTestId("projects-empty-state")).toBeTruthy();
    expect(screen.queryByTestId("project-filter-status")).toBeNull();
  });
});

describe("representative content states", () => {
  it("renders generic home copy and distinct empty collections", () => {
    const model: HomePageViewModel = {
      profile: {},
      featuredProjects: [],
      latestPosts: [],
      currentReading: [],
      destinations: [{ kind: "active", label: "GitHub", href: "https://github.com/example" }],
      contributionState: "not-connected",
    };
    render(<HomePageContent model={model} />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Work, writing");
    expect(screen.getByTestId("home-projects-empty-state")).toBeTruthy();
    expect(screen.getByTestId("home-writing-empty-state")).toBeTruthy();
    expect(screen.getByTestId("home-reading-empty-state")).toBeTruthy();
    expect(screen.getByTestId("home-github-profile-link").getAttribute("href")).toBe(
      "https://github.com/example",
    );
  });

  it("renders article semantics, Demo disclosure, and an eligible contents list", () => {
    const post = {
      title: "Accessible State",
      slug: "accessible-state",
      description: "A generic article description.",
      publishedAt: "2025-02-11",
      tags: ["Accessibility"],
      demo: true,
      readingTime: { minutes: 2, words: 300, label: "2 min read" },
      showTableOfContents: true,
      body: {
        compiledSource: "",
        componentNames: [],
        readingTime: { minutes: 2, words: 300, label: "2 min read" },
        headings: [
          { depth: 2, anchor: "one", text: "One" },
          { depth: 2, anchor: "two", text: "Two" },
          { depth: 3, anchor: "three", text: "Three" },
        ],
      },
    } as unknown as PostDetail;
    render(<ArticleLayout post={post} />);

    expect(screen.getByRole("article")).toBeTruthy();
    expect(screen.getByTestId("demo-disclosure").textContent).toContain(
      "not presented as the owner",
    );
    expect(screen.getByTestId("article-table-of-contents")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Three" }).getAttribute("href")).toBe("#three");
  });
});
