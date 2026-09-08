import { z } from "zod";

const nonEmptyText = z.string().trim().min(1);
const slugText = nonEmptyText;
const calendarDateText = nonEmptyText;
const urlText = nonEmptyText;
const publicPathText = nonEmptyText;

export const imageMediaSchema = z.strictObject({
  kind: z.literal("image"),
  src: publicPathText,
  alt: nonEmptyText,
  caption: nonEmptyText.optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const videoMediaSchema = z.strictObject({
  kind: z.literal("video"),
  src: publicPathText,
  poster: publicPathText,
  alt: nonEmptyText,
  caption: nonEmptyText.optional(),
});

export const projectMediaSchema = z.discriminatedUnion("kind", [
  imageMediaSchema,
  videoMediaSchema,
]);

const publicationFields = {
  draft: z.boolean(),
  demo: z.boolean().default(false),
} as const;

export const projectFrontMatterSchema = z.strictObject({
  title: nonEmptyText,
  slug: slugText,
  summary: nonEmptyText,
  featured: z.boolean(),
  technologies: z.array(nonEmptyText).min(1),
  cover: imageMediaSchema,
  status: z.enum(["shipped", "prototype", "coursework", "research", "archived"]),
  ...publicationFields,
  projectType: nonEmptyText.optional(),
  startedAt: calendarDateText.optional(),
  completedAt: calendarDateText.optional(),
  repositoryUrl: urlText.optional(),
  demoUrl: urlText.optional(),
  gallery: z.array(projectMediaSchema).optional(),
  architecture: nonEmptyText.optional(),
  decisions: z.array(nonEmptyText).optional(),
  results: z.array(nonEmptyText).optional(),
  retrospective: nonEmptyText.optional(),
});

export const postFrontMatterSchema = z.strictObject({
  title: nonEmptyText,
  slug: slugText,
  description: nonEmptyText,
  publishedAt: calendarDateText,
  ...publicationFields,
  tags: z.array(nonEmptyText).optional(),
  cover: imageMediaSchema.optional(),
  updatedAt: calendarDateText.optional(),
  series: nonEmptyText.optional(),
  showTableOfContents: z.boolean().optional(),
});

export const readingFrontMatterSchema = z.strictObject({
  title: nonEmptyText,
  slug: slugText,
  status: z.enum(["queued", "reading", "completed"]),
  sourceUrl: urlText,
  topics: z.array(nonEmptyText).min(1),
  ...publicationFields,
  authors: z.array(nonEmptyText).optional(),
  year: z.number().int().min(1000).max(9999).optional(),
  venue: nonEmptyText.optional(),
  startedAt: calendarDateText.optional(),
  completedAt: calendarDateText.optional(),
  rating: z.number().min(0).max(5).optional(),
  summary: nonEmptyText.optional(),
});

export const publicDocumentSchema = z.strictObject({
  title: nonEmptyText,
  file: publicPathText,
  description: nonEmptyText,
  updatedAt: calendarDateText.optional(),
  category: nonEmptyText.optional(),
  featured: z.boolean().optional(),
});

export const publicDocumentManifestSchema = z.array(publicDocumentSchema);

const publicProfileSchema = z.strictObject({
  name: nonEmptyText.optional(),
  role: nonEmptyText.optional(),
  introduction: nonEmptyText.optional(),
  location: nonEmptyText.optional(),
  focus: nonEmptyText.optional(),
  biography: nonEmptyText.optional(),
  skills: z.array(nonEmptyText).optional(),
  interests: z.array(nonEmptyText).optional(),
  timeline: z
    .array(
      z.strictObject({
        label: nonEmptyText,
        description: nonEmptyText,
      }),
    )
    .optional(),
});

const socialLabelSchema = z.enum(["GitHub", "LinkedIn", "X", "Email"]);

const activeDestinationSchema = z.strictObject({
  kind: z.literal("active"),
  label: socialLabelSchema,
  href: nonEmptyText,
});

const pendingDestinationSchema = z.strictObject({
  kind: z.literal("pending"),
  label: z.enum(["LinkedIn", "X", "Email"]),
});

export const destinationStateSchema = z.discriminatedUnion("kind", [
  activeDestinationSchema,
  pendingDestinationSchema,
]);

export const siteConfigSchema = z.strictObject({
  title: nonEmptyText,
  defaultDescription: nonEmptyText,
  siteUrl: urlText.optional(),
  defaultSocialImage: publicPathText,
  navigation: z.array(
    z.strictObject({
      label: nonEmptyText,
      href: nonEmptyText,
    }),
  ),
  publicProfile: publicProfileSchema,
  githubUsername: nonEmptyText,
  destinations: z.array(destinationStateSchema),
});

const contributionDaySchema = z.strictObject({
  date: calendarDateText,
  count: z.number().int().nonnegative(),
  level: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
});

export const contributionCalendarSchema = z.strictObject({
  username: nonEmptyText,
  generatedAt: nonEmptyText,
  weeks: z.array(
    z.strictObject({
      days: z.array(contributionDaySchema),
    }),
  ),
});

export type ProjectFrontMatter = z.output<typeof projectFrontMatterSchema>;
export type PostFrontMatter = z.output<typeof postFrontMatterSchema>;
export type ReadingFrontMatter = z.output<typeof readingFrontMatterSchema>;
