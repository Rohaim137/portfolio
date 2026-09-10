import type { Metadata } from "next";

import { DocumentList } from "@/components/documents";
import { EmptyState } from "@/components/ui";
import {
  metadataService,
  portfolioQueryService,
} from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";
import { portfolioCopy } from "@/lib/portfolio-experience";

export const metadata: Metadata = toNextMetadata(
  metadataService.forIndex({
    title: "Documents - Muhammad Rohaim",
    description: "Deliberately approved public documents and their availability.",
    pathname: "/docs/",
  }),
);

export default async function DocumentsPage() {
  const model = await portfolioQueryService.getDocumentsIndex();
  return (
    <main className="page-main" data-od-id="documents-index" id="main-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Documents</p>
          <h1 className="page-title">Public only after deliberate review.</h1>
        </div>
        <p className="page-description">
          Files appear here only when they are explicitly configured and present in the public
          document directory.
        </p>
      </header>
      {model.documents.length > 0 ? (
        <DocumentList documents={model.documents} />
      ) : (
        <EmptyState {...portfolioCopy.emptyDocuments} testId="documents-empty-state" />
      )}
    </main>
  );
}
