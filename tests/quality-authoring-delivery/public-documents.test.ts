import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  auditPublicDocuments,
  formatPublicDocumentFindings,
  readDocumentManifest,
} from "../../scripts/quality/public-documents.mjs";

const temporaryRoots: string[] = [];

async function createFixture(manifest = "[]") {
  const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-documents-"));
  temporaryRoots.push(root);
  await mkdir(path.join(root, "src/config"), { recursive: true });
  await writeFile(
    path.join(root, "src/config/documents.ts"),
    `export const publicDocuments = ${manifest} as const;`,
    "utf8",
  );
  return root;
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true })));
});

describe("public document safety", () => {
  it("accepts the repository's intentional empty state", async () => {
    await expect(readDocumentManifest()).resolves.toEqual([]);
    await expect(auditPublicDocuments()).resolves.toEqual([]);
    expect(formatPublicDocumentFindings([])).toBe("Public document safety passed.");
  });

  it("accepts one explicitly listed ordinary PDF", async () => {
    const root = await createFixture(
      `[{ title: "Public resume", file: "/documents/resume.pdf", description: "Reviewed copy" }]`,
    );
    await mkdir(path.join(root, "public/documents"), { recursive: true });
    await writeFile(path.join(root, "public/documents/resume.pdf"), "%PDF fixture", "utf8");
    await expect(auditPublicDocuments(root)).resolves.toEqual([]);
  });

  it("reports missing and duplicate configured files", async () => {
    const entry = `{ title: "Public resume", file: "/documents/resume.pdf", description: "Reviewed copy" }`;
    const root = await createFixture(`[${entry}, ${entry}]`);
    const findings = await auditPublicDocuments(root);
    expect(findings.map((item) => item.code)).toEqual(
      expect.arrayContaining(["DOCUMENT_FILE_MISSING", "DOCUMENT_MANIFEST_DUPLICATE"]),
    );
  });

  it("rejects unlisted, suspicious, unsafe, and nested public entries", async () => {
    const root = await createFixture(
      `[{ title: "Nested", file: "/documents/nested/report.exe", description: "Invalid" }]`,
    );
    await mkdir(path.join(root, "public/documents/private"), { recursive: true });
    await writeFile(path.join(root, "public/documents/passport.pdf"), "%PDF fixture", "utf8");
    await writeFile(path.join(root, "public/documents/notes.txt"), "notes", "utf8");
    const findings = await auditPublicDocuments(root);
    expect(findings.map((item) => item.code)).toEqual(
      expect.arrayContaining([
        "DOCUMENT_ENTRY_UNSAFE",
        "DOCUMENT_EXTENSION_UNSAFE",
        "DOCUMENT_FILE_UNLISTED",
        "DOCUMENT_NAME_SENSITIVE",
        "DOCUMENT_PATH_UNSAFE",
      ]),
    );
  });

  it("reports malformed or non-literal manifests without evaluating code", async () => {
    const root = await createFixture("getDocuments()");
    const findings = await auditPublicDocuments(root);
    expect(findings).toEqual([expect.objectContaining({ code: "DOCUMENT_MANIFEST_INVALID" })]);
    expect(formatPublicDocumentFindings(findings)).toContain("failed with 1 issue(s)");
  });
});
