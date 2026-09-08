import "server-only";

import { readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { assertSupportedExtension, isPathWithin, toDiagnosticPath } from "./path-policy";
import type { CollectionRoot, SourceDescriptor } from "./types";
import { SourceAdapterError, supportedContentExtensions } from "./types";

export type CollectionScannerOptions = Readonly<{
  workspaceRoot: string;
  roots: readonly CollectionRoot[];
}>;

export class CollectionScanner {
  readonly #workspaceRoot: string;
  readonly #roots: readonly CollectionRoot[];

  constructor(options: CollectionScannerOptions) {
    this.#workspaceRoot = path.resolve(options.workspaceRoot);
    this.#roots = options.roots.map((root) => ({
      ...root,
      absolutePath: path.resolve(root.absolutePath),
    }));

    for (const root of this.#roots) {
      if (!isPathWithin(this.#workspaceRoot, root.absolutePath)) {
        throw new SourceAdapterError(
          "SOURCE_ROOT_OUTSIDE_WORKSPACE",
          toDiagnosticPath(this.#workspaceRoot, root.absolutePath),
          "A configured collection root is outside the workspace.",
        );
      }
    }
  }

  async scan(collection: CollectionRoot["collection"]): Promise<readonly SourceDescriptor[]> {
    const root = this.#roots.find((candidate) => candidate.collection === collection);

    if (!root) {
      return [];
    }

    const realRoot = await realpath(root.absolutePath).catch((cause: unknown) => {
      throw new SourceAdapterError(
        "SOURCE_READ_FAILED",
        toDiagnosticPath(this.#workspaceRoot, root.absolutePath),
        "The configured collection root could not be read.",
        { cause },
      );
    });

    const files = await this.#walk(root, root.absolutePath, realRoot);
    return files.sort((left, right) => compareText(left.relativePath, right.relativePath));
  }

  async #walk(
    root: CollectionRoot,
    directory: string,
    realRoot: string,
  ): Promise<SourceDescriptor[]> {
    const entries = await readdir(directory, { withFileTypes: true }).catch((cause: unknown) => {
      throw new SourceAdapterError(
        "SOURCE_READ_FAILED",
        toDiagnosticPath(this.#workspaceRoot, directory),
        "A content directory could not be enumerated.",
        { cause },
      );
    });

    const descriptors: SourceDescriptor[] = [];
    const sortedEntries = [...entries].sort((left, right) => compareText(left.name, right.name));

    for (const entry of sortedEntries) {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        descriptors.push(...(await this.#walk(root, absolutePath, realRoot)));
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();
      if (
        !supportedContentExtensions.includes(
          extension as (typeof supportedContentExtensions)[number],
        )
      ) {
        continue;
      }

      const realCandidate = await realpath(absolutePath).catch((cause: unknown) => {
        throw new SourceAdapterError(
          "SOURCE_READ_FAILED",
          toDiagnosticPath(this.#workspaceRoot, absolutePath),
          "A discovered content source could not be resolved.",
          { cause },
        );
      });

      if (!isPathWithin(realRoot, realCandidate)) {
        throw new SourceAdapterError(
          "SOURCE_REAL_PATH_OUTSIDE_ROOT",
          toDiagnosticPath(this.#workspaceRoot, absolutePath),
          "A discovered symbolic link resolves outside its collection root.",
        );
      }

      descriptors.push({
        collection: root.collection,
        absolutePath,
        relativePath: toDiagnosticPath(this.#workspaceRoot, absolutePath),
        filenameStem: path.basename(entry.name, extension),
        extension: assertSupportedExtension(entry.name),
      });
    }

    return descriptors;
  }
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
