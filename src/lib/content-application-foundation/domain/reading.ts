import type { CalendarDate, CompiledMdx, ExternalWebUrl, PublicationState, Slug } from "./shared";

export type ReadingStatus = "queued" | "reading" | "completed";

export type ReadingRecord = Readonly<{
  title: string;
  slug: Slug;
  status: ReadingStatus;
  sourceUrl: ExternalWebUrl;
  topics: readonly string[];
  publication: PublicationState;
  authors?: readonly string[];
  year?: number;
  venue?: string;
  startedAt?: CalendarDate;
  completedAt?: CalendarDate;
  rating?: number;
  summary?: string;
  body?: CompiledMdx;
}>;

export type ReadingSummary = Readonly<{
  title: string;
  slug: Slug;
  status: ReadingStatus;
  sourceUrl: ExternalWebUrl;
  topics: readonly string[];
  demo: boolean;
  authors: readonly string[];
  year?: number;
  venue?: string;
  startedAt?: CalendarDate;
  completedAt?: CalendarDate;
  rating?: number;
  summary?: string;
  detailHref?: string;
}>;

export type ReadingDetail = ReadingSummary &
  Readonly<{
    body: CompiledMdx;
  }>;

export type ReadingGroups = Readonly<Record<ReadingStatus, readonly ReadingSummary[]>>;
