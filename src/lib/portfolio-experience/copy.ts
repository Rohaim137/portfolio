export const portfolioCopy = Object.freeze({
  genericProfile: {
    heading: "Work, writing, and notes built to be read.",
    description:
      "A flexible portfolio for selected projects, technical articles, and research notes. Personal details can be added when they are ready to publish.",
  },
  genericFocus: {
    heading: "Current focus",
    description: "A current focus has not been published yet.",
  },
  emptyProjects: {
    heading: "No projects published yet",
    description: "Project case studies can be added through the repository content collection.",
  },
  emptyPosts: {
    heading: "No writing published yet",
    description: "Technical articles can be added through the repository content collection.",
  },
  emptyReading: {
    heading: "Reading notes are not published yet",
    description:
      "This area will list source-linked reading and research notes when they are ready.",
  },
  emptyDocuments: {
    heading: "No public documents available",
    description:
      "A document will appear here only after it has been deliberately approved for public access.",
  },
  aboutNotConfigured: {
    heading: "Profile details are not published yet",
    description:
      "This page is ready for a biography, areas of focus, skills, and a timeline when those details are supplied.",
  },
  contributionNotConnected: {
    heading: "GitHub activity is not connected",
    description:
      "Contribution data is intentionally absent. The verified GitHub profile remains available directly.",
  },
  noFilterMatch: {
    heading: "No projects match these filters",
    description: "Clear one or both filters to return to the complete project list.",
    resetLabel: "Reset project filters",
  },
  demoDisclosure:
    "This is demonstration material for evaluating the portfolio layout. It is not presented as the owner's work, experience, or opinion.",
} as const);
