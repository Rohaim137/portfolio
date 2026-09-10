import { ActionLink, PendingDestination } from "@/components/ui";
import type { DestinationState } from "@/lib/content-application-foundation/domain";
import { resolveDestination } from "@/lib/portfolio-experience";

export function SocialDestinations({
  destinations,
}: Readonly<{ destinations: readonly DestinationState[] }>) {
  return (
    <ul aria-label="Social destinations" className="social-list">
      {destinations.map((destination) => {
        const presentation = resolveDestination(destination);
        return (
          <li key={destination.label}>
            {presentation.kind === "link" ? (
              <ActionLink
                href={presentation.href}
                testId={`social-${presentation.label.toLowerCase()}-link`}
              >
                {presentation.label}
              </ActionLink>
            ) : (
              <PendingDestination label={presentation.label} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
