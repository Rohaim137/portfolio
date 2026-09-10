import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import ts from "typescript";

const safeExtension = ".pdf";
const sensitiveName =
  /(?:^|[-_.])(bank|credential|id-card|passport|payslip|private|salary|secret|token)(?:[-_.]|$)/iu;

function finding(code, file, message) {
  return { code, file, message };
}

function unwrap(node) {
  if (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    return unwrap(node.expression);
  }
  return node;
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  throw new Error("Document manifest keys must be identifiers or string literals.");
}

function literalValue(node) {
  const value = unwrap(node);
  if (ts.isStringLiteral(value) || ts.isNumericLiteral(value)) return value.text;
  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(value)) return value.elements.map(literalValue);
  if (ts.isObjectLiteralExpression(value)) {
    return Object.fromEntries(
      value.properties.map((property) => {
        if (!ts.isPropertyAssignment(property)) {
          throw new Error(
            "Document manifest objects may contain only literal property assignments.",
          );
        }
        return [propertyName(property.name), literalValue(property.initializer)];
      }),
    );
  }
  throw new Error("Document manifest values must be static literals.");
}

export async function readDocumentManifest(workspaceRoot = process.cwd()) {
  const relativeFile = "src/config/documents.ts";
  const source = await readFile(path.join(workspaceRoot, relativeFile), "utf8");
  const sourceFile = ts.createSourceFile(relativeFile, source, ts.ScriptTarget.Latest, true);
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === "publicDocuments" &&
        declaration.initializer
      ) {
        const result = literalValue(declaration.initializer);
        if (!Array.isArray(result)) throw new Error("publicDocuments must be an array literal.");
        return result;
      }
    }
  }
  throw new Error("Could not find the publicDocuments array literal in src/config/documents.ts.");
}

function validateManifestEntry(entry, index, findings) {
  const location = `src/config/documents.ts#${index + 1}`;
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    findings.push(
      finding("DOCUMENT_MANIFEST_ENTRY", location, "Manifest entry must be an object."),
    );
    return undefined;
  }
  for (const field of ["title", "file", "description"]) {
    if (typeof entry[field] !== "string" || entry[field].trim() === "") {
      findings.push(
        finding("DOCUMENT_MANIFEST_FIELD", location, `Manifest field ${field} is required.`),
      );
    }
  }
  if (typeof entry.file !== "string") return undefined;
  const normalized = entry.file.replaceAll("\\", "/");
  if (
    !normalized.startsWith("/documents/") ||
    normalized.includes("../") ||
    normalized.includes("//") ||
    path.posix.basename(normalized) !== normalized.slice("/documents/".length)
  ) {
    findings.push(
      finding(
        "DOCUMENT_PATH_UNSAFE",
        location,
        "Document path must be one flat file beneath /documents/ with no traversal.",
      ),
    );
    return undefined;
  }
  if (path.posix.extname(normalized).toLowerCase() !== safeExtension) {
    findings.push(
      finding(
        "DOCUMENT_EXTENSION_UNSAFE",
        location,
        "Only deliberately public PDF files are allowed.",
      ),
    );
  }
  const basename = path.posix.basename(normalized);
  if (sensitiveName.test(basename)) {
    findings.push(
      finding(
        "DOCUMENT_NAME_SENSITIVE",
        location,
        "Filename resembles a private or credential-bearing record.",
      ),
    );
  }
  return basename;
}

export async function auditPublicDocuments(workspaceRoot = process.cwd()) {
  const findings = [];
  let manifest;
  try {
    manifest = await readDocumentManifest(workspaceRoot);
  } catch (error) {
    return [
      finding(
        "DOCUMENT_MANIFEST_INVALID",
        "src/config/documents.ts",
        error instanceof Error ? error.message : "Manifest could not be read.",
      ),
    ];
  }

  const listed = new Set();
  manifest.forEach((entry, index) => {
    const basename = validateManifestEntry(entry, index, findings);
    if (!basename) return;
    if (listed.has(basename)) {
      findings.push(
        finding(
          "DOCUMENT_MANIFEST_DUPLICATE",
          "src/config/documents.ts",
          `Duplicate path for ${basename}.`,
        ),
      );
    }
    listed.add(basename);
  });

  const documentsRoot = path.join(workspaceRoot, "public", "documents");
  let entries = [];
  try {
    entries = await readdir(documentsRoot, { withFileTypes: true });
  } catch (error) {
    if (!(error && typeof error === "object" && error.code === "ENOENT")) throw error;
  }

  const actual = new Set();
  for (const entry of entries) {
    const relativeFile = `public/documents/${entry.name}`;
    if (!entry.isFile() || entry.isSymbolicLink()) {
      findings.push(
        finding(
          "DOCUMENT_ENTRY_UNSAFE",
          relativeFile,
          "Only ordinary files are allowed in this folder.",
        ),
      );
      continue;
    }
    actual.add(entry.name);
    if (path.extname(entry.name).toLowerCase() !== safeExtension) {
      findings.push(
        finding(
          "DOCUMENT_EXTENSION_UNSAFE",
          relativeFile,
          "Only deliberately public PDF files are allowed.",
        ),
      );
    }
    if (sensitiveName.test(entry.name)) {
      findings.push(
        finding(
          "DOCUMENT_NAME_SENSITIVE",
          relativeFile,
          "Filename resembles a private or credential-bearing record.",
        ),
      );
    }
    if (!listed.has(entry.name)) {
      findings.push(
        finding(
          "DOCUMENT_FILE_UNLISTED",
          relativeFile,
          "File is absent from the explicit manifest.",
        ),
      );
    }
  }

  for (const basename of listed) {
    if (!actual.has(basename)) {
      findings.push(
        finding(
          "DOCUMENT_FILE_MISSING",
          `public/documents/${basename}`,
          "Configured public document file is missing.",
        ),
      );
    }
  }

  return findings.sort((left, right) =>
    `${left.file}:${left.code}`.localeCompare(`${right.file}:${right.code}`),
  );
}

export function formatPublicDocumentFindings(findings) {
  if (findings.length === 0) return "Public document safety passed.";
  return [
    `Public document safety failed with ${findings.length} issue(s):`,
    ...findings.map((item) => `- [${item.code}] ${item.file}: ${item.message}`),
  ].join("\n");
}
