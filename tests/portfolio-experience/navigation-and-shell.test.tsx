// @vitest-environment jsdom

import axe from "axe-core";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteFooter, SiteHeader } from "@/components/layout";
import { PrimaryNavigation } from "@/components/layout/primary-navigation";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects/example/" }));

const navigation = [
  { label: "Overview", href: "/" },
  { label: "Projects", href: "/projects/" },
  { label: "Blog", href: "/blog/" },
];

let mediaChange: ((event: MediaQueryListEvent) => void) | undefined;

beforeEach(() => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
      mediaChange = listener;
    },
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  mediaChange = undefined;
});

describe("application shell and navigation", () => {
  it("renders landmarks, current route, verified link, and textual pending destinations", async () => {
    const { container } = render(
      <>
        <a data-testid="site-skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader navigation={navigation} />
        <main id="main-content">
          <h1>Portfolio</h1>
        </main>
        <SiteFooter
          destinations={[
            { kind: "active", label: "GitHub", href: "https://github.com/example" },
            { kind: "pending", label: "LinkedIn" },
            { kind: "pending", label: "X" },
            { kind: "pending", label: "Email" },
          ]}
        />
      </>,
    );

    expect(screen.getByTestId("site-skip-link").getAttribute("href")).toBe("#main-content");
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Projects" }).getAttribute("aria-current")).toBe(
      "page",
    );
    expect(screen.getByTestId("social-github-link").getAttribute("href")).toBe(
      "https://github.com/example",
    );
    expect(screen.getByTestId("social-email-pending").textContent).toContain("link pending");
    expect(
      (await axe.run(container, { rules: { "color-contrast": { enabled: false } } })).violations,
    ).toEqual([]);
  });

  it("opens from the keyboard, closes on Escape, and restores button focus", async () => {
    const user = userEvent.setup();
    render(<PrimaryNavigation items={navigation} />);
    const menuButton = screen.getByTestId("primary-navigation-menu-button");
    const nav = screen.getByTestId("primary-navigation");

    menuButton.focus();
    await user.keyboard("{Enter}");
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    expect(nav.getAttribute("data-open")).toBe("true");

    screen.getByRole("link", { name: "Blog" }).focus();
    fireEvent.keyDown(nav, { key: "Escape" });
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(menuButton);
  });

  it("closes for route selection and when a desktop media query starts matching", async () => {
    const user = userEvent.setup();
    render(<PrimaryNavigation items={navigation} />);
    const menuButton = screen.getByTestId("primary-navigation-menu-button");

    await user.click(menuButton);
    await user.click(screen.getByRole("link", { name: "Blog" }));
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");

    await user.click(menuButton);
    act(() => mediaChange?.({ matches: false } as MediaQueryListEvent));
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
  });
});
