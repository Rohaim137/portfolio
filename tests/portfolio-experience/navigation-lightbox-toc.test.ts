import { describe, expect, it } from "vitest";

import type { HeadingEntry } from "@/lib/content-application-foundation/domain";
import {
  closedLightbox,
  isCurrentRoute,
  reduceLightboxState,
  reduceNavigationState,
  resolveTableOfContents,
} from "@/lib/portfolio-experience";

describe("navigation state", () => {
  it("toggles the menu and closes it for every terminal interaction", () => {
    expect(reduceNavigationState("closed", { type: "toggle" })).toBe("open");
    expect(reduceNavigationState("open", { type: "toggle" })).toBe("closed");
    expect(reduceNavigationState("open", { type: "escape" })).toBe("closed");
    expect(reduceNavigationState("open", { type: "route-selected" })).toBe("closed");
    expect(reduceNavigationState("open", { type: "desktop-layout-entered" })).toBe("closed");
  });

  it("matches the root exactly and section routes by normalized prefix", () => {
    expect(isCurrentRoute("/", "/")).toBe(true);
    expect(isCurrentRoute("/projects", "/projects/")).toBe(true);
    expect(isCurrentRoute("/projects/example/", "/projects")).toBe(true);
    expect(isCurrentRoute("/blog/", "/projects/")).toBe(false);
    expect(isCurrentRoute("/about/", "/")).toBe(false);
  });
});

describe("lightbox state", () => {
  it("rejects empty, fractional, negative, and out-of-range openings", () => {
    expect(reduceLightboxState(closedLightbox, { type: "open", index: 0, triggerId: "a" }, 0)).toBe(
      closedLightbox,
    );
    expect(
      reduceLightboxState(closedLightbox, { type: "open", index: -1, triggerId: "a" }, 2),
    ).toBe(closedLightbox);
    expect(
      reduceLightboxState(closedLightbox, { type: "open", index: 0.5, triggerId: "a" }, 2),
    ).toBe(closedLightbox);
    expect(reduceLightboxState(closedLightbox, { type: "open", index: 2, triggerId: "a" }, 2)).toBe(
      closedLightbox,
    );
  });

  it("opens a valid item and closes explicitly", () => {
    const open = reduceLightboxState(
      closedLightbox,
      { type: "open", index: 1, triggerId: "gallery-1" },
      3,
    );
    expect(open).toEqual({ kind: "open", selectedIndex: 1, triggerId: "gallery-1" });
    expect(reduceLightboxState(open, { type: "close" }, 3)).toBe(closedLightbox);
  });

  it("ignores movement while closed and wraps first, last, and single-item indexes", () => {
    expect(reduceLightboxState(closedLightbox, { type: "next" }, 3)).toBe(closedLightbox);
    expect(
      reduceLightboxState({ kind: "open", selectedIndex: 2, triggerId: "a" }, { type: "next" }, 3),
    ).toMatchObject({ selectedIndex: 0 });
    expect(
      reduceLightboxState(
        { kind: "open", selectedIndex: 0, triggerId: "a" },
        { type: "previous" },
        3,
      ),
    ).toMatchObject({ selectedIndex: 2 });
    expect(
      reduceLightboxState({ kind: "open", selectedIndex: 0, triggerId: "a" }, { type: "next" }, 1),
    ).toMatchObject({ selectedIndex: 0 });
  });
});

describe("table of contents eligibility", () => {
  const headings = [
    { depth: 2, anchor: "one", text: "One" },
    { depth: 3, anchor: "two", text: "Two" },
    { depth: 4, anchor: "ignored", text: "Ignored" },
    { depth: 2, anchor: "blank", text: "   " },
    { depth: 2, anchor: "three", text: "Three" },
  ] as readonly HeadingEntry[];

  it("shows only eligible level-two and level-three headings in source order", () => {
    expect(resolveTableOfContents(true, headings)).toEqual({
      kind: "visible",
      headings: [headings[0], headings[1], headings[4]],
    });
  });

  it("stays hidden without opt-in or at fewer than three eligible headings", () => {
    expect(resolveTableOfContents(false, headings)).toEqual({ kind: "hidden" });
    expect(resolveTableOfContents(true, headings.slice(0, 2))).toEqual({ kind: "hidden" });
  });
});
