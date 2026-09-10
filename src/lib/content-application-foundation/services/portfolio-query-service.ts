import "server-only";

import type {
  BlogIndexViewModel,
  DocumentsViewModel,
  HomePageViewModel,
  ProjectsIndexViewModel,
  ReadingIndexViewModel,
  SiteConfig,
} from "../domain";
import type {
  DocumentRepository,
  PostRepository,
  ProjectRepository,
  ReadingRepository,
} from "../repositories";

export type PortfolioQueryDependencies = Readonly<{
  site: SiteConfig;
  projects: ProjectRepository;
  posts: PostRepository;
  reading: ReadingRepository;
  documents: DocumentRepository;
}>;

export class PortfolioQueryService {
  readonly #dependencies: PortfolioQueryDependencies;
  constructor(dependencies: PortfolioQueryDependencies) {
    this.#dependencies = dependencies;
  }

  async getHomePage(): Promise<HomePageViewModel> {
    const [featuredProjects, latestPosts, reading] = await Promise.all([
      this.#dependencies.projects.listFeatured(3),
      this.#dependencies.posts.listLatest(3),
      this.#dependencies.reading.list(),
    ]);
    return {
      profile: this.#dependencies.site.publicProfile,
      featuredProjects,
      latestPosts,
      currentReading: reading.filter((item) => item.status === "reading"),
      destinations: this.#dependencies.site.destinations,
      contributionState: "not-connected",
    };
  }

  async getProjectsIndex(): Promise<ProjectsIndexViewModel> {
    return {
      projects: await this.#dependencies.projects.list(),
      filters: await this.#dependencies.projects.filters(),
    };
  }
  async getBlogIndex(): Promise<BlogIndexViewModel> {
    return { posts: await this.#dependencies.posts.list() };
  }
  async getReadingIndex(): Promise<ReadingIndexViewModel> {
    return { groups: await this.#dependencies.reading.groups() };
  }
  async getDocumentsIndex(): Promise<DocumentsViewModel> {
    return { documents: await this.#dependencies.documents.list() };
  }
}
