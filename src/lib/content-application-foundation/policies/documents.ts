import path from "node:path";

export function isValidPublicDocumentPath(value: string): boolean {
  if (!value || value.includes("\\") || value.includes("?") || value.includes("#")) {
    return false;
  }

  const normalized = path.posix.normalize(value);
  return (
    normalized === value &&
    normalized.startsWith("/documents/") &&
    !normalized.includes("/../") &&
    path.posix.extname(normalized) !== ""
  );
}
