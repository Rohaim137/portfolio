import Image from "next/image";
import Link from "next/link";

import { ActionLink, DemoBadge, StatusLabel } from "@/components/ui";
import type { ProjectSummary } from "@/lib/content-application-foundation/domain";

export function ProjectCard({
  project,
  headingLevel = 2,
}: Readonly<{ project: ProjectSummary; headingLevel?: 2 | 3 }>) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article>
      <Image
        alt={project.cover.alt}
        className="project-card-cover"
        height={project.cover.height}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
        src={project.cover.src}
        width={project.cover.width}
      />
      <div className="project-card-meta">
        {project.demo ? <DemoBadge /> : null}
        <StatusLabel>{project.status}</StatusLabel>
        {project.projectType ? <span>{project.projectType}</span> : null}
      </div>
      <Heading>
        <Link
          data-testid={`project-${project.slug}-detail-link`}
          href={`/projects/${project.slug}/`}
        >
          {project.title}
        </Link>
      </Heading>
      <p>{project.summary}</p>
      <ul aria-label={`${project.title} technologies`} className="tag-list">
        {project.technologies.map((technology) => (
          <li className="tag" key={technology}>
            {technology}
          </li>
        ))}
      </ul>
      {project.repositoryUrl || project.demoUrl ? (
        <div className="project-actions">
          {project.repositoryUrl ? (
            <ActionLink
              href={project.repositoryUrl}
              testId={`project-${project.slug}-repository-link`}
            >
              Repository
            </ActionLink>
          ) : null}
          {project.demoUrl ? (
            <ActionLink href={project.demoUrl} testId={`project-${project.slug}-live-link`}>
              Live view
            </ActionLink>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
