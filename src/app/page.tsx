import { validatedSiteConfig } from "@/lib/content-application-foundation/services/composition-root";

export default function HomePage() {
  const github = validatedSiteConfig.destinations.find(
    (destination) => destination.kind === "active" && destination.label === "GitHub",
  );
  const githubHref = github?.kind === "active" ? github.href : undefined;

  return (
    <main className="foundation" data-od-id="home-foundation" id="main-content">
      <p className="eyebrow">Portfolio foundation</p>
      <h1>Work, writing, and notes—built to be read.</h1>
      <p className="lede">
        The content system is being assembled. Personal details will appear only after they are
        deliberately supplied and verified.
      </p>
      {githubHref ? (
        <a
          className="text-link"
          data-testid="home-github-profile-link"
          href={githubHref}
          rel="noreferrer"
          target="_blank"
        >
          Visit GitHub profile
        </a>
      ) : null}
    </main>
  );
}
