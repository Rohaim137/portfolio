import { readFile } from "node:fs/promises";

import { parse } from "yaml";
import { describe, expect, it } from "vitest";

type Workflow = {
  on?: Record<string, unknown>;
  permissions?: Record<string, string>;
  jobs?: Record<
    string,
    {
      environment?: { name?: string };
      needs?: string;
      steps?: Array<{ uses?: string; run?: string }>;
    }
  >;
};

async function loadWorkflow(path: string) {
  const source = await readFile(path, "utf8");
  return { source, workflow: parse(source) as Workflow };
}

describe("GitHub workflow release boundaries", () => {
  it("keeps quality automation read-only and free of deployment capabilities", async () => {
    const { source, workflow } = await loadWorkflow(".github/workflows/quality.yml");

    expect(Object.keys(workflow.on ?? {}).sort()).toEqual([
      "pull_request",
      "push",
      "workflow_dispatch",
    ]);
    expect(workflow.permissions).toEqual({ contents: "read" });
    expect(source).not.toMatch(/cloudflare|wrangler|secrets\./iu);
    expect(source).toContain("actions/upload-artifact@v6");
    expect(source).toContain("actions/download-artifact@v8");
    expect(source).toContain("retention-days: 3");
  });

  it("keeps production deployment manual, protected, and commit-bound", async () => {
    const { source, workflow } = await loadWorkflow(".github/workflows/deploy-pages.yml");

    expect(Object.keys(workflow.on ?? {})).toEqual(["workflow_dispatch"]);
    expect(workflow.permissions).toEqual({ contents: "read" });
    expect(source).toContain("environment:\n      name: production");
    expect(source).toContain("Type DEPLOY only after the action-time production approval");
    expect(source).toContain('test "$(git rev-parse HEAD)" = "$EXPECTED_COMMIT"');
    expect(source).toContain("secrets.CLOUDFLARE_ACCOUNT_ID");
    expect(source).toContain("secrets.CLOUDFLARE_API_TOKEN");
    expect(source).toContain("wrangler pages deploy out");

    const validationJob = workflow.jobs?.["validate-and-build"];
    const deployJob = workflow.jobs?.deploy;
    expect(validationJob?.environment).toBeUndefined();
    expect(deployJob?.needs).toBe("validate-and-build");
    expect(deployJob?.environment?.name).toBe("production");
    expect(validationJob?.steps?.some((step) => step.uses === "actions/upload-artifact@v6")).toBe(
      true,
    );
    expect(deployJob?.steps?.some((step) => step.uses === "actions/download-artifact@v8")).toBe(
      true,
    );
  });
});
