import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  contentType,
  resolveStaticRequest,
  startStaticServer,
} from "../../scripts/serve-static.mjs";

const temporaryRoots: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true })));
});

describe("static browser-test server", () => {
  it("resolves root, directory, and asset requests within the artifact", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-static-"));
    temporaryRoots.push(root);
    await mkdir(path.join(root, "projects"));
    await writeFile(path.join(root, "index.html"), "home", "utf8");
    await writeFile(path.join(root, "projects/index.html"), "projects", "utf8");
    await writeFile(path.join(root, "app.js"), "script", "utf8");

    await expect(resolveStaticRequest(root, "/")).resolves.toBe(path.join(root, "index.html"));
    await expect(resolveStaticRequest(root, "/projects/")).resolves.toBe(
      path.join(root, "projects/index.html"),
    );
    await expect(resolveStaticRequest(root, "/app.js?version=1")).resolves.toBe(
      path.join(root, "app.js"),
    );
    expect(contentType("page.html")).toBe("text/html; charset=utf-8");
    expect(contentType("unknown.bin")).toBe("application/octet-stream");
  });

  it("rejects missing, malformed, and traversal requests", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-static-"));
    temporaryRoots.push(root);
    await expect(resolveStaticRequest(root, "/missing")).resolves.toBeUndefined();
    await expect(resolveStaticRequest(root, "/%00invalid")).resolves.toBeUndefined();
    await expect(resolveStaticRequest(root, "/..%2Foutside.txt")).resolves.toBeUndefined();
  });

  it("serves GET and HEAD, returns the static 404, and rejects mutation methods", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-static-"));
    temporaryRoots.push(root);
    await writeFile(path.join(root, "index.html"), "home", "utf8");
    await writeFile(path.join(root, "404.html"), "missing", "utf8");
    const server = await startStaticServer({ root, port: 0 });
    try {
      const address = server.address();
      if (!address || typeof address === "string") throw new Error("Expected a TCP address.");
      const origin = `http://127.0.0.1:${address.port}`;
      const home = await fetch(origin);
      expect(home.status).toBe(200);
      expect(await home.text()).toBe("home");
      const head = await fetch(origin, { method: "HEAD" });
      expect(head.status).toBe(200);
      expect(await head.text()).toBe("");
      expect((await fetch(`${origin}/missing`)).status).toBe(404);
      expect((await fetch(origin, { method: "POST" })).status).toBe(405);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
