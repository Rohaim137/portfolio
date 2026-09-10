import "server-only";

import type {
  ReadingDetail,
  ReadingGroups,
  ReadingRecord,
  ReadingStatus,
  ReadingSummary,
  Slug,
} from "../domain";
import {
  compareReading,
  isSecureWebUrl,
  isValidCalendarDate,
  isVisible,
  readingDetailHref,
} from "../policies";
import type { BuildContext } from "../runtime";
import { diagnosticCodes, readingFrontMatterSchema, type ReadingFrontMatter } from "../validation";
import { loadCollection } from "./loader";

export class ReadingRepository {
  readonly #context: BuildContext;
  constructor(context: BuildContext) {
    this.#context = context;
  }

  async list(options: Readonly<{ includeDrafts?: boolean; includeDemo?: boolean }> = {}) {
    return (await this.#records())
      .filter((record) =>
        isVisible(record.publication, {
          mode: this.#context.mode,
          includeDrafts: options.includeDrafts,
          includeDemo: options.includeDemo,
        }),
      )
      .map(toSummary)
      .sort(compareReading);
  }

  async groups(): Promise<ReadingGroups> {
    const grouped: Record<ReadingStatus, ReadingSummary[]> = {
      queued: [],
      reading: [],
      completed: [],
    };
    for (const item of await this.list()) grouped[item.status].push(item);
    return grouped;
  }

  async getBySlug(slug: Slug, includeDrafts = false): Promise<ReadingDetail | null> {
    const record = (await this.#records()).find((item) => item.slug === slug);
    if (
      !record?.body ||
      !isVisible(record.publication, { mode: this.#context.mode, includeDrafts })
    )
      return null;
    return { ...toSummary(record), body: record.body };
  }

  async getStaticSlugs(): Promise<readonly Slug[]> {
    return (await this.#records())
      .filter(
        (record) => Boolean(record.body) && isVisible(record.publication, { mode: "production" }),
      )
      .map((record) => record.slug)
      .sort(compareText);
  }

  #records(): Promise<readonly ReadingRecord[]> {
    return this.#context.memo.getOrCreate("records:reading", async () => {
      const loaded = await loadCollection({
        context: this.#context,
        collection: "reading",
        schema: readingFrontMatterSchema,
        contentKind: "reading",
        componentNames: ["Note"],
        validate: validateReading,
      });
      return loaded.map(({ data, compiled }) => ({
        ...data,
        publication: { draft: data.draft, demo: data.demo },
        authors: data.authors ?? [],
        body: compiled,
      }));
    });
  }
}

function validateReading(data: ReadingFrontMatter, source: { relativePath: string }) {
  const errors = [];
  if (!isSecureWebUrl(data.sourceUrl))
    errors.push({
      collection: "reading" as const,
      file: source.relativePath,
      field: "sourceUrl",
      code: diagnosticCodes.invalidUrl,
      message: "Reading source URL must use HTTPS.",
    });
  for (const [field, value] of [
    ["startedAt", data.startedAt],
    ["completedAt", data.completedAt],
  ] as const) {
    if (value && !isValidCalendarDate(value))
      errors.push({
        collection: "reading" as const,
        file: source.relativePath,
        field,
        code: diagnosticCodes.invalidDate,
        message: "Date must be a real ISO calendar date in YYYY-MM-DD form.",
      });
  }
  return errors;
}

function toSummary(record: ReadingRecord): ReadingSummary {
  return {
    title: record.title,
    slug: record.slug,
    status: record.status,
    sourceUrl: record.sourceUrl,
    topics: record.topics,
    demo: record.publication.demo,
    authors: record.authors ?? [],
    year: record.year,
    venue: record.venue,
    startedAt: record.startedAt,
    completedAt: record.completedAt,
    rating: record.rating,
    summary: record.summary,
    detailHref: readingDetailHref(record.slug, record.body?.compiledSource),
  };
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
