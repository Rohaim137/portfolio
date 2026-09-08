import type { SiteConfig } from "@/lib/content-application-foundation/domain";

export const siteConfig = {
  title: "Rohaim — Portfolio",
  defaultDescription: "An editorial portfolio for selected work, writing, and research notes.",
  defaultSocialImage: "/media/social/default.svg",
  navigation: [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects/" },
    { label: "Blog", href: "/blog/" },
    { label: "Reading", href: "/reading/" },
    { label: "Docs", href: "/docs/" },
  ],
  publicProfile: {},
  githubUsername: "Rohaim137",
  destinations: [
    { kind: "active", label: "GitHub", href: "https://github.com/Rohaim137" },
    { kind: "pending", label: "LinkedIn" },
    { kind: "pending", label: "X" },
    { kind: "pending", label: "Email" },
  ],
} as const satisfies SiteConfig;
