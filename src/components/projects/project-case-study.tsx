import { ActionLink, CompiledContent, DemoDisclosure, StatusLabel } from "@/components/ui";
import type { ProjectDetail } from "@/lib/content-application-foundation/domain";

import { ProjectGallery } from "./project-gallery";

export function ProjectCaseStudy({ project }: Readonly<{ project: ProjectDetail }>) {
  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Project case study</p>
          <h1 className="page-title">{project.title}</h1>
        </div>
        <div className="page-description">
          <div className="project-card-meta">
            <StatusLabel>{project.status}</StatusLabel>
            {project.projectType ? <span>{project.projectType}</span> : null}
          </div>
          <p>{project.summary}</p>
        </div>
      </header>
      {project.demo ? <DemoDisclosure /> : null}
      <div className="article-shell content-section">
        <article className="article-body">
          <CompiledContent content={project.body} />
        </article>
        <aside>
          <h2>Project frame</h2>
          {project.architecture ? <p>{project.architecture}</p> : null}
          <h3>Technologies</h3>
          <ul className="tag-list">
            {project.technologies.map((technology) => (
              <li className="tag" key={technology}>
                {technology}
              </li>
            ))}
          </ul>
          {project.decisions.length > 0 ? (
            <>
              <h3>Decisions</h3>
              <ul>
                {project.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </>
          ) : null}
          {project.retrospective ? (
            <>
              <h3>Retrospective</h3>
              <p>{project.retrospective}</p>
            </>
          ) : null}
          {project.repositoryUrl || project.demoUrl ? (
            <div className="project-actions">
              {project.repositoryUrl ? (
                <ActionLink href={project.repositoryUrl} testId="project-detail-repository-link">
                  Repository
                </ActionLink>
              ) : null}
              {project.demoUrl ? (
                <ActionLink href={project.demoUrl} testId="project-detail-live-link">
                  Live view
                </ActionLink>
              ) : null}
            </div>
          ) : null}
        </aside>
      </div>
      <ProjectGallery items={project.gallery} label={`${project.title} media`} />
    </>
  );
}
