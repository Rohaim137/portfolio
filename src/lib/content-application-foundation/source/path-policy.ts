import path from "node:path";

import type { SupportedContentExtension } from "./types";
import { SourceAdapterError, supportedContentExtensions } from "./types";

export function isPathWithin(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);

  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))
  );
}

export function toDiagnosticPath(workspaceRoot: string, absolutePath: string): string {
  const relative = path.relative(workspaceRoot, absolutePath);
  return relative.split(path.sep).join("/");
}

export function assertSupportedExtension(file: string): SupportedContentExtension {
  const extension = path.extname(file).toLowerCase();

  if (!supportedContentExtensions.includes(extension as SupportedContentExtension)) {
    throw new SourceAdapterError(
      "SOURCE_EXTENSION_UNSUPPORTED",
      file,
      `Unsupported content extension: ${extension || "(none)"}.`,
    );
  }

  return extension as SupportedContentExtension;
}

export function resolveContainedPath(root: string, candidate: string): string {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(resolvedRoot, candidate);

  if (!isPathWithin(resolvedRoot, resolvedCandidate)) {
    throw new SourceAdapterError(
      "SOURCE_PATH_OUTSIDE_ROOT",
      candidate,
      "The requested content path escapes its configured collection root.",
    );
  }

  return resolvedCandidate;
}
