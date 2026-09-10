import type { ProjectSummary } from "@/lib/content-application-foundation/domain";

import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: Readonly<{ projects: readonly ProjectSummary[] }>) {
  return (
    <ul className="project-grid" data-testid="project-grid">
      {projects.map((project) => (
        <li className="project-card" key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
