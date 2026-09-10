import "server-only";

import type { PostDetail, PostRecord, PostSummary, Slug } from "../domain";
import { comparePosts, isValidCalendarDate, isVisible } from "../policies";
import type { BuildContext } from "../runtime";
import { diagnosticCodes, postFrontMatterSchema, type PostFrontMatter } from "../validation";
import { loadCollection } from "./loader";

export class PostRepository {
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
      .sort(comparePosts);
  }

  async listLatest(limit?: number): Promise<readonly PostSummary[]> {
    const posts = await this.list();
    return limit === undefined ? posts : posts.slice(0, Math.max(0, limit));
  }

  async getBySlug(slug: Slug, includeDrafts = false): Promise<PostDetail | null> {
    const record = (await this.#records()).find((item) => item.slug === slug);
    if (!record || !isVisible(record.publication, { mode: this.#context.mode, includeDrafts })) {
      return null;
    }
    return {
      ...toSummary(record),
      body: record.body,
      updatedAt: record.updatedAt,
      series: record.series,
      showTableOfContents: record.showTableOfContents ?? false,
    };
  }

  async getStaticSlugs(): Promise<readonly Slug[]> {
    return (await this.#records())
      .filter((record) => isVisible(record.publication, { mode: "production" }))
      .map((record) => record.slug)
      .sort(compareText);
  }

  #records(): Promise<readonly PostRecord[]> {
    return this.#context.memo.getOrCreate("records:blog", async () => {
      const loaded = await loadCollection({
        context: this.#context,
        collection: "blog",
        schema: postFrontMatterSchema,
        contentKind: "post",
        componentNames: ["Note"],
        bodyRequired: true,
        validate: validatePost,
      });
      return loaded.map(({ data, compiled }) => ({
        ...data,
        publication: { draft: data.draft, demo: data.demo },
        tags: data.tags ?? [],
        body: compiled!,
      }));
    });
  }
}

function validatePost(data: PostFrontMatter, source: { relativePath: string }) {
  return [
    ["publishedAt", data.publishedAt],
    ["updatedAt", data.updatedAt],
  ].flatMap(([field, value]) =>
    value && !isValidCalendarDate(value)
      ? [
          {
            collection: "blog" as const,
            file: source.relativePath,
            field,
            code: diagnosticCodes.invalidDate,
            message: "Date must be a real ISO calendar date in YYYY-MM-DD form.",
          },
        ]
      : [],
  );
}

function toSummary(record: PostRecord): PostSummary {
  return {
    title: record.title,
    slug: record.slug,
    description: record.description,
    publishedAt: record.publishedAt,
    readingTime: record.body.readingTime,
    tags: record.tags ?? [],
    demo: record.publication.demo,
    cover: record.cover,
  };
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
