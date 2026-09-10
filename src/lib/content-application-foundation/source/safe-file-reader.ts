import "server-only";

import { readFile, realpath } from "node:fs/promises";
import path from "node:path";

import { assertSupportedExtension, isPathWithin, toDiagnosticPath } from "./path-policy";
import type { CollectionRoot, ReadSource, SourceDescriptor } from "./types";
import { SourceAdapterError } from "./types";

export type SafeFileReaderOptions = Readonly<{
  workspaceRoot: string;
  roots: readonly CollectionRoot[];
}>;

export class SafeFileReader {
  readonly #workspaceRoot: string;
  readonly #roots: ReadonlyMap<CollectionRoot["collection"], string>;

  constructor(options: SafeFileReaderOptions) {
    this.#workspaceRoot = path.resolve(options.workspaceRoot);
    this.#roots = new Map(
      options.roots.map((root) => [root.collection, path.resolve(root.absolutePath)] as const),
    );
  }

  async read(descriptor: SourceDescriptor): Promise<ReadSource> {
    const root = this.#roots.get(descriptor.collection);
    const diagnosticPath = toDiagnosticPath(this.#workspaceRoot, descriptor.absolutePath);

    if (!root || !isPathWithin(root, path.resolve(descriptor.absolutePath))) {
      throw new SourceAdapterError(
        "SOURCE_PATH_OUTSIDE_ROOT",
        diagnosticPath,
        "The requested source is outside its configured collection root.",
      );
    }

    assertSupportedExtension(descriptor.absolutePath);

    try {
      const [realRoot, realCandidate] = await Promise.all([
        realpath(root),
        realpath(descriptor.absolutePath),
      ]);

      if (!isPathWithin(realRoot, realCandidate)) {
        throw new SourceAdapterError(
          "SOURCE_REAL_PATH_OUTSIDE_ROOT",
          diagnosticPath,
          "The requested source resolves outside its collection root.",
        );
      }

      return {
        descriptor: { ...descriptor, relativePath: diagnosticPath },
        contents: await readFile(realCandidate, "utf8"),
      };
    } catch (cause) {
      if (cause instanceof SourceAdapterError) {
        throw cause;
      }

      throw new SourceAdapterError(
        "SOURCE_READ_FAILED",
        diagnosticPath,
        "The requested content source could not be read.",
        { cause },
      );
    }
  }
}
