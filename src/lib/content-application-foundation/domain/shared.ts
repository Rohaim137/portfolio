export type CollectionId = "site" | "projects" | "blog" | "reading" | "documents" | "generated";

export type ContentKind = "project" | "post" | "reading";
export type Slug = string;
export type CalendarDate = string;
export type IsoTimestamp = string;
export type ExternalWebUrl = string;
export type MailDestination = string;

export type PublicationState = Readonly<{
  draft: boolean;
  demo: boolean;
}>;

export type ContentSource = Readonly<{
  collection: CollectionId;
  relativePath: string;
  filenameStem: string;
  frontMatter: unknown;
  body?: string;
}>;

export type HeadingEntry = Readonly<{
  depth: number;
  text: string;
  anchor: string;
}>;

export type ReadingTime = Readonly<{
  minutes: number;
  words: number;
  label: string;
}>;

export type CompiledMdx = Readonly<{
  compiledSource: string;
  componentNames: readonly string[];
  headings: readonly HeadingEntry[];
  readingTime: ReadingTime;
}>;

export type ContentError = Readonly<{
  collection?: CollectionId;
  file: string;
  field?: string;
  code: string;
  message: string;
}>;

export type ValidationReport = Readonly<{
  errors: readonly ContentError[];
}>;

export type ValidationResult<T> =
  | Readonly<{ success: true; data: T }>
  | Readonly<{ success: false; errors: readonly ContentError[] }>;
