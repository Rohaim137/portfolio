import { ActionLink } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <main className="page-main" data-od-id="not-found" id="main-content">
      <p className="eyebrow">404</p>
      <h1 className="page-title">This page is not in the collection.</h1>
      <p className="lede">The address may have changed, or the entry may not be published.</p>
      <div className="project-actions">
        <ActionLink href="/" testId="not-found-home-link">
          Return home
        </ActionLink>
        <ActionLink href="/projects/" testId="not-found-projects-link">
          Browse projects
        </ActionLink>
        <ActionLink href="/blog/" testId="not-found-blog-link">
          Read writing
        </ActionLink>
      </div>
    </main>
  );
}
