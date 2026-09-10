import type { PublicationState } from "../domain";

export type BuildMode = "production" | "development-preview" | "test";

export type VisibilityOptions = Readonly<{
  mode: BuildMode;
  includeDrafts?: boolean;
  includeDemo?: boolean;
}>;

export function assertVisibilityOptions(options: VisibilityOptions): void {
  if (options.mode === "production" && options.includeDrafts) {
    throw new Error("Draft inclusion cannot be enabled for a production build.");
  }
}

export function isVisible(publication: PublicationState, options: VisibilityOptions): boolean {
  assertVisibilityOptions(options);

  if (publication.draft && !options.includeDrafts) {
    return false;
  }

  if (publication.demo && options.includeDemo === false) {
    return false;
  }

  return true;
}

export function toPublishedState(publication: PublicationState): Readonly<{ demo: boolean }> {
  return { demo: publication.demo };
}
