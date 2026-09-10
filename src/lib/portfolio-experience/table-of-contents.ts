import type { HeadingEntry } from "@/lib/content-application-foundation/domain";

import type { TableOfContentsState } from "./types";

export function resolveTableOfContents(
  optedIn: boolean,
  headings: readonly HeadingEntry[],
): TableOfContentsState {
  const eligible = headings.filter(
    (heading) => (heading.depth === 2 || heading.depth === 3) && heading.text.trim().length > 0,
  );

  return optedIn && eligible.length >= 3
    ? { kind: "visible", headings: eligible }
    : { kind: "hidden" };
}
