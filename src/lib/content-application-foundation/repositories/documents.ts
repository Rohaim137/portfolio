import "server-only";

import { access } from "node:fs/promises";
import path from "node:path";

import type { AssetCheck, PublicDocument } from "../domain";
import { compareDocuments, isValidPublicDocumentPath } from "../policies";

export class DocumentRepository {
  readonly #workspaceRoot: string;
  readonly #documents: readonly PublicDocument[];

  constructor(workspaceRoot: string, documents: readonly PublicDocument[]) {
    this.#workspaceRoot = path.resolve(workspaceRoot);
    this.#documents = documents;
  }

  async list(): Promise<readonly PublicDocument[]> {
    const checks = await this.verifyConfiguredAssets();
    const missing = checks.filter((check) => !check.exists);
    if (missing.length > 0)
      throw new Error(
        `Configured public document assets are missing: ${missing.map((item) => item.file).join(", ")}`,
      );
    return [...this.#documents].sort(compareDocuments);
  }

  async verifyConfiguredAssets(): Promise<readonly AssetCheck[]> {
    return Promise.all(
      this.#documents.map(async (document) => {
        if (!isValidPublicDocumentPath(document.file))
          return { file: document.file, exists: false };
        const absolutePath = path.join(
          this.#workspaceRoot,
          "public",
          ...document.file.split("/").filter(Boolean),
        );
        const exists = await access(absolutePath).then(
          () => true,
          () => false,
        );
        return { file: document.file, exists };
      }),
    );
  }
}
