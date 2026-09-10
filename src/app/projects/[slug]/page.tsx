import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import {
  metadataService,
  projectRepository,
} from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";

type ProjectPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export async function generateStaticParams() {
  return (await projectRepository.getStaticSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await projectRepository.getBySlug((await params).slug);
  return project ? toNextMetadata(metadataService.forProject(project)) : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await projectRepository.getBySlug((await params).slug);
  if (!project) notFound();

  return (
    <main className="page-main" data-od-id="project-detail" id="main-content">
      <ProjectCaseStudy project={project} />
    </main>
  );
}
