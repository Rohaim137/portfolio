import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": fileURLToPath(new URL("./tests/setup/server-only.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "src/lib/content-application-foundation/policies/{calendar-date,documents,ordering,reading,slug,urls,visibility}.ts",
        "src/lib/content-application-foundation/validation/{diagnostics,registry,schemas}.ts",
        "src/lib/content-application-foundation/services/metadata-service.ts",
        "src/lib/portfolio-experience/**/*.ts",
        "src/components/layout/primary-navigation.tsx",
        "src/components/projects/{media-lightbox,project-filter}.tsx",
      ],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
});
