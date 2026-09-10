import "server-only";

import { readFile } from "node:fs/promises";

import type { ContributionCalendarData } from "../domain";
import { contributionCalendarSchema, validateWithSchema } from "../validation";

export class ContributionDataReader {
  readonly #file: string;
  constructor(file: string) {
    this.#file = file;
  }

  async readGenerated(): Promise<ContributionCalendarData | null> {
    const contents = await readFile(this.#file, "utf8").catch((error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (contents === null) return null;
    const input: unknown = JSON.parse(contents);
    const result = validateWithSchema(contributionCalendarSchema, input, {
      collection: "generated",
      file: "generated/contributions.json",
    });
    if (!result.success)
      throw new Error(
        result.errors.map((item) => `${item.field ?? "root"}: ${item.message}`).join("\n"),
      );
    return result.data;
  }
}
