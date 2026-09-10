import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import {
  auditPagesCmsConfig,
  formatPagesCmsFindings,
  parsePagesCmsSource,
  validatePagesCmsConfig,
} from "../../scripts/quality/pages-cms.mjs";

type MutableField = {
  name: string;
  type?: string;
  readonly?: boolean;
};

type MutableCollection = {
  name: string;
  type?: string;
  path?: string;
  subfolders?: boolean;
  filename?: unknown;
  operations?: Record<string, unknown>;
  actions?: unknown;
  fields: MutableField[];
};

type MutableCmsConfig = {
  media: Array<Record<string, unknown> & { extensions: string[] }>;
  content: MutableCollection[];
  actions?: unknown;
  settings: { content: { merge: boolean } };
};

describe("Pages CMS schema parity", () => {
  it("accepts the repository configuration", async () => {
    await expect(auditPagesCmsConfig()).resolves.toEqual([]);
    const source = await readFile(".pages.yml", "utf8");
    const result = parsePagesCmsSource(source);
    expect(result.findings).toEqual([]);
    expect(formatPagesCmsFindings(result.findings)).toBe("Pages CMS configuration passed.");
  });

  it("reports malformed YAML and a missing configuration", async () => {
    const malformed = parsePagesCmsSource("content: [");
    expect(malformed.config).toBeUndefined();
    expect(malformed.findings[0]?.code).toBe("CMS_YAML_INVALID");
    expect(formatPagesCmsFindings(malformed.findings)).toContain("failed with 1 issue(s)");

    await expect(auditPagesCmsConfig("Z:/missing-pages-cms-fixture")).resolves.toEqual([
      expect.objectContaining({ code: "CMS_CONFIG_MISSING" }),
    ]);
  });

  it("rejects unsafe roots, unexpected collections, actions, and schema drift", async () => {
    const source = await readFile(".pages.yml", "utf8");
    const parsed = parsePagesCmsSource(source);
    expect(parsed.config).toBeDefined();
    const config = structuredClone(parsed.config) as MutableCmsConfig;

    config.media[0].input = "public";
    config.media[0].extensions.push("pdf");
    config.media[0].actions = [{ workflow: "deploy.yml" }];
    config.actions = [{ workflow: "deploy.yml" }];
    config.settings.content.merge = true;
    config.content.push({ name: "site", type: "file", path: "src/config/site.ts", fields: [] });

    const projects = config.content.find((item) => item.name === "projects");
    expect(projects).toBeDefined();
    if (!projects) throw new Error("Projects fixture is missing.");
    projects.path = "src";
    projects.subfolders = true;
    projects.filename = "{slug}.md";
    projects.operations = projects.operations ?? {};
    projects.operations.rename = true;
    projects.actions = [{ workflow: "deploy.yml" }];
    projects.fields = projects.fields.filter((field) => field.name !== "slug");
    const title = projects.fields.find((field) => field.name === "title");
    expect(title).toBeDefined();
    if (!title) throw new Error("Title fixture is missing.");
    title.type = "number";
    projects.fields.push({ name: "secret", type: "string" });

    const codes = validatePagesCmsConfig(config).map((item) => item.code);
    expect(codes).toEqual(
      expect.arrayContaining([
        "CMS_ACTION_FORBIDDEN",
        "CMS_COLLECTION_BOUNDARY",
        "CMS_COLLECTION_FORBIDDEN",
        "CMS_FIELD_MISSING",
        "CMS_FIELD_TYPE",
        "CMS_FIELD_UNEXPECTED",
        "CMS_FILENAME_POLICY",
        "CMS_MEDIA_BOUNDARY",
        "CMS_MEDIA_EXTENSIONS",
        "CMS_RENAME_FORBIDDEN",
        "CMS_STRICT_SAVE_REQUIRED",
        "CMS_SUBFOLDERS_FORBIDDEN",
      ]),
    );
  });

  it("requires reading-note authoring to remain locked until its route is activated", async () => {
    const source = await readFile(".pages.yml", "utf8");
    const parsed = parsePagesCmsSource(source);
    const config = structuredClone(parsed.config) as MutableCmsConfig;
    const reading = config.content.find((item) => item.name === "reading");
    expect(reading).toBeDefined();
    if (!reading) throw new Error("Reading fixture is missing.");
    const body = reading.fields.find((field) => field.name === "body");
    expect(body).toBeDefined();
    if (!body) throw new Error("Body fixture is missing.");
    body.readonly = false;

    expect(validatePagesCmsConfig(config)).toContainEqual(
      expect.objectContaining({
        code: "CMS_FIELD_READONLY_STATE",
        location: "content.reading.fields.body",
      }),
    );
  });

  it("handles invalid roots and malformed collection entries deterministically", () => {
    expect(validatePagesCmsConfig(null)[0]?.code).toBe("CMS_ROOT_INVALID");
    const findings = validatePagesCmsConfig({
      media: [null],
      content: [null, { name: "projects", fields: "invalid" }],
      settings: {},
    });
    expect(findings.map((item) => item.code)).toEqual(
      expect.arrayContaining([
        "CMS_COLLECTION_INVALID",
        "CMS_COLLECTION_MISSING",
        "CMS_FIELDS_REQUIRED",
        "CMS_MEDIA_INVALID",
      ]),
    );
  });
});
