import { createHash } from "node:crypto";

export type BuildMemoStats = Readonly<{
  hits: number;
  misses: number;
  compilerCalls: number;
  entries: number;
}>;

export class BuildMemo {
  readonly #entries = new Map<string, Promise<unknown>>();
  #hits = 0;
  #misses = 0;
  #compilerCalls = 0;

  async getOrCreate<T>(key: string, factory: () => Promise<T>): Promise<T> {
    const existing = this.#entries.get(key);
    if (existing) {
      this.#hits += 1;
      return existing as Promise<T>;
    }

    this.#misses += 1;
    const pending = factory().catch((error: unknown) => {
      this.#entries.delete(key);
      throw error;
    });
    this.#entries.set(key, pending);
    return pending;
  }

  recordCompilerCall(): void {
    this.#compilerCalls += 1;
  }

  stats(): BuildMemoStats {
    return Object.freeze({
      hits: this.#hits,
      misses: this.#misses,
      compilerCalls: this.#compilerCalls,
      entries: this.#entries.size,
    });
  }

  clear(): void {
    this.#entries.clear();
    this.#hits = 0;
    this.#misses = 0;
    this.#compilerCalls = 0;
  }
}

export function contentFingerprint(
  source: string,
  options: Readonly<Record<string, unknown>> = {},
): string {
  return createHash("sha256")
    .update(source)
    .update("\0")
    .update(stableSerialize(options))
    .digest("hex");
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableSerialize(record[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value) ?? "undefined";
}
