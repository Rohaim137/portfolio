import type { DestinationState, PublicProfile } from "@/lib/content-application-foundation/domain";

import { portfolioCopy } from "./copy";
import type {
  CollectionPresentation,
  ContentProvenance,
  DestinationPresentation,
  ProfilePresentation,
} from "./types";

export function hasConfiguredProfile(profile: PublicProfile): boolean {
  return Boolean(
    profile.name ||
    profile.role ||
    profile.introduction ||
    profile.location ||
    profile.focus ||
    profile.biography ||
    profile.skills?.length ||
    profile.interests?.length ||
    profile.timeline?.length,
  );
}

export function resolveProfilePresentation(profile: PublicProfile): ProfilePresentation {
  if (hasConfiguredProfile(profile)) {
    return { kind: "configured", profile };
  }

  return {
    kind: "generic",
    heading: portfolioCopy.genericProfile.heading,
    description: portfolioCopy.genericProfile.description,
  };
}

export function resolveProvenance(demo: boolean): ContentProvenance {
  return demo
    ? { kind: "demo", label: "Demo", disclosure: portfolioCopy.demoDisclosure }
    : { kind: "owner" };
}

export function resolveCollection<T>(
  items: readonly T[],
  empty: Readonly<{ heading: string; description: string }>,
): CollectionPresentation<T> {
  return items.length > 0 ? { kind: "populated", items } : { kind: "empty", ...empty };
}

export function resolveDestination(destination: DestinationState): DestinationPresentation {
  return destination.kind === "active"
    ? { kind: "link", label: destination.label, href: destination.href, external: true }
    : { kind: "pending", label: destination.label, statusText: "link pending" };
}
