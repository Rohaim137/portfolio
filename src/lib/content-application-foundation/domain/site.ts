import type { ExternalWebUrl } from "./shared";

export type SocialLabel = "GitHub" | "LinkedIn" | "X" | "Email";

export type DestinationState =
  | Readonly<{
      kind: "active";
      label: SocialLabel;
      href: string;
    }>
  | Readonly<{
      kind: "pending";
      label: Exclude<SocialLabel, "GitHub">;
    }>;

export type NavigationItem = Readonly<{
  label: string;
  href: string;
}>;

export type ProfileTimelineEntry = Readonly<{
  label: string;
  description: string;
}>;

export type PublicProfile = Readonly<{
  name?: string;
  role?: string;
  introduction?: string;
  location?: string;
  focus?: string;
  biography?: string;
  skills?: readonly string[];
  interests?: readonly string[];
  timeline?: readonly ProfileTimelineEntry[];
}>;

export type SiteConfig = Readonly<{
  title: string;
  defaultDescription: string;
  siteUrl?: ExternalWebUrl;
  defaultSocialImage: string;
  navigation: readonly NavigationItem[];
  publicProfile: PublicProfile;
  githubUsername: string;
  destinations: readonly DestinationState[];
}>;
