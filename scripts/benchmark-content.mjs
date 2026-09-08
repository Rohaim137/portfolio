import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { cpus, platform, release, tmpdir } from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { z } from "zod";

const shouldRun = process.argv.includes("--run");
const recordsPerCollection = 250;
const mediaReferences = 1_000;
const thresholdMs = 120_000;
const workspaceRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

if (!shouldRun) {
  console.log("Capacity benchmark is opt-in. Run: npm run benchmark:content -- --run");
  process.exit(0);
}

const fixtureRoot = await mkdtemp(path.join(tmpdir(), "portfolio-capacity-"));

try {
  const generationStart = performance.now();
  const fixtureCounts = await generateFixtures(fixtureRoot);
  const generationMs = performance.now() - generationStart;

  const validationStart = performance.now();
  const validatedRecords = await validateFixtures(fixtureRoot);
  const validationMs = performance.now() - validationStart;

  const buildStart = performance.now();
  const build = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
    cwd: workspaceRoot,
    encoding: "utf8",
    env: { ...process.env, NODE_ENV: "production" },
  });
  const buildMs = performance.now() - buildStart;

  if (build.status !== 0) {
    process.stderr.write(build.stdout ?? "");
    process.stderr.write(build.stderr ?? "");
    throw new Error(`Production build failed with exit code ${build.status ?? "unknown"}.`);
  }

  const totalMeasuredMs = validationMs + buildMs;
  const result = {
    environment: {
      node: process.version,
      platform: `${platform()} ${release()}`,
      architecture: process.arch,
      logicalCpuCount: cpus().length,
    },
    fixtures: {
      ...fixtureCounts,
      validatedRecords,
    },
    timingsMs: {
      fixtureGeneration: round(generationMs),
      validation: round(validationMs),
      productionBuild: round(buildMs),
      measuredTotal: round(totalMeasuredMs),
      dependencyInstallation: "excluded",
    },
    thresholdMs,
    withinThreshold: totalMeasuredMs <= thresholdMs,
  };

  console.log(JSON.stringify(result, null, 2));
  if (!result.withinThreshold) {
    process.exitCode = 1;
  }
} finally {
  await rm(fixtureRoot, { recursive: true, force: true });
}

async function generateFixtures(root) {
  const collections = ["projects", "blog", "reading"];
  await Promise.all(
    collections.map((collection) => mkdir(path.join(root, collection), { recursive: true })),
  );

  const writes = [];
  for (let index = 0; index < recordsPerCollection; index += 1) {
    const slug = `record-${String(index).padStart(3, "0")}`;
    const gallery = Array.from({ length: 4 }, (_, mediaIndex) => ({
      kind: "image",
      src: `/media/${slug}-${mediaIndex}.webp`,
      alt: `Deterministic fixture ${index}-${mediaIndex}`,
      width: 1200,
      height: 800,
    }));
    writes.push(
      writeFixture(root, "projects", slug, {
        title: `Project ${index}`,
        slug,
        summary: "Deterministic capacity fixture.",
        featured: index < 3,
        technologies: ["TypeScript"],
        cover: gallery[0],
        gallery,
        status: "prototype",
        draft: false,
        demo: true,
      }),
      writeFixture(root, "blog", slug, {
        title: `Post ${index}`,
        slug,
        description: "Deterministic capacity fixture.",
        publishedAt: "2026-01-01",
        draft: false,
        demo: true,
      }),
      writeFixture(root, "reading", slug, {
        title: `Reading ${index}`,
        slug,
        status: "queued",
        sourceUrl: `https://example.com/${slug}`,
        topics: ["systems"],
        draft: false,
        demo: false,
      }),
    );
  }
  await Promise.all(writes);

  return {
    recordsPerCollection,
    collections: collections.length,
    totalRecords: recordsPerCollection * collections.length,
    mediaReferences,
  };
}

async function writeFixture(root, collection, slug, frontMatter) {
  const contents = matter.stringify(
    "\n## Capacity fixture\n\nDeterministic benchmark content.\n",
    frontMatter,
  );
  await writeFile(path.join(root, collection, `${slug}.mdx`), contents, "utf8");
}

async function validateFixtures(root) {
  const baseSchema = z.strictObject({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    draft: z.boolean(),
    demo: z.boolean(),
  });
  const schemas = {
    projects: baseSchema.extend({
      summary: z.string().min(1),
      featured: z.boolean(),
      technologies: z.array(z.string()).min(1),
      cover: z.object({
        kind: z.literal("image"),
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      gallery: z.array(
        z.object({
          kind: z.literal("image"),
          src: z.string(),
          alt: z.string(),
          width: z.number(),
          height: z.number(),
        }),
      ),
      status: z.enum(["shipped", "prototype", "coursework", "research", "archived"]),
    }),
    blog: baseSchema.extend({ description: z.string().min(1), publishedAt: z.string() }),
    reading: baseSchema.extend({
      status: z.enum(["queued", "reading", "completed"]),
      sourceUrl: z.string(),
      topics: z.array(z.string()).min(1),
    }),
  };

  let count = 0;
  for (const [collection, schema] of Object.entries(schemas)) {
    for (let index = 0; index < recordsPerCollection; index += 1) {
      const slug = `record-${String(index).padStart(3, "0")}`;
      const contents = await readFile(path.join(root, collection, `${slug}.mdx`), "utf8");
      const parsed = matter(contents);
      schema.parse(parsed.data);
      if (!parsed.content.trim()) throw new Error(`${collection}/${slug}.mdx has no body.`);
      count += 1;
    }
  }
  return count;
}

function round(value) {
  return Math.round(value * 100) / 100;
}
