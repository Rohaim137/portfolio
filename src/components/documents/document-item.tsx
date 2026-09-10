import type { PublicDocument } from "@/lib/content-application-foundation/domain";

export function DocumentItem({ document }: Readonly<{ document: PublicDocument }>) {
  return (
    <article>
      <div className="article-meta">
        {document.category ? <span>{document.category}</span> : null}
        {document.updatedAt ? (
          <time dateTime={document.updatedAt}>Updated {document.updatedAt}</time>
        ) : null}
      </div>
      <h2>{document.title}</h2>
      <p>{document.description}</p>
      <div className="project-actions">
        <a
          className="action-link"
          data-testid="document-view-link"
          href={document.file}
          target="_blank"
          rel="noreferrer"
        >
          View document
        </a>
        <a
          className="action-link"
          data-testid="document-download-link"
          download
          href={document.file}
        >
          Download document
        </a>
      </div>
    </article>
  );
}
