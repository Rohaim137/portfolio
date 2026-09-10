import type { Metadata } from "next";

import { PostList } from "@/components/blog";
import { EmptyState } from "@/components/ui";
import {
  metadataService,
  portfolioQueryService,
} from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";
import { portfolioCopy } from "@/lib/portfolio-experience";

export const metadata: Metadata = toNextMetadata(
  metadataService.forIndex({
    title: "Writing - Muhammad Rohaim",
    description:
      "Technical articles and clearly labelled demonstrations about systems, interfaces, and reliable content.",
    pathname: "/blog/",
  }),
);

export default async function BlogPage() {
  const model = await portfolioQueryService.getBlogIndex();
  return (
    <main className="page-main" data-od-id="blog-index" id="main-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Writing</p>
          <h1 className="page-title">Long-form notes with a visible structure.</h1>
        </div>
        <p className="page-description">
          These initial educational articles are marked Demo and use an impersonal voice. They can
          be replaced with genuine writing later.
        </p>
      </header>
      {model.posts.length > 0 ? (
        <PostList posts={model.posts} />
      ) : (
        <EmptyState {...portfolioCopy.emptyPosts} />
      )}
    </main>
  );
}
