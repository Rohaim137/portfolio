import { ActionLink, CompiledContent, DemoDisclosure, StatusLabel } from "@/components/ui";
import type { ReadingDetail as ReadingDetailModel } from "@/lib/content-application-foundation/domain";

export function ReadingDetail({ item }: Readonly<{ item: ReadingDetailModel }>) {
  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Reading note</p>
          <h1 className="page-title">{item.title}</h1>
        </div>
        <div className="page-description">
          <StatusLabel>{item.status}</StatusLabel>
          <p>{item.summary ?? "A source-linked reading note."}</p>
          <ActionLink href={item.sourceUrl} testId="reading-detail-source-link">
            Open original source
          </ActionLink>
        </div>
      </header>
      {item.demo ? <DemoDisclosure /> : null}
      <article className="article-body content-section">
        <CompiledContent content={item.body} />
      </article>
    </>
  );
}
