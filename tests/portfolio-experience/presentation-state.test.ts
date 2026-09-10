import { describe, expect, it } from "vitest";

import type { DestinationState, PublicProfile } from "@/lib/content-application-foundation/domain";
import {
  hasConfiguredProfile,
  portfolioCopy,
  resolveCollection,
  resolveDestination,
  resolveProfilePresentation,
  resolveProvenance,
} from "@/lib/portfolio-experience";

describe("portfolio presentation state", () => {
  it("keeps an empty profile generic without mutating verified profile data", () => {
    const profile: PublicProfile = {};

    expect(hasConfiguredProfile(profile)).toBe(false);
    expect(resolveProfilePresentation(profile)).toEqual({
      kind: "generic",
      heading: portfolioCopy.genericProfile.heading,
      description: portfolioCopy.genericProfile.description,
    });
    expect(profile).toEqual({});
  });

  it.each<PublicProfile>([
    { name: "Name" },
    { role: "Role" },
    { introduction: "Introduction" },
    { location: "Location" },
    { focus: "Focus" },
    { biography: "Biography" },
    { skills: ["TypeScript"] },
    { interests: ["Systems"] },
    { timeline: [{ label: "Now", description: "Current work" }] },
  ])("recognizes every supported configured profile field", (profile) => {
    expect(hasConfiguredProfile(profile)).toBe(true);
    expect(resolveProfilePresentation(profile)).toEqual({ kind: "configured", profile });
  });

  it("does not treat empty profile collections as configured", () => {
    expect(hasConfiguredProfile({ skills: [], interests: [], timeline: [] })).toBe(false);
  });

  it("labels demonstration provenance and leaves owner content undisclosed", () => {
    expect(resolveProvenance(true)).toEqual({
      kind: "demo",
      label: "Demo",
      disclosure: portfolioCopy.demoDisclosure,
    });
    expect(resolveProvenance(false)).toEqual({ kind: "owner" });
  });

  it("distinguishes populated and empty collections", () => {
    expect(resolveCollection(["entry"], portfolioCopy.emptyPosts)).toEqual({
      kind: "populated",
      items: ["entry"],
    });
    expect(resolveCollection([], portfolioCopy.emptyPosts)).toEqual({
      kind: "empty",
      ...portfolioCopy.emptyPosts,
    });
  });

  it("presents only active destinations as links", () => {
    const active: DestinationState = {
      kind: "active",
      label: "GitHub",
      href: "https://github.com/example",
    };
    const pending: DestinationState = { kind: "pending", label: "Email" };

    expect(resolveDestination(active)).toEqual({
      kind: "link",
      label: "GitHub",
      href: "https://github.com/example",
      external: true,
    });
    expect(resolveDestination(pending)).toEqual({
      kind: "pending",
      label: "Email",
      statusText: "link pending",
    });
  });
});
