import type { Metadata } from "next";

import { ReadingGroups } from "@/components/reading";
import { EmptyState } from "@/components/ui";
import {
  metadataService,
  portfolioQueryService,
} from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";
import { portfolioCopy } from "@/lib/portfolio-experience";

export const metadata: Metadata = toNextMetadata(
  metadataService.forIndex({
    title: "Reading - Muhammad Rohaim",
    description: "Source-linked reading and research notes grouped by explicit status.",
    pathname: "/reading/",
  }),
);

export default async function ReadingPage() {
  const model = await portfolioQueryService.getReadingIndex();
  const count = Object.values(model.groups).reduce((total, items) => total + items.length, 0);
  return (
    <main className="page-main" data-od-id="reading-index" id="main-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Reading</p>
          <h1 className="page-title">Sources first. Notes when they are ready.</h1>
        </div>
        <p className="page-description">
          Published records link to legitimate external sources and use textual status labels.
        </p>
      </header>
      {count > 0 ? (
        <ReadingGroups groups={model.groups} />
      ) : (
        <EmptyState {...portfolioCopy.emptyReading} testId="reading-empty-state" />
      )}
    </main>
  );
}
