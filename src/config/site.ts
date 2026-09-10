import type { SiteConfig } from "@/lib/content-application-foundation/domain";

export const siteConfig = {
  title: "Muhammad Rohaim - Portfolio",
  defaultDescription:
    "Muhammad Rohaim's portfolio of enterprise software, AI, full-stack, and game development work.",
  defaultSocialImage: "/media/social/default.svg",
  navigation: [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects/" },
    { label: "Blog", href: "/blog/" },
    { label: "Reading", href: "/reading/" },
    { label: "About", href: "/about/" },
    { label: "Docs", href: "/docs/" },
  ],
  publicProfile: {
    name: "Muhammad Rohaim",
    role: "Associate Software Engineer",
    introduction:
      "Computer Science graduate working across enterprise software, AI, full-stack systems, and game development.",
    focus:
      "Oracle Cloud Infrastructure integrations, Redwood applications, machine learning systems, and practical product development.",
    biography:
      "Computer Science graduate with strong foundations in algorithms and machine learning, combining mathematical thinking with hands-on development experience across enterprise software, AI, full-stack systems, and game development.",
    skills: [
      "Languages: C, C++, C#, Python, JavaScript, x86 Assembly",
      "AI/ML: PyTorch, TensorFlow, Scikit-learn, Keras, LangChain, LangGraph",
      "Web: Django, React, Next.js, HTML/CSS",
      "Tools: Git, Docker, Linux, Oracle Cloud Infrastructure",
      "Databases: MySQL, SQL Server, PostgreSQL",
    ],
    timeline: [
      {
        label: "Jun 2026 - Present",
        description:
          "Associate Software Engineer at GoSaaS, Inc., working with Oracle Cloud Infrastructure for ERP integrations and Redwood applications.",
      },
      {
        label: "Jun 2024 - Aug 2024",
        description:
          "Game Development Intern at Rift Games, developing multiplayer FPS features with Unity and Mirror Networking and contributing to gameplay systems and real-time synchronization logic.",
      },
      {
        label: "2022 - Jun 2026",
        description:
          "BS Computer Science at FAST NUCES Lahore, CGPA 3.73/4.00, with Dean's List recognition in six semesters.",
      },
      {
        label: "Jul 2026",
        description:
          "Oracle Cloud Infrastructure Certified Application Integration Professional and LangChain: Agentic AI Engineering with LangChain & LangGraph.",
      },
    ],
  },
  githubUsername: "Rohaim137",
  destinations: [
    { kind: "active", label: "GitHub", href: "https://github.com/Rohaim137" },
    {
      kind: "active",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-rohaim",
    },
    { kind: "pending", label: "X" },
    { kind: "active", label: "Email", href: "mailto:rohaim042@gmail.com" },
  ],
} as const satisfies SiteConfig;
