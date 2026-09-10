import Image from "next/image";
import Link from "next/link";

import { SocialDestinations } from "@/components/layout";
import { ActionLink, DemoBadge, EmptyState, SectionHeader, StatusLabel } from "@/components/ui";
import type { HomePageViewModel } from "@/lib/content-application-foundation/domain";
import {
  portfolioCopy,
  resolveCollection,
  resolveProfilePresentation,
} from "@/lib/portfolio-experience";

export function HomePageContent({ model }: Readonly<{ model: HomePageViewModel }>) {
  const profile = resolveProfilePresentation(model.profile);
  const projects = resolveCollection(model.featuredProjects, portfolioCopy.emptyProjects);
  const posts = resolveCollection(model.latestPosts, portfolioCopy.emptyPosts);
  const reading = resolveCollection(model.currentReading, portfolioCopy.emptyReading);
  const github = model.destinations.find(
    (destination) => destination.kind === "active" && destination.label === "GitHub",
  );
  const heroHeading =
    profile.kind === "configured"
      ? (profile.profile.name ?? portfolioCopy.genericProfile.heading)
      : profile.heading;

  return (
    <main className="page-main" id="main-content">
      <section className="page-header" data-od-id="home-introduction">
        <div>
          <p className="eyebrow">Portfolio overview</p>
          <h1 className="hero-title">{heroHeading}</h1>
        </div>
        <p className="lede">
          {profile.kind === "configured"
            ? (profile.profile.introduction ??
              profile.profile.role ??
              portfolioCopy.genericProfile.description)
            : profile.description}
        </p>
      </section>

      <section className="content-section content-section--compact" data-od-id="home-focus">
        <SectionHeader
          description={model.profile.focus ?? portfolioCopy.genericFocus.description}
          eyebrow="Now"
          heading={portfolioCopy.genericFocus.heading}
        />
      </section>

      <section className="content-section" data-od-id="home-projects">
        <SectionHeader
          action={
            <ActionLink href="/projects/" testId="home-all-projects-link">
              View all projects
            </ActionLink>
          }
          description="Verified project summaries are presented alongside any clearly identified demonstration material."
          eyebrow="Selected work"
          heading="Projects with room for the reasoning"
        />
        {projects.kind === "populated" ? (
          <ul className="project-grid">
            {projects.items.map((project, index) => (
              <li className="project-card" key={project.slug}>
                <Image
                  alt={project.cover.alt}
                  className="project-card-cover"
                  height={project.cover.height}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={project.cover.src}
                  width={project.cover.width}
                />
                <div className="project-card-meta">
                  {project.demo ? <DemoBadge /> : null}
                  <StatusLabel>{project.status}</StatusLabel>
                </div>
                <h2>
                  <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
                </h2>
                <p>{project.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState {...projects} testId="home-projects-empty-state" />
        )}
      </section>

      <section className="content-section" data-od-id="home-writing">
        <SectionHeader
          action={
            <ActionLink href="/blog/" testId="home-all-writing-link">
              Read all writing
            </ActionLink>
          }
          description="Educational demonstrations show the long-form reading system without attributing personal opinions or experience."
          eyebrow="Writing"
          heading="Notes on systems and interfaces"
        />
        {posts.kind === "populated" ? (
          <ol className="post-list">
            {posts.items.map((post) => (
              <li className="post-card" key={post.slug}>
                <div className="post-card-meta">
                  {post.demo ? <DemoBadge /> : null}
                  <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                  <span>{post.readingTime.label}</span>
                </div>
                <h2>
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h2>
                <p>{post.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState {...posts} testId="home-writing-empty-state" />
        )}
      </section>

      <section className="content-section" data-od-id="home-reading">
        <SectionHeader eyebrow="Reading" heading="Research notes, when they are ready" />
        {reading.kind === "populated" ? (
          <ul className="reading-list">
            {reading.items.map((item) => (
              <li className="reading-item" key={item.slug}>
                <StatusLabel>{item.status}</StatusLabel>
                <h3>{item.title}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState {...reading} testId="home-reading-empty-state" />
        )}
      </section>

      <section className="content-section" data-od-id="home-github">
        <SectionHeader
          description={portfolioCopy.contributionNotConnected.description}
          eyebrow="GitHub"
          heading={portfolioCopy.contributionNotConnected.heading}
        />
        {github?.kind === "active" ? (
          <ActionLink href={github.href} testId="home-github-profile-link">
            Visit the verified GitHub profile
          </ActionLink>
        ) : null}
      </section>

      <section className="content-section" data-od-id="home-social">
        <SectionHeader eyebrow="Elsewhere" heading="Verified and pending destinations" />
        <SocialDestinations destinations={model.destinations} />
      </section>
    </main>
  );
}
