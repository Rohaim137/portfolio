import type { Metadata } from "next";

import { EmptyState } from "@/components/ui";
import {
  metadataService,
  validatedSiteConfig,
} from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";
import { portfolioCopy, resolveProfilePresentation } from "@/lib/portfolio-experience";

export const metadata: Metadata = toNextMetadata(
  metadataService.forIndex({
    title: "About - Muhammad Rohaim",
    description: "Experience, skills, and education from Muhammad Rohaim's supplied CV.",
    pathname: "/about/",
  }),
);

export default function AboutPage() {
  const profile = resolveProfilePresentation(validatedSiteConfig.publicProfile);
  return (
    <main className="page-main" data-od-id="about-page" id="main-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="page-title">Experience grounded in software and machine learning.</h1>
        </div>
        <p className="page-description">
          Verified profile details drawn from the portfolio owner&apos;s supplied CV.
        </p>
      </header>
      {profile.kind === "generic" ? (
        <EmptyState {...portfolioCopy.aboutNotConfigured} testId="about-empty-state" />
      ) : (
        <article className="article-body">
          {profile.profile.name ? <h2>{profile.profile.name}</h2> : null}
          {profile.profile.role ? <p>{profile.profile.role}</p> : null}
          {profile.profile.biography ? <p>{profile.profile.biography}</p> : null}
          {profile.profile.location ? <p>Location: {profile.profile.location}</p> : null}
          {profile.profile.skills?.length ? (
            <>
              <h2>Skills</h2>
              <ul>
                {profile.profile.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </>
          ) : null}
          {profile.profile.interests?.length ? (
            <>
              <h2>Interests</h2>
              <ul>
                {profile.profile.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </>
          ) : null}
          {profile.profile.timeline?.length ? (
            <>
              <h2>Timeline</h2>
              <ol>
                {profile.profile.timeline.map((entry) => (
                  <li key={`${entry.label}-${entry.description}`}>
                    <strong>{entry.label}</strong> - {entry.description}
                  </li>
                ))}
              </ol>
            </>
          ) : null}
        </article>
      )}
    </main>
  );
}
