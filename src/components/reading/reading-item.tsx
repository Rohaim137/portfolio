import { ActionLink, DemoBadge, StatusLabel } from "@/components/ui";
import type { ReadingSummary } from "@/lib/content-application-foundation/domain";

export function ReadingItem({ item }: Readonly<{ item: ReadingSummary }>) {
  return (
    <article>
      <div className="project-card-meta">
        {item.demo ? <DemoBadge /> : null}
        <StatusLabel>{item.status}</StatusLabel>
        {item.year ? <span>{item.year}</span> : null}
      </div>
      <h3>{item.title}</h3>
      {item.authors.length > 0 ? <p>{item.authors.join(", ")}</p> : null}
      {item.summary ? <p>{item.summary}</p> : null}
      <ul aria-label={`${item.title} topics`} className="tag-list">
        {item.topics.map((topic) => (
          <li className="tag" key={topic}>
            {topic}
          </li>
        ))}
      </ul>
      <div className="project-actions">
        <ActionLink href={item.sourceUrl} testId={`reading-${item.slug}-source-link`}>
          Original source
        </ActionLink>
        {item.detailHref ? (
          <ActionLink href={item.detailHref} testId={`reading-${item.slug}-note-link`}>
            Read note
          </ActionLink>
        ) : null}
      </div>
    </article>
  );
}
