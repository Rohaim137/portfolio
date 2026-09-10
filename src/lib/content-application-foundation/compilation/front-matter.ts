import "server-only";

import matter from "gray-matter";

import type { ContentError, ContentSource } from "../domain";
import type { ReadSource } from "../source";
import { diagnosticCodes } from "../validation";

export type FrontMatterResult =
  | Readonly<{ success: true; source: ContentSource }>
  | Readonly<{ success: false; errors: readonly ContentError[] }>;

export function parseFrontMatter(input: ReadSource): FrontMatterResult {
  try {
    const parsed = matter(input.contents);

    return {
      success: true,
      source: {
        collection: input.descriptor.collection,
        relativePath: input.descriptor.relativePath,
        filenameStem: input.descriptor.filenameStem,
        frontMatter: parsed.data,
        body: parsed.content,
      },
    };
  } catch {
    return {
      success: false,
      errors: [
        {
          collection: input.descriptor.collection,
          file: input.descriptor.relativePath,
          code: diagnosticCodes.frontMatterParseFailed,
          message: "Front matter could not be parsed.",
        },
      ],
    };
  }
}
