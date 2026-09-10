import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseDocument } from "yaml";

const allowedMediaExtensions = ["avif", "jpeg", "jpg", "png", "svg", "webp"];

const scalar = (type, required = false, extra = {}) => ({ type, required, ...extra });
const list = (type, required = false, extra = {}) => ({ type, required, list: true, ...extra });

const imageContract = {
  type: "object",
  fields: {
    kind: scalar("string", true),
    src: scalar("image", true),
    alt: scalar("text", true),
    caption: scalar("text"),
    width: scalar("number", true),
    height: scalar("number", true),
  },
};

const collectionContracts = {
  projects: {
    path: "content/projects",
    fields: {
      title: scalar("string", true),
      slug: scalar("string", true),
      summary: scalar("text", true),
      featured: scalar("boolean", true),
      technologies: list("string", true),
      cover: { ...imageContract, required: true },
      status: scalar("select", true, {
        values: ["archived", "coursework", "prototype", "research", "shipped"],
      }),
      draft: scalar("boolean", true),
      demo: scalar("boolean", true),
      projectType: scalar("string"),
      startedAt: scalar("date"),
      completedAt: scalar("date"),
      repositoryUrl: scalar("string"),
      demoUrl: scalar("string"),
      gallery: {
        type: "object",
        list: true,
        fields: {
          kind: scalar("select", true, { values: ["image", "video"] }),
          src: scalar("string", true),
          poster: scalar("string"),
          alt: scalar("text", true),
          caption: scalar("text"),
          width: scalar("number"),
          height: scalar("number"),
        },
      },
      architecture: scalar("text"),
      decisions: list("text"),
      results: list("text"),
      retrospective: scalar("text"),
      body: scalar("rich-text", true),
    },
  },
  posts: {
    path: "content/blog",
    fields: {
      title: scalar("string", true),
      slug: scalar("string", true),
      description: scalar("text", true),
      publishedAt: scalar("date", true),
      draft: scalar("boolean", true),
      demo: scalar("boolean", true),
      tags: list("string"),
      cover: imageContract,
      updatedAt: scalar("date"),
      series: scalar("string"),
      showTableOfContents: scalar("boolean"),
      body: scalar("rich-text", true),
    },
  },
  reading: {
    path: "content/reading",
    fields: {
      title: scalar("string", true),
      slug: scalar("string", true),
      status: scalar("select", true, { values: ["completed", "queued", "reading"] }),
      sourceUrl: scalar("string", true),
      topics: list("string", true),
      draft: scalar("boolean", true),
      demo: scalar("boolean", true),
      authors: list("string"),
      year: scalar("number"),
      venue: scalar("string"),
      startedAt: scalar("date"),
      completedAt: scalar("date"),
      rating: scalar("number"),
      summary: scalar("text"),
      body: scalar("rich-text", false, { readonly: true }),
    },
  },
};

function finding(code, location, message) {
  return { code, location, message };
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeList(value) {
  if (value === true || isRecord(value)) return true;
  return false;
}

function sortedStrings(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? [...value].sort()
    : [];
}

function compareFields(actualFields, expectedFields, location, findings) {
  if (!Array.isArray(actualFields)) {
    findings.push(finding("CMS_FIELDS_REQUIRED", location, "fields must be an array."));
    return;
  }

  const actualByName = new Map();
  for (const field of actualFields) {
    if (!isRecord(field) || typeof field.name !== "string") {
      findings.push(finding("CMS_FIELD_INVALID", location, "Every field needs a string name."));
      continue;
    }
    if (actualByName.has(field.name)) {
      findings.push(
        finding("CMS_FIELD_DUPLICATE", `${location}.${field.name}`, "Field names must be unique."),
      );
    }
    actualByName.set(field.name, field);
  }

  for (const [name, contract] of Object.entries(expectedFields)) {
    const fieldLocation = `${location}.${name}`;
    const actual = actualByName.get(name);
    if (!actual) {
      findings.push(
        finding("CMS_FIELD_MISSING", fieldLocation, "Required schema field is absent."),
      );
      continue;
    }
    if (actual.type !== contract.type) {
      findings.push(
        finding(
          "CMS_FIELD_TYPE",
          fieldLocation,
          `Expected type ${contract.type}; received ${String(actual.type)}.`,
        ),
      );
    }
    if (Boolean(actual.required) !== Boolean(contract.required)) {
      findings.push(
        finding(
          "CMS_FIELD_REQUIRED_STATE",
          fieldLocation,
          `Expected required=${Boolean(contract.required)}.`,
        ),
      );
    }
    if (normalizeList(actual.list) !== Boolean(contract.list)) {
      findings.push(
        finding("CMS_FIELD_LIST_STATE", fieldLocation, `Expected list=${Boolean(contract.list)}.`),
      );
    }
    if (contract.readonly !== undefined && Boolean(actual.readonly) !== contract.readonly) {
      findings.push(
        finding(
          "CMS_FIELD_READONLY_STATE",
          fieldLocation,
          `Expected readonly=${contract.readonly}.`,
        ),
      );
    }
    if (contract.values) {
      const values = sortedStrings(actual.options?.values);
      if (JSON.stringify(values) !== JSON.stringify(contract.values)) {
        findings.push(
          finding(
            "CMS_FIELD_VALUES",
            fieldLocation,
            "Select values do not match the content schema.",
          ),
        );
      }
    }
    if (contract.fields) compareFields(actual.fields, contract.fields, fieldLocation, findings);
  }

  for (const name of actualByName.keys()) {
    if (!(name in expectedFields)) {
      findings.push(
        finding(
          "CMS_FIELD_UNEXPECTED",
          `${location}.${name}`,
          "Field is outside the strict schema.",
        ),
      );
    }
  }
}

function validateMedia(config, findings) {
  if (!Array.isArray(config.media) || config.media.length !== 1) {
    findings.push(
      finding("CMS_MEDIA_COUNT", "media", "Exactly one bounded project-media source is required."),
    );
    return;
  }
  const media = config.media[0];
  if (!isRecord(media)) {
    findings.push(finding("CMS_MEDIA_INVALID", "media[0]", "Media source must be an object."));
    return;
  }
  const expected = {
    name: "project_media",
    input: "public/media/projects",
    output: "/media/projects",
    rename: "safe",
  };
  for (const [key, value] of Object.entries(expected)) {
    if (media[key] !== value) {
      findings.push(
        finding("CMS_MEDIA_BOUNDARY", `media[0].${key}`, `Expected ${JSON.stringify(value)}.`),
      );
    }
  }
  if (JSON.stringify(sortedStrings(media.extensions)) !== JSON.stringify(allowedMediaExtensions)) {
    findings.push(
      finding(
        "CMS_MEDIA_EXTENSIONS",
        "media[0].extensions",
        "Media extensions must match the reviewed image allowlist.",
      ),
    );
  }
  if (media.actions !== undefined) {
    findings.push(
      finding("CMS_ACTION_FORBIDDEN", "media[0].actions", "Media actions are disabled."),
    );
  }
}

export function validatePagesCmsConfig(config) {
  const findings = [];
  if (!isRecord(config)) {
    return [finding("CMS_ROOT_INVALID", ".pages.yml", "Configuration root must be an object.")];
  }

  validateMedia(config, findings);

  if (!Array.isArray(config.content)) {
    findings.push(finding("CMS_CONTENT_REQUIRED", "content", "content must be an array."));
  } else {
    const collections = new Map();
    for (const entry of config.content) {
      if (!isRecord(entry) || typeof entry.name !== "string") {
        findings.push(
          finding("CMS_COLLECTION_INVALID", "content", "Every collection needs a string name."),
        );
        continue;
      }
      if (collections.has(entry.name)) {
        findings.push(
          finding(
            "CMS_COLLECTION_DUPLICATE",
            `content.${entry.name}`,
            "Collection names must be unique.",
          ),
        );
      }
      collections.set(entry.name, entry);
    }

    for (const [name, contract] of Object.entries(collectionContracts)) {
      const location = `content.${name}`;
      const entry = collections.get(name);
      if (!entry) {
        findings.push(
          finding("CMS_COLLECTION_MISSING", location, "Required collection is absent."),
        );
        continue;
      }
      if (entry.type !== "collection" || entry.path !== contract.path) {
        findings.push(
          finding(
            "CMS_COLLECTION_BOUNDARY",
            location,
            `Expected collection path ${contract.path}.`,
          ),
        );
      }
      if (entry.format !== "yaml-frontmatter") {
        findings.push(
          finding("CMS_COLLECTION_FORMAT", `${location}.format`, "Expected yaml-frontmatter."),
        );
      }
      if (entry.subfolders !== false) {
        findings.push(
          finding(
            "CMS_SUBFOLDERS_FORBIDDEN",
            `${location}.subfolders`,
            "Subfolders must be false.",
          ),
        );
      }
      if (entry.filename?.template !== "{slug}.mdx" || entry.filename?.field !== false) {
        findings.push(
          finding(
            "CMS_FILENAME_POLICY",
            `${location}.filename`,
            "Filename must use the hidden {slug}.mdx template.",
          ),
        );
      }
      if (entry.operations?.rename !== false) {
        findings.push(
          finding("CMS_RENAME_FORBIDDEN", `${location}.operations.rename`, "Rename must be false."),
        );
      }
      if (entry.actions !== undefined) {
        findings.push(
          finding(
            "CMS_ACTION_FORBIDDEN",
            `${location}.actions`,
            "Collection actions are disabled.",
          ),
        );
      }
      compareFields(entry.fields, contract.fields, `${location}.fields`, findings);
    }

    for (const name of collections.keys()) {
      if (!(name in collectionContracts)) {
        findings.push(
          finding(
            "CMS_COLLECTION_FORBIDDEN",
            `content.${name}`,
            "Collection is outside the approved authoring boundary.",
          ),
        );
      }
    }
  }

  if (config.actions !== undefined) {
    findings.push(
      finding(
        "CMS_ACTION_FORBIDDEN",
        "actions",
        "Repository actions, including deploy, are disabled.",
      ),
    );
  }
  if (config.settings?.content?.merge !== false) {
    findings.push(
      finding(
        "CMS_STRICT_SAVE_REQUIRED",
        "settings.content.merge",
        "Strict schema-only saves require merge=false.",
      ),
    );
  }

  return findings.sort((left, right) =>
    `${left.location}:${left.code}`.localeCompare(`${right.location}:${right.code}`),
  );
}

export function parsePagesCmsSource(source) {
  const document = parseDocument(source, { uniqueKeys: true });
  if (document.errors.length > 0) {
    return {
      config: undefined,
      findings: document.errors.map((error) =>
        finding("CMS_YAML_INVALID", ".pages.yml", error.message),
      ),
    };
  }
  const config = document.toJS();
  return { config, findings: validatePagesCmsConfig(config) };
}

export async function auditPagesCmsConfig(workspaceRoot = process.cwd()) {
  const configPath = path.join(workspaceRoot, ".pages.yml");
  try {
    const source = await readFile(configPath, "utf8");
    return parsePagesCmsSource(source).findings;
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return [finding("CMS_CONFIG_MISSING", ".pages.yml", "Pages CMS configuration is missing.")];
    }
    throw error;
  }
}

export function formatPagesCmsFindings(findings) {
  if (findings.length === 0) return "Pages CMS configuration passed.";
  return [
    `Pages CMS configuration failed with ${findings.length} issue(s):`,
    ...findings.map((item) => `- [${item.code}] ${item.location}: ${item.message}`),
  ].join("\n");
}
