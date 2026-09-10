import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
]);

export function contentType(file) {
  return mimeTypes.get(path.extname(file).toLowerCase()) ?? "application/octet-stream";
}

export async function resolveStaticRequest(root, requestPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(requestPath, "http://127.0.0.1").pathname);
  } catch {
    return undefined;
  }
  const normalized = pathname.replaceAll("\\", "/");
  if (normalized.includes("\0") || normalized.split("/").includes("..")) return undefined;
  const relative = normalized.replace(/^\/+/, "");
  const candidates =
    relative === "" ? ["index.html"] : [relative, path.posix.join(relative, "index.html")];
  const resolvedRoot = path.resolve(root);
  for (const candidate of candidates) {
    const absolute = path.resolve(resolvedRoot, candidate);
    if (absolute !== resolvedRoot && !absolute.startsWith(`${resolvedRoot}${path.sep}`)) continue;
    try {
      if ((await stat(absolute)).isFile()) return absolute;
    } catch (error) {
      if (!(error && typeof error === "object" && error.code === "ENOENT")) throw error;
    }
  }
  return undefined;
}

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

export async function startStaticServer({
  root = path.resolve("out"),
  host = "127.0.0.1",
  port = 4173,
} = {}) {
  const resolvedRoot = path.resolve(root);
  if (!(await stat(resolvedRoot)).isDirectory())
    throw new Error(`Static root is not a directory: ${root}`);
  const server = createServer(async (request, response) => {
    try {
      if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { Allow: "GET, HEAD" });
        response.end();
        return;
      }
      const requested = await resolveStaticRequest(resolvedRoot, request.url ?? "/");
      const fallback = path.join(resolvedRoot, "404.html");
      const file = requested ?? fallback;
      const fileStat = await stat(file);
      response.writeHead(requested ? 200 : 404, {
        "Cache-Control": "no-store",
        "Content-Length": fileStat.size,
        "Content-Type": contentType(file),
        "X-Content-Type-Options": "nosniff",
      });
      if (request.method === "HEAD") response.end();
      else createReadStream(file).pipe(response);
    } catch {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Static server error.");
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, resolve);
  });
  return server;
}

const isEntryPoint =
  process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isEntryPoint) {
  const root = path.resolve(argument("--root", "out"));
  const host = argument("--host", "127.0.0.1");
  const port = Number.parseInt(argument("--port", "4173"), 10);
  if (host !== "127.0.0.1" && host !== "localhost") {
    throw new Error("The verification server must remain loopback-only.");
  }
  const server = await startStaticServer({ root, host, port });
  console.log(`Static artifact available at http://${host}:${port}`);
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, () => server.close(() => process.exit(0)));
  }
}
