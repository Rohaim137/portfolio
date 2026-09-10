import type { Metadata } from "next";

import type {
  PageMetadataModel,
  PostDetail,
  ProjectDetail,
  PublishedRoute,
  ReadingDetail,
  RobotsDefinition,
  SiteConfig,
  SitemapEntry,
} from "../domain";

export type IndexMetadataInput = Readonly<{
  title: string;
  description: string;
  pathname: string;
}>;

export class MetadataService {
  readonly #site: SiteConfig;

  constructor(site: SiteConfig) {
    this.#site = site;
  }

  forIndex(input: IndexMetadataInput): PageMetadataModel {
    return this.#base(input.title, input.description, input.pathname, "website");
  }

  forProject(project: ProjectDetail): PageMetadataModel {
    return {
      ...this.#base(project.title, project.summary, `/projects/${project.slug}/`, "website"),
      socialImage: project.cover.src || this.#site.defaultSocialImage,
    };
  }

  forPost(post: PostDetail): PageMetadataModel {
    return {
      ...this.#base(post.title, post.description, `/blog/${post.slug}/`, "article"),
      socialImage: post.cover?.src ?? this.#site.defaultSocialImage,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    };
  }

  forReading(item: ReadingDetail): PageMetadataModel {
    return this.#base(
      item.title,
      item.summary ?? `Reading notes for ${item.title}.`,
      `/reading/${item.slug}/`,
      "article",
    );
  }

  sitemap(routes: readonly PublishedRoute[]): readonly SitemapEntry[] {
    if (!this.#site.siteUrl) {
      return [];
    }

    const origin = withoutTrailingSlash(this.#site.siteUrl);
    return [...routes]
      .sort((left, right) => compareText(left.pathname, right.pathname))
      .map((route) => ({
        location: `${origin}${ensureLeadingSlash(route.pathname)}`,
        lastModified: route.lastModified,
      }));
  }

  robots(): RobotsDefinition {
    return {
      allow: ["/"],
      disallow: [],
      ...(this.#site.siteUrl
        ? { sitemap: `${withoutTrailingSlash(this.#site.siteUrl)}/sitemap.xml` }
        : {}),
    };
  }

  #base(
    title: string,
    description: string,
    pathname: string,
    pageType: PageMetadataModel["pageType"],
  ): PageMetadataModel {
    return {
      title,
      description,
      socialImage: this.#site.defaultSocialImage,
      pageType,
      ...(this.#site.siteUrl
        ? {
            canonicalUrl: `${withoutTrailingSlash(this.#site.siteUrl)}${ensureLeadingSlash(pathname)}`,
          }
        : {}),
    };
  }
}

export function toNextMetadata(model: PageMetadataModel): Metadata {
  return {
    title: model.title,
    description: model.description,
    alternates: model.canonicalUrl ? { canonical: model.canonicalUrl } : undefined,
    openGraph: {
      title: model.title,
      description: model.description,
      type: model.pageType,
      ...(model.canonicalUrl
        ? { images: [{ url: new URL(model.socialImage, model.canonicalUrl).toString() }] }
        : {}),
      ...(model.pageType === "article"
        ? { publishedTime: model.publishedAt, modifiedTime: model.updatedAt }
        : {}),
    },
  };
}

function ensureLeadingSlash(pathname: string): string {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function withoutTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
