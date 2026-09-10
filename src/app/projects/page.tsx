import type { Metadata } from "next";

import { ProjectFilter } from "@/components/projects/project-filter";
import {
  metadataService,
  portfolioQueryService,
} from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";

export const metadata: Metadata = toNextMetadata(
  metadataService.forIndex({
    title: "Projects - Muhammad Rohaim",
    description:
      "Browse project demonstrations and future published case studies by type or technology.",
    pathname: "/projects/",
  }),
);

export default async function ProjectsPage() {
  const model = await portfolioQueryService.getProjectsIndex();

  return (
    <main className="page-main" data-od-id="projects-index" id="main-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Projects</p>
          <h1 className="page-title">Systems shown with their decisions intact.</h1>
        </div>
        <p className="page-description">
          The initial entries are clearly labelled demonstrations. Genuine project records can
          replace them through the same validated content contract.
        </p>
      </header>
      <ProjectFilter options={model.filters} projects={model.projects} />
    </main>
  );
}
