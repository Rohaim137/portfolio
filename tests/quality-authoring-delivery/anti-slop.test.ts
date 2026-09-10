import { describe, expect, it } from "vitest";

import {
  auditAntiSlop,
  auditCssPolicies,
  auditRequiredIds,
  auditTextPolicies,
  formatAntiSlopFindings,
} from "../../scripts/quality/anti-slop.mjs";

describe("detectable anti-slop rules", () => {
  it("accepts the current repository", async () => {
    await expect(auditAntiSlop()).resolves.toEqual([]);
    expect(formatAntiSlopFindings([])).toBe("Detectable anti-slop rules passed.");
  });

  it("rejects prohibited colors, gradients, placeholder media, filler, and metrics", () => {
    const source = [
      "color: #6366f1",
      "background: linear-gradient(red, blue)",
      "https://picsum.photos/200",
      "placeholder text",
      "10x faster",
    ].join("\n");
    expect(auditTextPolicies("src/example.ts", source).map((item) => item.code)).toEqual([
      "SLOP_INDIGO_VIOLET",
      "SLOP_GRADIENT",
      "SLOP_PLACEHOLDER_MEDIA",
      "SLOP_FILLER_COPY",
      "SLOP_INVENTED_METRIC",
    ]);
  });

  it("rejects emoji used as a feature icon", () => {
    expect(auditTextPolicies("src/example.tsx", "<button>🚀 Launch</button>")).toContainEqual(
      expect.objectContaining({ code: "SLOP_EMOJI_ICON" }),
    );
  });

  it("rejects raw CSS colors, the dashboard-card motif, and a missing display binding", () => {
    const findings = auditCssPolicies(
      "src/app.css",
      ".card { border-left: 2px solid red; border-radius: 1rem; color: #fff; }",
    );
    expect(findings.map((item) => item.code)).toEqual(
      expect.arrayContaining(["SLOP_DISPLAY_FONT", "SLOP_LEFT_BORDER_CARD", "SLOP_TOKEN_BYPASS"]),
    );
  });

  it("reports missing major-section files and identifiers", () => {
    const findings = auditRequiredIds(
      new Map([
        ["src/app/about/page.tsx", '<main data-od-id="wrong">'],
        ["src/app/blog/page.tsx", '<main data-od-id="blog-index">'],
      ]),
    );
    expect(findings.map((item) => item.code)).toEqual(
      expect.arrayContaining(["SLOP_ID_FILE_MISSING", "SLOP_SECTION_ID"]),
    );
    expect(formatAntiSlopFindings(findings)).toContain("failed with");
  });
});
