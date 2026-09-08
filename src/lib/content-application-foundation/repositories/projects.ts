import "server-only";

import type {
  ProjectDetail,
  ProjectFilterOptions,
  ProjectRecord,
  ProjectSummary,
  Slug,
} from "../domain";
import { compareProjects, isSecureWebUrl, isValidCalendarDate, isVisible } from "../policies";
import type { BuildContext } from "../runtime";
import { diagnosticCodes, projectFrontMatterSchema, type ProjectFrontMatter } from "../validation";
import { loadCollection } from "./loader";

export class ProjectRepository {
  readonly #context: BuildContext;

  constructor(context: BuildContext) {
    this.#context = context;
  }

  async list(options: Readonly<{ includeDrafts?: boolean; includeDemo?: boolean }> = {}) {
    const records = await this.#records();
    return records
      .filter((record) =>
        isVisible(record.publication, {
          mode: this.#context.mode,
          includeDrafts: options.includeDrafts,
          includeDemo: options.includeDemo,
        }),
      )
      .map(toSummary)
      .sort(compareProjects);
  }

  async listFeatured(limit?: number): Promise<readonly ProjectSummary[]> {
    const featured = (await this.list()).filter((project) => project.featured);
    return limit === undefined ? featured : featured.slice(0, Math.max(0, limit));
  }

  async getBySlug(slug: Slug, includeDrafts = false): Promise<ProjectDetail | null> {
    const record = (await this.#records()).find((item) => item.slug === slug);
    if (!record || !isVisible(record.publication, { mode: this.#context.mode, includeDrafts })) {
      return null;
    }
    const body = record.body;
    return body ? toDetail(record, body) : null;
  }

  async getStaticSlugs(): Promise<readonly Slug[]> {
    return (await this.#records())
      .filter(
        (record) => Boolean(record.body) && isVisible(record.publication, { mode: "production" }),
      )
      .map((record) => record.slug)
      .sort(compareText);
  }

  async filters(): Promise<ProjectFilterOptions> {
    const projects = await this.list();
    return {
      projectTypes: uniqueSorted(projects.flatMap((item) => item.projectType ?? [])),
      technologies: uniqueSorted(projects.flatMap((item) => item.technologies)),
    };
  }

  #records(): Promise<readonly ProjectRecord[]> {
    return this.#context.memo.getOrCreate("records:projects", async () => {
      const loaded = await loadCollection({
        context: this.#context,
        collection: "projects",
        schema: projectFrontMatterSchema,
        contentKind: "project",
        componentNames: ["Note", "Media"],
        validate: validateProject,
      });
      return loaded.map(({ data, compiled }) => toRecord(data, compiled));
    });
  }
}

function validateProject(data: ProjectFrontMatter, source: { relativePath: string }) {
  const errors = [];
  for (const [field, value] of [
    ["startedAt", data.startedAt],
    ["completedAt", data.completedAt],
  ] as const) {
    if (value && !isValidCalendarDate(value)) {
      errors.push({
        collection: "projects" as const,
        file: source.relativePath,
        field,
        code: diagnosticCodes.invalidDate,
        message: "Date must be a real ISO calendar date in YYYY-MM-DD form.",
      });
    }
  }
  for (const [field, value] of [
    ["repositoryUrl", data.repositoryUrl],
    ["demoUrl", data.demoUrl],
  ] as const) {
    if (value && !isSecureWebUrl(value)) {
      errors.push({
        collection: "projects" as const,
        file: source.relativePath,
        field,
        code: diagnosticCodes.invalidUrl,
        message: "External project URLs must use HTTPS.",
      });
    }
  }
  return errors;
}

function toRecord(data: ProjectFrontMatter, body?: ProjectRecord["body"]): ProjectRecord {
  return {
    ...data,
    publication: { draft: data.draft, demo: data.demo },
    gallery: data.gallery ?? [],
    decisions: data.decisions ?? [],
    results: data.results ?? [],
    body,
  };
}

function toSummary(record: ProjectRecord): ProjectSummary {
  return {
    title: record.title,
    slug: record.slug,
    summary: record.summary,
    featured: record.featured,
    technologies: record.technologies,
    cover: record.cover,
    status: record.status,
    demo: record.publication.demo,
    projectType: record.projectType,
    completedAt: record.completedAt,
    repositoryUrl: record.repositoryUrl,
    demoUrl: record.demoUrl,
  };
}

function toDetail(record: ProjectRecord, body: NonNullable<ProjectRecord["body"]>): ProjectDetail {
  return {
    ...toSummary(record),
    body,
    gallery: record.gallery ?? [],
    architecture: record.architecture,
    decisions: record.decisions ?? [],
    results: record.results ?? [],
    retrospective: record.retrospective,
  };
}

function uniqueSorted(values: readonly string[]): readonly string[] {
  return [...new Set(values)].sort(compareText);
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
