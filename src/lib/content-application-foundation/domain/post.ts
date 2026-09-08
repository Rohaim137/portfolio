import type { CalendarDate, CompiledMdx, PublicationState, Slug } from "./shared";
import type { CoverMedia } from "./media";

export type PostRecord = Readonly<{
  title: string;
  slug: Slug;
  description: string;
  publishedAt: CalendarDate;
  publication: PublicationState;
  body: CompiledMdx;
  tags?: readonly string[];
  cover?: CoverMedia;
  updatedAt?: CalendarDate;
  series?: string;
  showTableOfContents?: boolean;
}>;

export type PostSummary = Readonly<{
  title: string;
  slug: Slug;
  description: string;
  publishedAt: CalendarDate;
  readingTime: CompiledMdx["readingTime"];
  tags: readonly string[];
  demo: boolean;
  cover?: CoverMedia;
}>;

export type PostDetail = PostSummary &
  Readonly<{
    body: CompiledMdx;
    updatedAt?: CalendarDate;
    series?: string;
    showTableOfContents: boolean;
  }>;
