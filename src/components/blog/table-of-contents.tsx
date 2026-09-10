import type { HeadingEntry } from "@/lib/content-application-foundation/domain";

export function TableOfContents({ headings }: Readonly<{ headings: readonly HeadingEntry[] }>) {
  return (
    <nav
      aria-label="Article contents"
      className="table-of-contents"
      data-testid="article-table-of-contents"
    >
      <p className="eyebrow">On this page</p>
      <ol>
        {headings.map((heading) => (
          <li className={heading.depth === 3 ? "toc-nested" : undefined} key={heading.anchor}>
            <a href={`#${heading.anchor}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
