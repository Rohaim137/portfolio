import type { CollectionId, ContentError, ValidationReport } from "../domain";

export const diagnosticCodes = {
  schemaInvalid: "CONTENT_SCHEMA_INVALID",
  duplicateSlug: "CONTENT_DUPLICATE_SLUG",
  filenameSlugMismatch: "CONTENT_FILENAME_SLUG_MISMATCH",
  invalidSlug: "CONTENT_SLUG_INVALID",
  invalidDate: "CONTENT_DATE_INVALID",
  invalidUrl: "CONTENT_URL_INVALID",
  invalidDocumentPath: "DOCUMENT_PATH_INVALID",
  missingDocumentAsset: "DOCUMENT_ASSET_MISSING",
  draftInProduction: "DRAFTS_FORBIDDEN_IN_PRODUCTION",
  frontMatterParseFailed: "FRONT_MATTER_PARSE_FAILED",
  mdxUnsafeConstruct: "MDX_UNSAFE_CONSTRUCT",
  mdxCompileFailed: "MDX_COMPILE_FAILED",
  generatedDataInvalid: "GENERATED_DATA_INVALID",
} as const;

const collectionOrder: readonly CollectionId[] = [
  "site",
  "projects",
  "blog",
  "reading",
  "documents",
  "generated",
];

export class DiagnosticCollector {
  readonly #errors: ContentError[] = [];

  add(error: ContentError): void {
    this.#errors.push(Object.freeze({ ...error }));
  }

  addAll(errors: Iterable<ContentError>): void {
    for (const error of errors) {
      this.add(error);
    }
  }

  hasErrors(): boolean {
    return this.#errors.length > 0;
  }

  report(): ValidationReport {
    return Object.freeze({ errors: Object.freeze([...this.#errors].sort(compareErrors)) });
  }

  format(): string {
    const { errors } = this.report();

    if (errors.length === 0) {
      return "Content validation passed.";
    }

    const groups = new Map<string, ContentError[]>();
    for (const error of errors) {
      const key = `${error.collection ?? "unknown"}:${error.file}`;
      groups.set(key, [...(groups.get(key) ?? []), error]);
    }

    const lines = [`Content validation failed with ${errors.length} issue(s):`];
    for (const groupedErrors of groups.values()) {
      const first = groupedErrors[0];
      lines.push(`\n${first.collection ?? "unknown"}: ${first.file}`);
      for (const error of groupedErrors) {
        const field = error.field ? ` [${error.field}]` : "";
        lines.push(`  - ${error.code}${field}: ${error.message}`);
      }
    }

    return lines.join("\n");
  }
}

function compareErrors(left: ContentError, right: ContentError): number {
  return (
    compareNumber(collectionRank(left.collection), collectionRank(right.collection)) ||
    compareText(left.file, right.file) ||
    compareText(left.field ?? "", right.field ?? "") ||
    compareText(left.code, right.code) ||
    compareText(left.message, right.message)
  );
}

function collectionRank(collection?: CollectionId): number {
  if (!collection) {
    return collectionOrder.length;
  }

  const index = collectionOrder.indexOf(collection);
  return index === -1 ? collectionOrder.length : index;
}

function compareNumber(left: number, right: number): number {
  return left - right;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
