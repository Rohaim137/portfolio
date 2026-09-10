import type { PostSummary } from "@/lib/content-application-foundation/domain";

import { PostCard } from "./post-card";

export function PostList({ posts }: Readonly<{ posts: readonly PostSummary[] }>) {
  return (
    <ol className="post-list" data-testid="post-list">
      {posts.map((post) => (
        <li className="post-card" key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ol>
  );
}
