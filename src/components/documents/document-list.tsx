import type { PublicDocument } from "@/lib/content-application-foundation/domain";

import { DocumentItem } from "./document-item";

export function DocumentList({ documents }: Readonly<{ documents: readonly PublicDocument[] }>) {
  return (
    <ul className="document-list">
      {documents.map((document) => (
        <li className="document-item" key={document.file}>
          <DocumentItem document={document} />
        </li>
      ))}
    </ul>
  );
}
