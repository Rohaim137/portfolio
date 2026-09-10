import type { CollectionId } from "../domain";

export const supportedContentExtensions = [".md", ".mdx"] as const;

export type SupportedContentExtension = (typeof supportedContentExtensions)[number];

export type CollectionRoot = Readonly<{
  collection: CollectionId;
  absolutePath: string;
}>;

export type SourceDescriptor = Readonly<{
  collection: CollectionId;
  absolutePath: string;
  relativePath: string;
  filenameStem: string;
  extension: SupportedContentExtension;
}>;

export type ReadSource = Readonly<{
  descriptor: SourceDescriptor;
  contents: string;
}>;

export type SourceErrorCode =
  | "SOURCE_ROOT_OUTSIDE_WORKSPACE"
  | "SOURCE_PATH_OUTSIDE_ROOT"
  | "SOURCE_REAL_PATH_OUTSIDE_ROOT"
  | "SOURCE_EXTENSION_UNSUPPORTED"
  | "SOURCE_READ_FAILED";

export class SourceAdapterError extends Error {
  readonly code: SourceErrorCode;
  readonly file: string;

  constructor(code: SourceErrorCode, file: string, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "SourceAdapterError";
    this.code = code;
    this.file = file;
  }
}
