import "server-only";

import { compile } from "@mdx-js/mdx";

import type { CompiledMdx, ContentKind } from "../domain";
import { estimateReadingTime, extractHeadings } from "./derived";
import { inspectMdxSafety, type MdxSafetyIssue } from "./safety";

export type MdxCompileOptions = Readonly<{
  contentKind: ContentKind;
  componentNames: readonly string[];
}>;

export class MdxCompilationError extends Error {
  readonly issues: readonly MdxSafetyIssue[];

  constructor(message: string, issues: readonly MdxSafetyIssue[] = [], options?: ErrorOptions) {
    super(message, options);
    this.name = "MdxCompilationError";
    this.issues = issues;
  }
}

export class CuratedMdxCompiler {
  async compile(source: string, options: MdxCompileOptions): Promise<CompiledMdx> {
    const issues = inspectMdxSafety(source, options.componentNames);
    if (issues.length > 0) {
      throw new MdxCompilationError("MDX content failed the curated safety inspection.", issues);
    }

    try {
      const result = await compile(source, {
        format: "mdx",
        outputFormat: "function-body",
        development: false,
      });

      return {
        compiledSource: String(result.value),
        componentNames: Object.freeze([...options.componentNames]),
        headings: extractHeadings(source),
        readingTime: estimateReadingTime(source),
      };
    } catch (cause) {
      throw new MdxCompilationError("MDX content could not be compiled.", [], { cause });
    }
  }

  extractHeadings(source: string) {
    return extractHeadings(source);
  }

  estimateReadingTime(source: string) {
    return estimateReadingTime(source);
  }
}
