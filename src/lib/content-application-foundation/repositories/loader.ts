import "server-only";

import type { z } from "zod";

import { MdxCompilationError, parseFrontMatter } from "../compilation";
import type {
  CollectionId,
  CompiledMdx,
  ContentError,
  ContentKind,
  ContentSource,
} from "../domain";
import { findDuplicateSlugs, validateSlug } from "../policies";
import { MemoizedMdxCompiler, type BuildContext } from "../runtime";
import { SourceAdapterError } from "../source";
import { DiagnosticCollector, diagnosticCodes, validateWithSchema } from "../validation";

export type LoadedSource<T> = Readonly<{
  data: T;
  source: ContentSource;
  compiled?: CompiledMdx;
}>;

export type LoadCollectionOptions<TSchema extends z.ZodType> = Readonly<{
  context: BuildContext;
  collection: Extract<CollectionId, "projects" | "blog" | "reading">;
  schema: TSchema;
  contentKind: ContentKind;
  componentNames?: readonly string[];
  bodyRequired?: boolean;
  validate?: (data: z.output<TSchema>, source: ContentSource) => readonly ContentError[];
}>;

export class ContentValidationFailure extends Error {
  readonly errors: readonly ContentError[];

  constructor(collector: DiagnosticCollector) {
    super(collector.format());
    this.name = "ContentValidationFailure";
    this.errors = collector.report().errors;
  }
}

export async function loadCollection<TSchema extends z.ZodType>(
  options: LoadCollectionOptions<TSchema>,
): Promise<readonly LoadedSource<z.output<TSchema>>[]> {
  const cacheKey = `collection:${options.collection}`;

  return options.context.memo.getOrCreate(cacheKey, async () => {
    const collector = new DiagnosticCollector();
    const compiler = new MemoizedMdxCompiler(options.context.memo);
    let descriptors;

    try {
      descriptors = await options.context.scanner.scan(options.collection);
    } catch (cause) {
      collector.add(toSourceError(options.collection, cause));
      copyErrors(options.context, collector);
      throw new ContentValidationFailure(collector);
    }

    const parsed = await options.context.scheduler.map(descriptors, async (descriptor) => {
      try {
        const readSource = await options.context.reader.read(descriptor);
        const frontMatter = parseFrontMatter(readSource);
        if (!frontMatter.success) {
          collector.addAll(frontMatter.errors);
          return null;
        }

        const validation = validateWithSchema(options.schema, frontMatter.source.frontMatter, {
          collection: options.collection,
          file: frontMatter.source.relativePath,
        });
        if (!validation.success) {
          collector.addAll(validation.errors);
          return null;
        }

        const data = validation.data;
        if (hasSlug(data)) {
          collector.addAll(
            validateSlug(data.slug, {
              collection: options.collection,
              file: frontMatter.source.relativePath,
              filenameStem: frontMatter.source.filenameStem,
            }),
          );
        }
        collector.addAll(options.validate?.(data, frontMatter.source) ?? []);

        const body = frontMatter.source.body ?? "";
        if (options.bodyRequired && !body.trim()) {
          collector.add({
            collection: options.collection,
            file: frontMatter.source.relativePath,
            field: "body",
            code: diagnosticCodes.schemaInvalid,
            message: "A non-empty content body is required.",
          });
          return null;
        }

        let compiled: CompiledMdx | undefined;
        if (body.trim()) {
          try {
            compiled = await compiler.compile(body, {
              contentKind: options.contentKind,
              componentNames: options.componentNames ?? [],
            });
          } catch (cause) {
            collector.addAll(toCompilationErrors(options.collection, frontMatter.source, cause));
            return null;
          }
        }

        return { data, source: frontMatter.source, compiled };
      } catch (cause) {
        collector.add(toSourceError(options.collection, cause));
        return null;
      }
    });

    const valid = parsed.filter((item): item is NonNullable<typeof item> => item !== null);
    const slugSources = valid.flatMap((item) =>
      hasSlug(item.data) ? [{ slug: item.data.slug, file: item.source.relativePath }] : [],
    );
    collector.addAll(findDuplicateSlugs(options.collection, slugSources));

    if (collector.hasErrors()) {
      copyErrors(options.context, collector);
      throw new ContentValidationFailure(collector);
    }

    return valid;
  });
}

function hasSlug(value: unknown): value is { slug: string } {
  return Boolean(
    value && typeof value === "object" && "slug" in value && typeof value.slug === "string",
  );
}

function toSourceError(collection: CollectionId, cause: unknown): ContentError {
  if (cause instanceof SourceAdapterError) {
    return {
      collection,
      file: cause.file,
      code: cause.code,
      message: cause.message,
    };
  }

  return {
    collection,
    file: "(collection)",
    code: "SOURCE_READ_FAILED",
    message: "An unexpected source adapter failure occurred.",
  };
}

function toCompilationErrors(
  collection: CollectionId,
  source: ContentSource,
  cause: unknown,
): readonly ContentError[] {
  if (cause instanceof MdxCompilationError && cause.issues.length > 0) {
    return cause.issues.map((item) => ({
      collection,
      file: source.relativePath,
      field: `body:${item.line}`,
      code: item.code,
      message: item.message,
    }));
  }

  return [
    {
      collection,
      file: source.relativePath,
      field: "body",
      code: diagnosticCodes.mdxCompileFailed,
      message: cause instanceof Error ? cause.message : "Content compilation failed.",
    },
  ];
}

function copyErrors(context: BuildContext, collector: DiagnosticCollector): void {
  context.diagnostics.addAll(collector.report().errors);
}
