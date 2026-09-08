import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import type { SiteConfig } from "@/lib/content-application-foundation/domain";
import {
  CuratedMdxCompiler,
  inspectMdxSafety,
} from "@/lib/content-application-foundation/compilation";
import {
  DocumentRepository,
  PostRepository,
  ProjectRepository,
  ReadingRepository,
} from "@/lib/content-application-foundation/repositories";
import {
  BoundedWorkScheduler,
  BuildMemo,
  MemoizedMdxCompiler,
  createBuildContext,
} from "@/lib/content-application-foundation/runtime";
import {
  CollectionScanner,
  SafeFileReader,
  type CollectionRoot,
  type SourceDescriptor,
} from "@/lib/content-application-foundation/source";
import { PortfolioQueryService } from "@/lib/content-application-foundation/services";

const temporaryRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe("source adapters", () => {
  it("enumerates supported files deterministically and ignores unsupported files", async () => {
    const workspace = await makeWorkspace();
    const projects = path.join(workspace, "content", "projects");
    await writeFile(path.join(projects, "z-last.mdx"), "# Last", "utf8");
    await writeFile(path.join(projects, "a-first.md"), "# First", "utf8");
    await writeFile(path.join(projects, "notes.txt"), "Not content", "utf8");

    const scanner = new CollectionScanner({
      workspaceRoot: workspace,
      roots: [{ collection: "projects", absolutePath: projects }],
    });

    expect((await scanner.scan("projects")).map((item) => item.filenameStem)).toEqual([
      "a-first",
      "z-last",
    ]);
  });

  it("rejects lexical traversal and a junction or symlink that resolves outside the root", async () => {
    const workspace = await makeWorkspace();
    const root = path.join(workspace, "content", "projects");
    const outside = await makeWorkspace();
    const outsideFile = path.join(outside, "escape.mdx");
    await writeFile(outsideFile, "# Escape", "utf8");

    const roots: readonly CollectionRoot[] = [{ collection: "projects", absolutePath: root }];
    const reader = new SafeFileReader({ workspaceRoot: workspace, roots });
    const traversal: SourceDescriptor = {
      collection: "projects",
      absolutePath: outsideFile,
      relativePath: "../escape.mdx",
      filenameStem: "escape",
      extension: ".mdx",
    };
    await expect(reader.read(traversal)).rejects.toMatchObject({
      code: "SOURCE_PATH_OUTSIDE_ROOT",
    });

    const linkedDirectory = path.join(root, "linked");
    await symlink(outside, linkedDirectory, "junction");
    const linked: SourceDescriptor = {
      ...traversal,
      absolutePath: path.join(linkedDirectory, "escape.mdx"),
      relativePath: "content/projects/linked/escape.mdx",
    };
    await expect(reader.read(linked)).rejects.toMatchObject({
      code: "SOURCE_REAL_PATH_OUTSIDE_ROOT",
    });
  });
});

describe("compilation, caching, and bounded work", () => {
  it("compiles curated content and rejects unsafe constructs", async () => {
    const compiler = new CuratedMdxCompiler();
    const compiled = await compiler.compile("## A heading\n\nUseful prose.", {
      contentKind: "post",
      componentNames: ["Note"],
    });
    expect(compiled.headings).toEqual([{ depth: 2, text: "A heading", anchor: "a-heading" }]);
    expect(compiled.readingTime.minutes).toBe(1);

    expect(inspectMdxSafety("export const secret = true", [])).toMatchObject([
      { code: "MDX_ESM_FORBIDDEN" },
    ]);
    expect(inspectMdxSafety("<Unknown />", ["Note"])).toMatchObject([
      { code: "MDX_COMPONENT_UNDECLARED" },
    ]);
  });

  it("deduplicates concurrent compiler work and preserves scheduled result order", async () => {
    const memo = new BuildMemo();
    const compiler = new MemoizedMdxCompiler(memo);
    await Promise.all([
      compiler.compile("## Cached", { contentKind: "post", componentNames: [] }),
      compiler.compile("## Cached", { contentKind: "post", componentNames: [] }),
    ]);
    expect(memo.stats()).toMatchObject({ hits: 1, misses: 1, compilerCalls: 1 });

    const scheduler = new BoundedWorkScheduler(2);
    const output = await scheduler.map([30, 5, 15], async (delay, index) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return index;
    });
    expect(output).toEqual([0, 1, 2]);
    expect(scheduler.stats().peakActive).toBeLessThanOrEqual(2);
  });
});

describe("repositories and route services", () => {
  it("aggregates malformed content across files", async () => {
    const workspace = await makeWorkspace();
    const blog = path.join(workspace, "content", "blog");
    await writeFile(path.join(blog, "a.mdx"), "---\ntitle: First\n---\nBody", "utf8");
    await writeFile(path.join(blog, "z.mdx"), "---\ntitle: Second\n---\nBody", "utf8");
    const context = createBuildContext({
      workspaceRoot: workspace,
      mode: "test",
      roots: [{ collection: "blog", absolutePath: blog }],
    });

    await expect(new PostRepository(context).list()).rejects.toMatchObject({
      errors: expect.arrayContaining([
        expect.objectContaining({ file: "content/blog/a.mdx" }),
        expect.objectContaining({ file: "content/blog/z.mdx" }),
      ]),
    });
  });

  it("verifies explicit public assets, static slugs, and serializable route models", async () => {
    const workspace = await makeWorkspace();
    const projectsRoot = path.join(workspace, "content", "projects");
    await writeFile(
      path.join(projectsRoot, "demo-project.mdx"),
      `---
title: Demo project
slug: demo-project
summary: A transparent demonstration of the typed content system.
featured: true
technologies:
  - TypeScript
cover:
  kind: image
  src: /media/demo.svg
  alt: Demonstration diagram
  width: 1200
  height: 800
status: prototype
draft: false
demo: true
---
## Overview

This is deliberately labelled demonstration content.
`,
      "utf8",
    );
    const publicDirectory = path.join(workspace, "public", "documents");
    await mkdir(publicDirectory, { recursive: true });
    await writeFile(path.join(publicDirectory, "public-note.pdf"), "public", "utf8");

    const context = createBuildContext({
      workspaceRoot: workspace,
      mode: "test",
      roots: [{ collection: "projects", absolutePath: projectsRoot }],
    });
    const projects = new ProjectRepository(context);
    expect(await projects.getStaticSlugs()).toEqual(["demo-project"]);
    expect(await projects.getBySlug("unknown")).toBeNull();

    const documents = new DocumentRepository(workspace, [
      {
        title: "Public note",
        file: "/documents/public-note.pdf",
        description: "A deliberately public test document.",
      },
    ]);
    expect(await documents.verifyConfiguredAssets()).toEqual([
      { file: "/documents/public-note.pdf", exists: true },
    ]);

    const site = makeSite();
    const query = new PortfolioQueryService({
      site,
      projects,
      posts: new PostRepository(context),
      reading: new ReadingRepository(context),
      documents,
    });
    const serialized = JSON.stringify(await query.getHomePage());
    expect(serialized).not.toContain(workspace);
    expect(serialized.toLowerCase()).not.toContain("token");
    expect(serialized).toContain('"demo":true');
  });
});

async function makeWorkspace(): Promise<string> {
  const workspace = await mkdtemp(path.join(tmpdir(), "portfolio-unit-1-"));
  temporaryRoots.push(workspace);
  await Promise.all(
    ["projects", "blog", "reading"].map((collection) =>
      mkdir(path.join(workspace, "content", collection), { recursive: true }),
    ),
  );
  return workspace;
}

function makeSite(): SiteConfig {
  return {
    title: "Portfolio",
    defaultDescription: "Description",
    defaultSocialImage: "/media/social/default.svg",
    navigation: [],
    publicProfile: {},
    githubUsername: "Rohaim137",
    destinations: [{ kind: "active", label: "GitHub", href: "https://github.com/Rohaim137" }],
  };
}
