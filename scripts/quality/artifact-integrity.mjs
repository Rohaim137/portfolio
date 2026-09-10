import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

const fixedRoutes = new Set(["/", "/about/", "/blog/", "/docs/", "/projects/", "/reading/"]);
const ignoredHtmlRoutes = new Set(["/404/", "/_not-found/"]);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".svg", ".txt", ".xml"]);
const prohibitedRuntimeExtensions = new Set([
  ".env",
  ".exe",
  ".key",
  ".pem",
  ".php",
  ".py",
  ".rb",
  ".sh",
]);
const contentRules = [
  ["ARTIFACT_PRIVATE_KEY", /-----BEGIN (?:EC |OPENSSH |RSA )?PRIVATE KEY-----/u],
  ["ARTIFACT_AWS_KEY", /\bAKIA[0-9A-Z]{16}\b/u],
  ["ARTIFACT_GITHUB_TOKEN", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/u],
  ["ARTIFACT_ABSOLUTE_PATH", /(?:[A-Za-z]:\\Users\\|\/home\/[^/]+\/|\/Users\/[^/]+\/)/u],
  ["ARTIFACT_LOCAL_ORIGIN", /https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::\d+)?/iu],
  [
    "ARTIFACT_PLACEHOLDER_ORIGIN",
    /https?:\/\/(?:[^/]+\.)?(?:example\.(?:com|net|org)|placehold\.co|placeholder\.com)(?:\/|["'])/iu,
  ],
];

function finding(code, file, message) {
  return { code, file, message };
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

async function walkFiles(root) {
  const files = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }
  await visit(root);
  return files.sort();
}

function htmlFileToRoute(relativeFile) {
  if (relativeFile === "index.html") return "/";
  if (relativeFile === "404.html") return "/404/";
  return `/${relativeFile.replace(/\/index\.html$/u, "/")}`;
}

async function readContentRecords(workspaceRoot) {
  const records = [];
  for (const collection of ["projects", "blog", "reading"]) {
    const root = path.join(workspaceRoot, "content", collection);
    let entries;
    try {
      entries = await readdir(root, { withFileTypes: true });
    } catch (error) {
      if (error && typeof error === "object" && error.code === "ENOENT") continue;
      throw error;
    }
    for (const entry of entries) {
      if (!entry.isFile() || !/\.mdx?$/iu.test(entry.name)) continue;
      const relativeFile = toPosix(path.relative(workspaceRoot, path.join(root, entry.name)));
      const parsed = matter(await readFile(path.join(root, entry.name), "utf8"));
      records.push({
        collection,
        relativeFile,
        slug: typeof parsed.data.slug === "string" ? parsed.data.slug : path.parse(entry.name).name,
        title: typeof parsed.data.title === "string" ? parsed.data.title : undefined,
        draft: parsed.data.draft === true,
        hasBody: parsed.content.trim().length > 0,
      });
    }
  }
  return records;
}

export async function deriveExpectedRoutes(workspaceRoot = process.cwd()) {
  const expected = new Set(fixedRoutes);
  const records = await readContentRecords(workspaceRoot);
  for (const record of records) {
    if (record.draft || !record.hasBody) continue;
    if (record.collection === "projects") expected.add(`/projects/${record.slug}/`);
    if (record.collection === "blog") expected.add(`/blog/${record.slug}/`);
    if (record.collection === "reading") expected.add(`/reading/${record.slug}/`);
  }
  return { expected, records };
}

export async function auditArtifactIntegrity({
  workspaceRoot = process.cwd(),
  outputRoot = path.join(workspaceRoot, "out"),
} = {}) {
  const findings = [];
  try {
    if (!(await stat(outputRoot)).isDirectory()) throw new Error("Output path is not a directory.");
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return [finding("ARTIFACT_OUTPUT_MISSING", "out", "Static output directory is missing.")];
    }
    throw error;
  }

  const { expected, records } = await deriveExpectedRoutes(workspaceRoot);
  const files = await walkFiles(outputRoot);
  const htmlRoutes = new Map();
  for (const absolute of files) {
    const relativeFile = toPosix(path.relative(outputRoot, absolute));
    const extension = path.extname(relativeFile).toLowerCase();
    if (
      prohibitedRuntimeExtensions.has(extension) ||
      path.basename(relativeFile).startsWith(".env")
    ) {
      findings.push(
        finding(
          "ARTIFACT_RUNTIME_FILE",
          relativeFile,
          "Prohibited runtime or sensitive file type is present.",
        ),
      );
    }
    if (extension === ".html") htmlRoutes.set(htmlFileToRoute(relativeFile), relativeFile);
    if (!textExtensions.has(extension)) continue;
    const fileStat = await stat(absolute);
    if (fileStat.size > 5_000_000) continue;
    const source = await readFile(absolute, "utf8");
    for (const [code, pattern] of contentRules) {
      if (pattern.test(source)) {
        findings.push(
          finding(code, relativeFile, "Prohibited signature detected; value withheld."),
        );
      }
    }
  }

  for (const route of expected) {
    if (!htmlRoutes.has(route)) {
      findings.push(
        finding("ARTIFACT_ROUTE_MISSING", route, "Expected static HTML route is missing."),
      );
    }
  }
  for (const [route, file] of htmlRoutes) {
    if (!expected.has(route) && !ignoredHtmlRoutes.has(route)) {
      findings.push(finding("ARTIFACT_ROUTE_UNEXPECTED", file, `Unexpected HTML route ${route}.`));
    }
  }

  const searchableFiles = files.filter((file) =>
    textExtensions.has(path.extname(file).toLowerCase()),
  );
  for (const record of records.filter((item) => item.draft)) {
    const markers = [record.slug, record.title].filter(Boolean);
    for (const absolute of searchableFiles) {
      const source = await readFile(absolute, "utf8");
      if (markers.some((marker) => source.includes(marker))) {
        findings.push(
          finding(
            "ARTIFACT_DRAFT_EXPOSED",
            toPosix(path.relative(outputRoot, absolute)),
            `Draft marker from ${record.relativeFile} is present.`,
          ),
        );
        break;
      }
    }
  }

  return findings.sort((left, right) =>
    `${left.file}:${left.code}`.localeCompare(`${right.file}:${right.code}`),
  );
}

export function formatArtifactFindings(findings) {
  if (findings.length === 0) return "Static artifact integrity passed.";
  return [
    `Static artifact integrity failed with ${findings.length} issue(s):`,
    ...findings.map((item) => `- [${item.code}] ${item.file}: ${item.message}`),
  ].join("\n");
}
