import Link from "next/link";

import { DemoBadge } from "@/components/ui";
import type { PostSummary } from "@/lib/content-application-foundation/domain";

export function PostCard({ post }: Readonly<{ post: PostSummary }>) {
  return (
    <article>
      <div className="post-card-meta">
        {post.demo ? <DemoBadge /> : null}
        <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        <span>{post.readingTime.label}</span>
      </div>
      <h2>
        <Link data-testid={`post-${post.slug}-detail-link`} href={`/blog/${post.slug}/`}>
          {post.title}
        </Link>
      </h2>
      <p>{post.description}</p>
      {post.tags.length > 0 ? (
        <ul aria-label={`${post.title} tags`} className="tag-list">
          {post.tags.map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
