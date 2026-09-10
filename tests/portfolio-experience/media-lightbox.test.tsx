// @vitest-environment jsdom

import axe from "axe-core";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MediaLightbox } from "@/components/projects/media-lightbox";
import type { ImageMedia } from "@/lib/content-application-foundation/domain";
import { closedLightbox, type LightboxState } from "@/lib/portfolio-experience";

const images: readonly ImageMedia[] = [
  {
    kind: "image",
    src: "/media/projects/editorial-interface.svg",
    alt: "First abstract cover",
    caption: "First caption",
    width: 1200,
    height: 800,
  },
  {
    kind: "image",
    src: "/media/projects/data-workflow.svg",
    alt: "Second abstract cover",
    width: 1200,
    height: 800,
  },
];

function LightboxHarness({ single = false }: Readonly<{ single?: boolean }>) {
  const [state, setState] = useState<LightboxState>(closedLightbox);
  const available = single ? images.slice(0, 1) : images;
  return (
    <>
      <button
        id="gallery-trigger"
        onClick={() => setState({ kind: "open", selectedIndex: 0, triggerId: "gallery-trigger" })}
        type="button"
      >
        Open image
      </button>
      <MediaLightbox images={available} setState={setState} state={state} />
    </>
  );
}

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
  };
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("media lightbox", () => {
  it("opens a named native dialog, moves with controls and arrows, and passes an accessibility scan", async () => {
    const user = userEvent.setup();
    const { container } = render(<LightboxHarness />);
    await user.click(screen.getByRole("button", { name: "Open image" }));

    const dialog = screen.getByRole("dialog", { name: "Project image viewer" });
    expect(dialog.getAttribute("open")).not.toBeNull();
    expect(screen.getByText("Image 1 of 2")).toBeTruthy();
    expect(screen.getByAltText("First abstract cover")).toBeTruthy();

    await user.click(screen.getByTestId("media-lightbox-next"));
    expect(screen.getByText("Image 2 of 2")).toBeTruthy();
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(screen.getByText("Image 1 of 2")).toBeTruthy();
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(screen.getByText("Image 2 of 2")).toBeTruthy();
    expect(
      (await axe.run(container, { rules: { "color-contrast": { enabled: false } } })).violations,
    ).toEqual([]);
  });

  it("closes on its control and restores focus to the originating trigger", async () => {
    const user = userEvent.setup();
    render(<LightboxHarness />);
    const trigger = screen.getByRole("button", { name: "Open image" });
    await user.click(trigger);
    await user.click(screen.getByTestId("media-lightbox-close"));

    expect(screen.queryByTestId("media-lightbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("handles native cancellation and hides movement controls for one image", async () => {
    const user = userEvent.setup();
    render(<LightboxHarness single />);
    const trigger = screen.getByRole("button", { name: "Open image" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Project image viewer" });

    expect(screen.queryByTestId("media-lightbox-previous")).toBeNull();
    expect(screen.queryByTestId("media-lightbox-next")).toBeNull();
    fireEvent(dialog, new Event("cancel", { bubbles: true, cancelable: true }));
    expect(screen.queryByTestId("media-lightbox")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
