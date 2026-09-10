import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { auditAntiSlop, formatAntiSlopFindings } from "./quality/anti-slop.mjs";
import { auditArtifactIntegrity, formatArtifactFindings } from "./quality/artifact-integrity.mjs";
import { auditPagesCmsConfig, formatPagesCmsFindings } from "./quality/pages-cms.mjs";
import { auditPublicDocuments, formatPublicDocumentFindings } from "./quality/public-documents.mjs";

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const auditTasks = {
  cms: async () => report(await auditPagesCmsConfig(workspaceRoot), formatPagesCmsFindings),
  artifact: async () =>
    report(await auditArtifactIntegrity({ workspaceRoot }), formatArtifactFindings),
  documents: async () =>
    report(await auditPublicDocuments(workspaceRoot), formatPublicDocumentFindings),
  design: async () => report(await auditAntiSlop(workspaceRoot), formatAntiSlopFindings),
};

function report(findings, formatter) {
  console.log(formatter(findings));
  return findings.length === 0;
}

async function runRepositoryAudits() {
  for (const task of ["cms", "artifact", "documents", "design"]) {
    if (!(await auditTasks[task]())) return false;
  }
  return true;
}

function runNodeTool(label, relativeTool, args) {
  console.log(`\n> ${label}`);
  const result = spawnSync(process.execPath, [path.join(workspaceRoot, relativeTool), ...args], {
    cwd: workspaceRoot,
    env: process.env,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function printHelp() {
  console.log(`Portfolio verification

Usage:
  node scripts/verify.mjs             Run the fail-fast quality sequence
  node scripts/verify.mjs repository  Run every read-only repository audit
  node scripts/verify.mjs cms         Validate .pages.yml schema parity
  node scripts/verify.mjs artifact    Audit the built out/ artifact
  node scripts/verify.mjs documents   Audit public document disclosure
  node scripts/verify.mjs design      Audit detectable anti-slop rules
  node scripts/verify.mjs --help      Show this help

The audits are read-only. The default quality sequence builds out/ before auditing it.`);
}

const command = process.argv[2] ?? "quality";

if (command === "--help" || command === "help") {
  printHelp();
} else if (command === "repository") {
  if (!(await runRepositoryAudits())) process.exit(1);
} else if (command in auditTasks) {
  if (!(await auditTasks[command]())) process.exit(1);
} else if (command === "quality") {
  runNodeTool("Formatting", "node_modules/prettier/bin/prettier.cjs", ["--check", "."]);
  runNodeTool("Lint", "node_modules/eslint/bin/eslint.js", [".", "--max-warnings=0"]);
  runNodeTool("Types", "node_modules/typescript/bin/tsc", ["--noEmit"]);
  runNodeTool("Coverage", "node_modules/vitest/vitest.mjs", ["run", "--coverage"]);
  runNodeTool("Static build", "node_modules/next/dist/bin/next", ["build"]);
  if (!(await runRepositoryAudits())) process.exit(1);
} else {
  console.error(`Unknown verification command: ${command}`);
  printHelp();
  process.exit(2);
}
