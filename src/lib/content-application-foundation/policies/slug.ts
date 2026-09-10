import type { CollectionId, ContentError, Slug } from "../domain";
import { diagnosticCodes } from "../validation";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(value: string): value is Slug {
  return slugPattern.test(value);
}

export function validateSlug(
  slug: string,
  context: Readonly<{ collection: CollectionId; file: string; filenameStem: string }>,
): readonly ContentError[] {
  const errors: ContentError[] = [];

  if (!isValidSlug(slug)) {
    errors.push({
      collection: context.collection,
      file: context.file,
      field: "slug",
      code: diagnosticCodes.invalidSlug,
      message: "Slug must be a lowercase kebab-case identifier.",
    });
  }

  if (slug !== context.filenameStem) {
    errors.push({
      collection: context.collection,
      file: context.file,
      field: "slug",
      code: diagnosticCodes.filenameSlugMismatch,
      message: `Slug must match the filename stem "${context.filenameStem}" exactly.`,
    });
  }

  return errors;
}

export type SlugSource = Readonly<{
  slug: Slug;
  file: string;
}>;

export function findDuplicateSlugs(
  collection: CollectionId,
  sources: readonly SlugSource[],
): readonly ContentError[] {
  const bySlug = new Map<Slug, string[]>();

  for (const source of sources) {
    bySlug.set(source.slug, [...(bySlug.get(source.slug) ?? []), source.file]);
  }

  const errors: ContentError[] = [];
  for (const [slug, files] of bySlug) {
    if (files.length < 2) {
      continue;
    }

    const sortedFiles = [...files].sort(compareText);
    for (const file of sortedFiles) {
      errors.push({
        collection,
        file,
        field: "slug",
        code: diagnosticCodes.duplicateSlug,
        message: `Slug "${slug}" is also used by ${sortedFiles.filter((item) => item !== file).join(", ")}.`,
      });
    }
  }

  return errors;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
