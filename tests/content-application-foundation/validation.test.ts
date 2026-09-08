import { describe, expect, it } from "vitest";

import {
  DiagnosticCollector,
  SchemaRegistry,
} from "@/lib/content-application-foundation/validation";
import {
  contributionCalendarSchema,
  postFrontMatterSchema,
  projectFrontMatterSchema,
  publicDocumentManifestSchema,
  readingFrontMatterSchema,
  siteConfigSchema,
  validateWithSchema,
} from "@/lib/content-application-foundation/validation";

describe("schema registry", () => {
  it("normalizes an omitted demo flag and rejects malformed records with field context", () => {
    const valid = projectFrontMatterSchema.parse({
      title: "Typed content",
      slug: "typed-content",
      summary: "A typed content pipeline.",
      featured: true,
      technologies: ["TypeScript"],
      cover: { kind: "image", src: "/media/cover.svg", alt: "Diagram", width: 1200, height: 800 },
      status: "prototype",
      draft: false,
    });
    expect(valid.demo).toBe(false);

    expect(
      validateWithSchema(publicDocumentManifestSchema, [], {
        collection: "documents",
        file: "src/config/documents.ts",
      }),
    ).toEqual({ success: true, data: [] });

    const invalid = validateWithSchema(
      postFrontMatterSchema,
      { title: "Incomplete" },
      { collection: "blog", file: "content/blog/incomplete.mdx" },
    );
    expect(invalid.success).toBe(false);
    if (!invalid.success) expect(invalid.errors.some((error) => error.field === "slug")).toBe(true);
    const rootInvalid = validateWithSchema(
      publicDocumentManifestSchema,
      {},
      {
        collection: "documents",
        file: "documents.ts",
      },
    );
    if (!rootInvalid.success) expect(rootInvalid.errors[0].field).toBeUndefined();
  });

  it("exposes schemas for every Unit 1 input category", () => {
    expect(readingFrontMatterSchema.safeParse({}).success).toBe(false);
    expect(publicDocumentManifestSchema.parse([])).toEqual([]);
    expect(siteConfigSchema.safeParse({}).success).toBe(false);
    expect(
      contributionCalendarSchema.safeParse({
        username: "Rohaim137",
        generatedAt: "2026-09-08T00:00:00Z",
        weeks: [],
      }).success,
    ).toBe(true);

    const registry = new SchemaRegistry();
    expect(registry.safeParse("documents", [], "documents.ts")).toEqual({
      success: true,
      data: [],
    });
    expect(registry.safeParse("site", {}, "site.ts").success).toBe(false);
  });
});

describe("aggregated diagnostics", () => {
  it("sorts and groups errors without discarding later issues", () => {
    const collector = new DiagnosticCollector();
    collector.add({
      collection: "projects",
      file: "z.mdx",
      field: "slug",
      code: "B",
      message: "Second",
    });
    collector.add({
      collection: "blog",
      file: "a.mdx",
      field: "title",
      code: "A",
      message: "First",
    });
    expect(collector.report().errors.map((error) => error.collection)).toEqual([
      "projects",
      "blog",
    ]);
    expect(collector.format()).toContain("2 issue(s)");
    expect(collector.format()).toContain("z.mdx");
    expect(collector.format()).toContain("a.mdx");

    const empty = new DiagnosticCollector();
    expect(empty.hasErrors()).toBe(false);
    expect(empty.format()).toBe("Content validation passed.");
    empty.addAll([{ file: "unknown", code: "UNKNOWN", message: "Unknown collection" }]);
    expect(empty.report().errors[0].collection).toBeUndefined();
    empty.add({
      collection: "outside" as never,
      file: "outside",
      code: "OUTSIDE",
      message: "Outside configured order",
    });
    expect(empty.report().errors).toHaveLength(2);
  });
});
