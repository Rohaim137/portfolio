import "server-only";

import { publicDocuments } from "@/config/documents";
import { siteConfig } from "@/config/site";

import type { PublishedRoute, SiteConfig } from "../domain";
import { isSecureWebUrl } from "../policies";
import {
  DocumentRepository,
  PostRepository,
  ProjectRepository,
  ReadingRepository,
} from "../repositories";
import { createBuildContext } from "../runtime";
import { siteConfigSchema } from "../validation";
import { MetadataService } from "./metadata-service";
import { PortfolioQueryService } from "./portfolio-query-service";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (configuredSiteUrl && !isSecureWebUrl(configuredSiteUrl)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTPS URL.");
}

const validated = siteConfigSchema.parse({
  ...siteConfig,
  ...(configuredSiteUrl ? { siteUrl: configuredSiteUrl } : {}),
});

export const validatedSiteConfig: SiteConfig = validated;
export const metadataService = new MetadataService(validatedSiteConfig);
export const buildContext = createBuildContext({
  workspaceRoot: process.cwd(),
  mode: process.env.NODE_ENV === "production" ? "production" : "development-preview",
});
export const projectRepository = new ProjectRepository(buildContext);
export const postRepository = new PostRepository(buildContext);
export const readingRepository = new ReadingRepository(buildContext);
export const documentRepository = new DocumentRepository(process.cwd(), publicDocuments);
export const portfolioQueryService = new PortfolioQueryService({
  site: validatedSiteConfig,
  projects: projectRepository,
  posts: postRepository,
  reading: readingRepository,
  documents: documentRepository,
});

export const fixedPublishedRoutes: readonly PublishedRoute[] = [
  { pathname: "/", sourceKind: "fixed" },
  { pathname: "/projects/", sourceKind: "fixed" },
  { pathname: "/blog/", sourceKind: "fixed" },
  { pathname: "/reading/", sourceKind: "fixed" },
  { pathname: "/docs/", sourceKind: "fixed" },
];

export async function getPublishedRoutes(): Promise<readonly PublishedRoute[]> {
  const [projects, posts, reading] = await Promise.all([
    projectRepository.list(),
    postRepository.list(),
    readingRepository.list(),
  ]);

  return [
    ...fixedPublishedRoutes,
    ...projects.map((project): PublishedRoute => ({
      pathname: `/projects/${project.slug}/`,
      sourceKind: "project",
      sourceSlug: project.slug,
      lastModified: project.completedAt,
    })),
    ...posts.map((post): PublishedRoute => ({
      pathname: `/blog/${post.slug}/`,
      sourceKind: "post",
      sourceSlug: post.slug,
      lastModified: post.publishedAt,
    })),
    ...reading.flatMap((item): readonly PublishedRoute[] =>
      item.detailHref
        ? [{ pathname: item.detailHref, sourceKind: "reading", sourceSlug: item.slug }]
        : [],
    ),
  ];
}
