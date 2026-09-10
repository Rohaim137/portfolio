import type { Server } from "node:http";

export function contentType(file: string): string;
export function resolveStaticRequest(
  root: string,
  requestPath: string,
): Promise<string | undefined>;
export function startStaticServer(
  options?: Readonly<{
    root?: string;
    host?: string;
    port?: number;
  }>,
): Promise<Server>;
