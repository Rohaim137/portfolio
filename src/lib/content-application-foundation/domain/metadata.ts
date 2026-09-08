import type { CalendarDate, Slug } from "./shared";

export type PageType = "website" | "article";

export type PageMetadataModel = Readonly<{
  title: string;
  description: string;
  canonicalUrl?: string;
  socialImage: string;
  pageType: PageType;
  publishedAt?: CalendarDate;
  updatedAt?: CalendarDate;
}>;

export type PublishedRoute = Readonly<{
  pathname: string;
  lastModified?: CalendarDate;
  sourceKind: "fixed" | "project" | "post" | "reading" | "document";
  sourceSlug?: Slug;
}>;

export type SitemapEntry = Readonly<{
  location: string;
  lastModified?: CalendarDate;
}>;

export type RobotsDefinition = Readonly<{
  allow: readonly string[];
  disallow: readonly string[];
  sitemap?: string;
}>;
