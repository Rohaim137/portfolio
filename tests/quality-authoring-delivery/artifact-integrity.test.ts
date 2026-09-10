import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  auditArtifactIntegrity,
  deriveExpectedRoutes,
  formatArtifactFindings,
} from "../../scripts/quality/artifact-integrity.mjs";

const temporaryRoots: string[] = [];

async function createFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-artifact-"));
  temporaryRoots.push(root);
  for (const directory of [
    "content/projects",
    "content/blog",
    "content/reading",
    "out/about",
    "out/blog",
    "out/docs",
    "out/projects",
    "out/reading",
  ]) {
    await mkdir(path.join(root, directory), { recursive: true });
  }
  for (const file of [
    "out/index.html",
    "out/about/index.html",
    "out/blog/index.html",
    "out/docs/index.html",
    "out/projects/index.html",
    "out/reading/index.html",
  ]) {
    await writeFile(path.join(root, file), "<!doctype html><title>Safe</title>", "utf8");
  }
  return root;
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true })));
});

describe("static artifact integrity", () => {
  it("accepts an empty safe artifact and formats a success", async () => {
    const root = await createFixture();
    await expect(auditArtifactIntegrity({ workspaceRoot: root })).resolves.toEqual([]);
    expect(formatArtifactFindings([])).toBe("Static artifact integrity passed.");
  });

  it("derives content routes and rejects a missing eligible route", async () => {
    const root = await createFixture();
    await writeFile(
      path.join(root, "content/projects/verified.mdx"),
      "---\ntitle: Verified project\nslug: verified\ndraft: false\n---\nBody",
      "utf8",
    );
    const { expected } = await deriveExpectedRoutes(root);
    expect(expected).toContain("/projects/verified/");
    await expect(auditArtifactIntegrity({ workspaceRoot: root })).resolves.toContainEqual(
      expect.objectContaining({ code: "ARTIFACT_ROUTE_MISSING", file: "/projects/verified/" }),
    );
  });

  it("reports a missing output directory", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-missing-output-"));
    temporaryRoots.push(root);
    await expect(auditArtifactIntegrity({ workspaceRoot: root })).resolves.toEqual([
      expect.objectContaining({ code: "ARTIFACT_OUTPUT_MISSING", file: "out" }),
    ]);
  });

  it("rejects unexpected routes, runtime files, origins, paths, and secret signatures", async () => {
    const root = await createFixture();
    await mkdir(path.join(root, "out/unexpected"));
    await writeFile(
      path.join(root, "out/unexpected/index.html"),
      [
        "http://localhost:3000",
        "https://example.com/placeholder",
        "C:\\Users\\owner\\private",
        "-----BEGIN PRIVATE KEY-----",
        `AKIA${"A".repeat(16)}`,
        `ghp_${"a".repeat(24)}`,
      ].join(" "),
      "utf8",
    );
    await writeFile(path.join(root, "out/server.php"), "runtime", "utf8");
    const findings = await auditArtifactIntegrity({ workspaceRoot: root });
    expect(findings.map((item) => item.code)).toEqual(
      expect.arrayContaining([
        "ARTIFACT_ABSOLUTE_PATH",
        "ARTIFACT_AWS_KEY",
        "ARTIFACT_GITHUB_TOKEN",
        "ARTIFACT_LOCAL_ORIGIN",
        "ARTIFACT_PLACEHOLDER_ORIGIN",
        "ARTIFACT_PRIVATE_KEY",
        "ARTIFACT_ROUTE_UNEXPECTED",
        "ARTIFACT_RUNTIME_FILE",
      ]),
    );
    expect(formatArtifactFindings(findings)).not.toContain(`AKIA${"A".repeat(16)}`);
  });

  it("detects a draft marker without printing content values", async () => {
    const root = await createFixture();
    await writeFile(
      path.join(root, "content/blog/private-draft.mdx"),
      "---\ntitle: Private draft title\nslug: private-draft\ndraft: true\n---\nHidden",
      "utf8",
    );
    await writeFile(path.join(root, "out/index.html"), "private-draft", "utf8");
    const findings = await auditArtifactIntegrity({ workspaceRoot: root });
    expect(findings).toContainEqual(expect.objectContaining({ code: "ARTIFACT_DRAFT_EXPOSED" }));
    expect(formatArtifactFindings(findings)).not.toContain("Private draft title");
  });
});
