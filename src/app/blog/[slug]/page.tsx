import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/blog";
import {
  metadataService,
  postRepository,
} from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";

type BlogPostPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export async function generateStaticParams() {
  return (await postRepository.getStaticSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await postRepository.getBySlug((await params).slug);
  return post ? toNextMetadata(metadataService.forPost(post)) : {};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await postRepository.getBySlug((await params).slug);
  if (!post) notFound();
  return (
    <main className="page-main" data-od-id="blog-article" id="main-content">
      <ArticleLayout post={post} />
    </main>
  );
}
