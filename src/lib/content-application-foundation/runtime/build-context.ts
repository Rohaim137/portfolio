import "server-only";

import path from "node:path";

import { isSecureWebUrl, assertVisibilityOptions, type BuildMode } from "../policies";
import { CollectionScanner, SafeFileReader, type CollectionRoot } from "../source";
import { DiagnosticCollector } from "../validation";
import { BoundedWorkScheduler } from "./bounded-work-scheduler";
import { BuildMemo } from "./build-memo";

export type BuildContextOptions = Readonly<{
  workspaceRoot: string;
  mode: BuildMode;
  roots?: readonly CollectionRoot[];
  includeDrafts?: boolean;
  siteUrl?: string;
  concurrency?: number;
}>;

export type BuildContext = Readonly<{
  workspaceRoot: string;
  mode: BuildMode;
  includeDrafts: boolean;
  siteUrl?: string;
  roots: readonly CollectionRoot[];
  scanner: CollectionScanner;
  reader: SafeFileReader;
  diagnostics: DiagnosticCollector;
  memo: BuildMemo;
  scheduler: BoundedWorkScheduler;
}>;

export function createBuildContext(options: BuildContextOptions): BuildContext {
  const workspaceRoot = path.resolve(options.workspaceRoot);
  const includeDrafts = options.includeDrafts ?? false;
  assertVisibilityOptions({ mode: options.mode, includeDrafts });

  if (options.siteUrl && !isSecureWebUrl(options.siteUrl)) {
    throw new Error("Configured production site URL must be an absolute HTTPS URL.");
  }

  const defaultRoots: readonly CollectionRoot[] = [
    { collection: "projects", absolutePath: path.join(workspaceRoot, "content", "projects") },
    { collection: "blog", absolutePath: path.join(workspaceRoot, "content", "blog") },
    { collection: "reading", absolutePath: path.join(workspaceRoot, "content", "reading") },
  ];
  const roots: readonly CollectionRoot[] = Object.freeze(options.roots ?? defaultRoots);

  return Object.freeze({
    workspaceRoot,
    mode: options.mode,
    includeDrafts,
    siteUrl: options.siteUrl,
    roots,
    scanner: new CollectionScanner({ workspaceRoot, roots }),
    reader: new SafeFileReader({ workspaceRoot, roots }),
    diagnostics: new DiagnosticCollector(),
    memo: new BuildMemo(),
    scheduler: new BoundedWorkScheduler(options.concurrency),
  });
}
