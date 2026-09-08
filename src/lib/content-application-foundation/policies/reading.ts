export function hasPublishableBody(body?: string): boolean {
  return Boolean(body?.trim());
}

export function readingDetailHref(slug: string, body?: string): string | undefined {
  return hasPublishableBody(body) ? `/reading/${slug}/` : undefined;
}
