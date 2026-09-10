import { describe, expect, it, vi } from "vitest";

import type {
  PostSummary,
  ProjectSummary,
  PublicDocument,
  ReadingSummary,
} from "@/lib/content-application-foundation/domain";
import {
  assertVisibilityOptions,
  compareCalendarDates,
  compareDocuments,
  comparePosts,
  compareProjects,
  compareReading,
  findDuplicateSlugs,
  hasPublishableBody,
  isMailDestination,
  isSecureWebUrl,
  isValidCalendarDate,
  isValidPublicDocumentPath,
  isValidSlug,
  isVisible,
  readingDetailHref,
  resolveDestination,
  toPublishedState,
  validateSlug,
} from "@/lib/content-application-foundation/policies";

describe("slug policies", () => {
  it("accepts lowercase kebab-case and reports syntax plus filename mismatches", () => {
    expect(isValidSlug("static-content-pipeline")).toBe(true);
    expect(isValidSlug("Static_Content")).toBe(false);
    expect(
      validateSlug("wrong-slug", {
        collection: "projects",
        file: "content/projects/expected-slug.mdx",
        filenameStem: "expected-slug",
      }).map((error) => error.code),
    ).toEqual(["CONTENT_FILENAME_SLUG_MISMATCH"]);
    expect(
      validateSlug("Bad_Slug", {
        collection: "projects",
        file: "content/projects/Bad_Slug.mdx",
        filenameStem: "Bad_Slug",
      }).map((error) => error.code),
    ).toEqual(["CONTENT_SLUG_INVALID"]);
  });

  it("reports every duplicate source in deterministic path order", () => {
    const errors = findDuplicateSlugs("blog", [
      { slug: "same", file: "content/blog/z.mdx" },
      { slug: "same", file: "content/blog/a.mdx" },
    ]);
    expect(errors.map((error) => error.file)).toEqual(["content/blog/a.mdx", "content/blog/z.mdx"]);
    expect(findDuplicateSlugs("blog", [{ slug: "unique", file: "unique.mdx" }])).toEqual([]);
  });
});

describe("calendar and visibility policies", () => {
  it("validates authored calendar days without wall-clock dependence", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2040-12-31T23:59:59Z"));
    expect(isValidCalendarDate("2024-02-29")).toBe(true);
    expect(isValidCalendarDate("2023-02-29")).toBe(false);
    expect(isValidCalendarDate("2024-13-01")).toBe(false);
    expect(isValidCalendarDate("not-a-date")).toBe(false);
    expect(isValidCalendarDate("1900-02-29")).toBe(false);
    expect(isValidCalendarDate("2000-02-29")).toBe(true);
    expect(isValidCalendarDate("2023-04-31")).toBe(false);
    expect(isValidCalendarDate("not-a-date")).toBe(false);
    expect(compareCalendarDates("2025-01-01", "2025-01-01")).toBe(0);
    expect(compareCalendarDates(undefined, "2025-01-01")).toBe(1);
    expect(compareCalendarDates("2025-01-01", undefined)).toBe(-1);
    vi.useRealTimers();
  });

  it("excludes drafts, forbids production preview, and preserves demo state", () => {
    expect(isVisible({ draft: true, demo: true }, { mode: "test" })).toBe(false);
    expect(isVisible({ draft: true, demo: true }, { mode: "test", includeDrafts: true })).toBe(
      true,
    );
    expect(() => assertVisibilityOptions({ mode: "production", includeDrafts: true })).toThrow(
      /Draft inclusion/,
    );
    expect(toPublishedState({ draft: false, demo: true })).toEqual({ demo: true });
    expect(
      isVisible({ draft: false, demo: true }, { mode: "production", includeDemo: false }),
    ).toBe(false);
  });
});

describe("destination, reading, and document policies", () => {
  it("allows secure web and mail destinations without making network calls", () => {
    const fetchSpy = vi.fn(() => {
      throw new Error("network access is forbidden");
    });
    vi.stubGlobal("fetch", fetchSpy);

    expect(isSecureWebUrl("https://github.com/Rohaim137")).toBe(true);
    expect(isSecureWebUrl("http://example.com")).toBe(false);
    expect(isSecureWebUrl("javascript:alert(1)")).toBe(false);
    expect(isSecureWebUrl("not a url")).toBe(false);
    expect(isSecureWebUrl("https://user:password@example.com")).toBe(false);
    expect(isMailDestination("mailto:owner@example.com")).toBe(true);
    expect(isMailDestination("not a mail destination")).toBe(false);
    expect(resolveDestination("LinkedIn")).toEqual({ kind: "pending", label: "LinkedIn" });
    expect(resolveDestination("GitHub", "https://github.com/Rohaim137")).toEqual({
      kind: "active",
      label: "GitHub",
      href: "https://github.com/Rohaim137",
    });
    expect(() => resolveDestination("LinkedIn", "http://example.com")).toThrow(/unsupported/);
    expect(() => resolveDestination("GitHub")).toThrow(/must be configured/);
    expect(fetchSpy).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("creates reading details only for meaningful bodies", () => {
    expect(hasPublishableBody("  ")).toBe(false);
    expect(readingDetailHref("typed-boundaries", "Useful notes")).toBe(
      "/reading/typed-boundaries/",
    );
    expect(readingDetailHref("typed-boundaries", "  ")).toBeUndefined();
  });

  it("accepts only normalized files under the public document root", () => {
    expect(isValidPublicDocumentPath("/documents/cv.pdf")).toBe(true);
    expect(isValidPublicDocumentPath("/documents/../private.pdf")).toBe(false);
    expect(isValidPublicDocumentPath("documents/cv.pdf")).toBe(false);
    expect(isValidPublicDocumentPath("")).toBe(false);
    expect(isValidPublicDocumentPath("/documents\\cv.pdf")).toBe(false);
    expect(isValidPublicDocumentPath("/documents/cv.pdf?download=1")).toBe(false);
  });
});

describe("deterministic ordering", () => {
  const readingTime = { minutes: 1, words: 100, label: "1 min read" } as const;
  const cover = { kind: "image", src: "/cover.svg", alt: "Cover", width: 10, height: 10 } as const;

  it("orders all public collections using explicit tie breakers", () => {
    const projects: ProjectSummary[] = [
      {
        title: "Zulu",
        slug: "zulu",
        summary: "Z",
        featured: false,
        technologies: [],
        cover,
        status: "prototype",
        demo: false,
      },
      {
        title: "Alpha",
        slug: "alpha",
        summary: "A",
        featured: true,
        technologies: [],
        cover,
        status: "shipped",
        demo: true,
      },
    ];
    const posts: PostSummary[] = [
      {
        title: "Older",
        slug: "older",
        description: "Old",
        publishedAt: "2024-01-01",
        readingTime,
        tags: [],
        demo: false,
      },
      {
        title: "Newer",
        slug: "newer",
        description: "New",
        publishedAt: "2025-01-01",
        readingTime,
        tags: [],
        demo: false,
      },
    ];
    const reading: ReadingSummary[] = [
      {
        title: "Later",
        slug: "later",
        status: "completed",
        sourceUrl: "https://example.com/later",
        topics: [],
        demo: false,
        authors: [],
        completedAt: "2025-01-01",
      },
      {
        title: "Earlier",
        slug: "earlier",
        status: "completed",
        sourceUrl: "https://example.com/earlier",
        topics: [],
        demo: false,
        authors: [],
        completedAt: "2024-01-01",
      },
    ];
    const documents: PublicDocument[] = [
      { title: "Notes", file: "/documents/notes.pdf", description: "Notes", featured: false },
      { title: "CV", file: "/documents/cv.pdf", description: "CV", featured: true },
    ];

    expect(projects.sort(compareProjects).map((item) => item.slug)).toEqual(["alpha", "zulu"]);
    expect(posts.sort(comparePosts).map((item) => item.slug)).toEqual(["newer", "older"]);
    expect(reading.sort(compareReading).map((item) => item.slug)).toEqual(["later", "earlier"]);
    expect(documents.sort(compareDocuments).map((item) => item.title)).toEqual(["CV", "Notes"]);

    const tiedPosts: PostSummary[] = [
      { ...posts[0], title: "Same", slug: "z", publishedAt: "2025-01-01" },
      { ...posts[0], title: "Same", slug: "a", publishedAt: "2025-01-01" },
    ];
    expect(tiedPosts.sort(comparePosts).map((item) => item.slug)).toEqual(["a", "z"]);

    const undatedReading: ReadingSummary[] = [
      { ...reading[0], title: "Zulu", slug: "zulu", completedAt: undefined },
      { ...reading[0], title: "Alpha", slug: "alpha", completedAt: undefined },
    ];
    expect(undatedReading.sort(compareReading).map((item) => item.slug)).toEqual(["alpha", "zulu"]);
  });

  it("uses every ordering fallback in both directions", () => {
    const project: ProjectSummary = {
      title: "Same",
      slug: "same",
      summary: "Same",
      featured: false,
      technologies: [],
      cover,
      status: "prototype",
      demo: false,
    };
    expect(compareProjects({ ...project, featured: true }, project)).toBeLessThan(0);
    expect(compareProjects(project, { ...project, featured: true })).toBeGreaterThan(0);
    expect(
      compareProjects(
        { ...project, completedAt: "2025-01-01" },
        { ...project, completedAt: "2024-01-01" },
      ),
    ).toBeLessThan(0);
    expect(compareProjects({ ...project, title: "Alpha" }, project)).toBeLessThan(0);
    expect(compareProjects({ ...project, slug: "zulu" }, project)).toBeGreaterThan(0);
    expect(compareProjects(project, project)).toBe(0);

    const post: PostSummary = {
      title: "Same",
      slug: "same",
      description: "Same",
      publishedAt: "2025-01-01",
      readingTime,
      tags: [],
      demo: false,
    };
    expect(comparePosts(post, { ...post, publishedAt: "2024-01-01" })).toBeLessThan(0);
    expect(comparePosts({ ...post, title: "Zulu" }, post)).toBeGreaterThan(0);
    expect(comparePosts({ ...post, slug: "alpha" }, post)).toBeLessThan(0);
    expect(comparePosts(post, post)).toBe(0);

    const readingItem: ReadingSummary = {
      title: "Same",
      slug: "same",
      status: "reading",
      sourceUrl: "https://example.com",
      topics: [],
      demo: false,
      authors: [],
      startedAt: "2025-01-01",
    };
    expect(compareReading(readingItem, { ...readingItem, startedAt: "2024-01-01" })).toBeLessThan(
      0,
    );
    expect(compareReading({ ...readingItem, title: "Zulu" }, readingItem)).toBeGreaterThan(0);
    expect(compareReading({ ...readingItem, slug: "alpha" }, readingItem)).toBeLessThan(0);
    expect(compareReading(readingItem, readingItem)).toBe(0);

    const document: PublicDocument = {
      title: "Same",
      file: "/documents/same.pdf",
      description: "Same",
    };
    expect(compareDocuments({ ...document, featured: true }, document)).toBeLessThan(0);
    expect(
      compareDocuments(
        { ...document, updatedAt: "2025-01-01" },
        { ...document, updatedAt: "2024-01-01" },
      ),
    ).toBeLessThan(0);
    expect(compareDocuments({ ...document, title: "Zulu" }, document)).toBeGreaterThan(0);
    expect(compareDocuments({ ...document, file: "/documents/alpha.pdf" }, document)).toBeLessThan(
      0,
    );
    expect(compareDocuments(document, document)).toBe(0);
  });
});
