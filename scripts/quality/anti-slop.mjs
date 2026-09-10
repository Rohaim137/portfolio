import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const prohibitedColors = [
  "#3730a3",
  "#4338ca",
  "#4f46e5",
  "#6366f1",
  "#7c3aed",
  "#8b5cf6",
  "#a855f7",
];
const emojiIcons = /[✨🚀🎯⚡🔥💡]/u;
const externalPlaceholderMedia =
  /https?:\/\/(?:[^/]+\.)?(?:unsplash\.com|placehold\.co|placekitten\.com|picsum\.photos)/iu;
const fillerCopy =
  /\b(?:lorem ipsum|feature (?:one|two|three)|placeholder text|sample content)\b/iu;
const inventedMetric =
  /\b(?:\d+(?:\.\d+)?\s*[x×]\s+(?:faster|more productive)|99\.9%\s+uptime)\b/iu;
const gradient = /\b(?:linear|radial|conic)-gradient\s*\(/iu;
const textExtensions = new Set([".css", ".md", ".mdx", ".ts", ".tsx"]);
const requiredIds = new Map([
  ["src/app/about/page.tsx", ["about-page"]],
  ["src/app/blog/page.tsx", ["blog-index"]],
  ["src/app/blog/[slug]/page.tsx", ["blog-article"]],
  ["src/app/docs/page.tsx", ["documents-index"]],
  ["src/app/not-found.tsx", ["not-found"]],
  ["src/app/projects/page.tsx", ["projects-index"]],
  ["src/app/projects/[slug]/page.tsx", ["project-detail"]],
  ["src/app/reading/page.tsx", ["reading-index"]],
  [
    "src/components/home/home-page-content.tsx",
    [
      "home-introduction",
      "home-focus",
      "home-projects",
      "home-writing",
      "home-reading",
      "home-github",
      "home-social",
    ],
  ],
  ["src/components/projects/project-filter.tsx", ["projects-filters"]],
  ["src/components/projects/project-gallery.tsx", ["project-gallery"]],
]);

function finding(code, file, message) {
  return { code, file, message };
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

async function walkReviewedFiles(workspaceRoot) {
  const files = [];
  for (const rootName of ["src", "content"]) {
    const root = path.join(workspaceRoot, rootName);
    async function visit(directory) {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        const absolute = path.join(directory, entry.name);
        if (entry.isDirectory()) await visit(absolute);
        else if (entry.isFile() && textExtensions.has(path.extname(entry.name).toLowerCase())) {
          files.push(absolute);
        }
      }
    }
    await visit(root);
  }
  return files.sort();
}

export function auditTextPolicies(relativeFile, source) {
  const findings = [];
  const lower = source.toLowerCase();
  for (const color of prohibitedColors) {
    if (lower.includes(color)) {
      findings.push(finding("SLOP_INDIGO_VIOLET", relativeFile, `Prohibited color ${color}.`));
    }
  }
  if (gradient.test(source)) {
    findings.push(finding("SLOP_GRADIENT", relativeFile, "CSS gradient is prohibited."));
  }
  if (externalPlaceholderMedia.test(source)) {
    findings.push(
      finding("SLOP_PLACEHOLDER_MEDIA", relativeFile, "External placeholder media is prohibited."),
    );
  }
  if (fillerCopy.test(source)) {
    findings.push(
      finding("SLOP_FILLER_COPY", relativeFile, "Generic filler phrase is prohibited."),
    );
  }
  if (inventedMetric.test(source)) {
    findings.push(
      finding("SLOP_INVENTED_METRIC", relativeFile, "Unverified metric signature is prohibited."),
    );
  }
  if (path.extname(relativeFile).toLowerCase() === ".tsx") {
    const iconContexts = source.matchAll(
      /<(?:h[1-6]|button|li)\b[^>]*>([\s\S]*?)<\/(?:h[1-6]|button|li)>|className=["'][^"']*icon[^"']*["'][^>]*>([\s\S]*?)<\//giu,
    );
    if ([...iconContexts].some((match) => emojiIcons.test(match[0]))) {
      findings.push(finding("SLOP_EMOJI_ICON", relativeFile, "Emoji feature icon is prohibited."));
    }
  }
  return findings;
}

export function auditCssPolicies(relativeFile, source) {
  const findings = [];
  const withoutRoot = source.replace(/:root\s*\{[\s\S]*?\}/u, "");
  if (/#[0-9a-f]{3,8}\b/iu.test(withoutRoot)) {
    findings.push(
      finding(
        "SLOP_TOKEN_BYPASS",
        relativeFile,
        "Raw hex color appears outside the :root token block.",
      ),
    );
  }
  if (!/h1\s*,\s*h2\s*\{[^}]*font-family:\s*var\(--font-display\)/su.test(source)) {
    findings.push(
      finding("SLOP_DISPLAY_FONT", relativeFile, "h1 and h2 must use the display-font token."),
    );
  }
  for (const block of source.matchAll(/[^{}]+\{[^{}]*\}/gu)) {
    if (/border-left\s*:/iu.test(block[0]) && /border-radius\s*:/iu.test(block[0])) {
      findings.push(
        finding(
          "SLOP_LEFT_BORDER_CARD",
          relativeFile,
          "A rule combines a left border with rounded corners.",
        ),
      );
    }
  }
  return findings;
}

export function auditRequiredIds(files) {
  const findings = [];
  for (const [relativeFile, ids] of requiredIds) {
    const source = files.get(relativeFile);
    if (source === undefined) {
      findings.push(
        finding("SLOP_ID_FILE_MISSING", relativeFile, "Required major-section file is missing."),
      );
      continue;
    }
    for (const id of ids) {
      if (!source.includes(`data-od-id="${id}"`)) {
        findings.push(
          finding(
            "SLOP_SECTION_ID",
            relativeFile,
            `Required major-section data-od-id ${id} is missing.`,
          ),
        );
      }
    }
  }
  return findings;
}

export async function auditAntiSlop(workspaceRoot = process.cwd()) {
  const files = new Map();
  for (const absolute of await walkReviewedFiles(workspaceRoot)) {
    const relativeFile = toPosix(path.relative(workspaceRoot, absolute));
    files.set(relativeFile, await readFile(absolute, "utf8"));
  }
  const findings = [];
  for (const [relativeFile, source] of files) {
    findings.push(...auditTextPolicies(relativeFile, source));
    if (path.extname(relativeFile).toLowerCase() === ".css") {
      findings.push(...auditCssPolicies(relativeFile, source));
    }
  }
  findings.push(...auditRequiredIds(files));
  return findings.sort((left, right) =>
    `${left.file}:${left.code}`.localeCompare(`${right.file}:${right.code}`),
  );
}

export function formatAntiSlopFindings(findings) {
  if (findings.length === 0) return "Detectable anti-slop rules passed.";
  return [
    `Detectable anti-slop rules failed with ${findings.length} issue(s):`,
    ...findings.map((item) => `- [${item.code}] ${item.file}: ${item.message}`),
  ].join("\n");
}
