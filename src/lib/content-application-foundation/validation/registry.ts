import { z } from "zod";

import type { CollectionId, ContentError, ValidationResult } from "../domain";
import { diagnosticCodes } from "./diagnostics";
import {
  contributionCalendarSchema,
  postFrontMatterSchema,
  projectFrontMatterSchema,
  publicDocumentManifestSchema,
  readingFrontMatterSchema,
  siteConfigSchema,
} from "./schemas";

const registry = {
  site: siteConfigSchema,
  projects: projectFrontMatterSchema,
  blog: postFrontMatterSchema,
  reading: readingFrontMatterSchema,
  documents: publicDocumentManifestSchema,
  generated: contributionCalendarSchema,
} satisfies Record<CollectionId, z.ZodType>;

export class SchemaRegistry {
  safeParse(collection: CollectionId, input: unknown, file: string): ValidationResult<unknown> {
    const result = registry[collection].safeParse(input);

    if (result.success) {
      return { success: true, data: result.data };
    }

    return {
      success: false,
      errors: result.error.issues.map((issue) => toContentError(collection, file, issue)),
    };
  }
}

export function validateWithSchema<TSchema extends z.ZodType>(
  schema: TSchema,
  input: unknown,
  context: Readonly<{ collection: CollectionId; file: string }>,
): ValidationResult<z.output<TSchema>> {
  const result = schema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.issues.map((issue) =>
      toContentError(context.collection, context.file, issue),
    ),
  };
}

function toContentError(
  collection: CollectionId,
  file: string,
  issue: z.core.$ZodIssue,
): ContentError {
  return {
    collection,
    file,
    field: issue.path.length > 0 ? issue.path.join(".") : undefined,
    code: diagnosticCodes.schemaInvalid,
    message: issue.message,
  };
}
