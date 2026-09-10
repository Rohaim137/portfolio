import { CompiledContent, DemoDisclosure } from "@/components/ui";
import type { PostDetail } from "@/lib/content-application-foundation/domain";
import { resolveTableOfContents } from "@/lib/portfolio-experience";

import { TableOfContents } from "./table-of-contents";

export function ArticleLayout({ post }: Readonly<{ post: PostDetail }>) {
  const tableOfContents = resolveTableOfContents(post.showTableOfContents, post.body.headings);

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Technical writing</p>
          <h1 className="page-title">{post.title}</h1>
        </div>
        <div className="page-description">
          <p>{post.description}</p>
          <div className="article-meta">
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span>{post.readingTime.label}</span>
          </div>
        </div>
      </header>
      {post.demo ? <DemoDisclosure /> : null}
      <div className="article-shell content-section">
        <article className="article-body">
          <CompiledContent content={post.body} />
        </article>
        {tableOfContents.kind === "visible" ? (
          <TableOfContents headings={tableOfContents.headings} />
        ) : null}
      </div>
    </>
  );
}
