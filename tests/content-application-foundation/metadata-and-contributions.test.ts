import { join } from "node:path";
import { tmpdir } from "node:os";

import { describe, expect, it } from "vitest";

import type {
  PostDetail,
  ProjectDetail,
  ReadingDetail,
  SiteConfig,
} from "@/lib/content-application-foundation/domain";
import { ContributionDataReader } from "@/lib/content-application-foundation/repositories";
import { MetadataService, toNextMetadata } from "@/lib/content-application-foundation/services";

function makeSite(siteUrl?: string): SiteConfig {
  return {
    title: "Portfolio",
    defaultDescription: "Description",
    defaultSocialImage: "/media/social/default.svg",
    navigation: [],
    publicProfile: {},
    githubUsername: "Rohaim137",
    destinations: [{ kind: "active", label: "GitHub", href: "https://github.com/Rohaim137" }],
    siteUrl,
  };
}

describe("metadata and discovery", () => {
  it("gates canonicals and sitemap output until a production origin exists", () => {
    const local = new MetadataService(makeSite());
    expect(
      local.forIndex({ title: "Home", description: "Home page", pathname: "/" }).canonicalUrl,
    ).toBeUndefined();
    expect(local.sitemap([{ pathname: "/", sourceKind: "fixed" }])).toEqual([]);
    expect(local.robots()).toEqual({ allow: ["/"], disallow: [] });

    const production = new MetadataService(makeSite("https://portfolio.example"));
    expect(
      production.forIndex({ title: "Home", description: "Home page", pathname: "/" }),
    ).toMatchObject({
      canonicalUrl: "https://portfolio.example/",
      socialImage: "/media/social/default.svg",
    });
    expect(production.sitemap([{ pathname: "/projects/", sourceKind: "fixed" }])).toEqual([
      { location: "https://portfolio.example/projects/", lastModified: undefined },
    ]);
    expect(production.robots()).toEqual({
      allow: ["/"],
      disallow: [],
      sitemap: "https://portfolio.example/sitemap.xml",
    });
  });

  it("builds project, post, reading, and framework metadata with local fallbacks", () => {
    const service = new MetadataService(makeSite("https://portfolio.example/"));
    const body = {
      compiledSource: "compiled",
      componentNames: [],
      headings: [],
      readingTime: { minutes: 1, words: 10, label: "1 min read" },
    } as const;
    const cover = {
      kind: "image",
      src: "/media/project.svg",
      alt: "Project",
      width: 1200,
      height: 800,
    } as const;
    const project: ProjectDetail = {
      title: "Project",
      slug: "project",
      summary: "Project summary",
      featured: true,
      technologies: [],
      cover,
      status: "shipped",
      demo: true,
      body,
      gallery: [],
      decisions: [],
      results: [],
    };
    const post: PostDetail = {
      title: "Post",
      slug: "post",
      description: "Post description",
      publishedAt: "2026-01-01",
      updatedAt: "2026-02-01",
      readingTime: body.readingTime,
      tags: [],
      demo: true,
      cover,
      body,
      showTableOfContents: false,
    };
    const reading: ReadingDetail = {
      title: "Reading",
      slug: "reading",
      status: "completed",
      sourceUrl: "https://example.com/reading",
      topics: [],
      demo: false,
      authors: [],
      body,
    };

    expect(service.forProject(project)).toMatchObject({
      socialImage: "/media/project.svg",
      canonicalUrl: "https://portfolio.example/projects/project/",
    });
    expect(service.forPost(post)).toMatchObject({
      pageType: "article",
      publishedAt: "2026-01-01",
      updatedAt: "2026-02-01",
    });
    expect(service.forPost({ ...post, cover: undefined }).socialImage).toBe(
      "/media/social/default.svg",
    );
    expect(service.forReading(reading).description).toBe("Reading notes for Reading.");
    expect(service.forReading({ ...reading, summary: "Existing summary" }).description).toBe(
      "Existing summary",
    );

    expect(toNextMetadata(service.forPost(post)).openGraph).toMatchObject({
      type: "article",
      images: [{ url: "https://portfolio.example/media/project.svg" }],
      publishedTime: "2026-01-01",
    });
    const localProjectMetadata = new MetadataService(makeSite()).forProject({
      ...project,
      cover: { ...cover, src: "" },
    });
    expect(localProjectMetadata.socialImage).toBe("/media/social/default.svg");
    expect(toNextMetadata(localProjectMetadata).alternates).toBeUndefined();
  });

  it("sorts sitemap paths and preserves last-modified values", () => {
    const service = new MetadataService(makeSite("https://portfolio.example/"));
    expect(
      service.sitemap([
        { pathname: "z/", sourceKind: "fixed" },
        { pathname: "/a/", sourceKind: "post", lastModified: "2026-01-01" },
        { pathname: "/a/", sourceKind: "fixed" },
      ]),
    ).toEqual([
      { location: "https://portfolio.example/a/", lastModified: "2026-01-01" },
      { location: "https://portfolio.example/a/", lastModified: undefined },
      { location: "https://portfolio.example/z/", lastModified: undefined },
    ]);
  });
});

describe("optional contribution data", () => {
  it("returns null when generated contribution data is absent", async () => {
    const reader = new ContributionDataReader(
      join(tmpdir(), `missing-contributions-${process.pid}.json`),
    );
    await expect(reader.readGenerated()).resolves.toBeNull();
  });
});
