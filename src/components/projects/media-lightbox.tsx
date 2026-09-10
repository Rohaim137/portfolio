"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui";
import type { ImageMedia } from "@/lib/content-application-foundation/domain";
import {
  closedLightbox,
  reduceLightboxState,
  type LightboxState,
} from "@/lib/portfolio-experience";

type MediaLightboxProps = Readonly<{
  images: readonly ImageMedia[];
  state: LightboxState;
  setState: (state: LightboxState) => void;
}>;

export function MediaLightbox({ images, state, setState }: MediaLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (state.kind === "open" && !dialog.open) dialog.showModal();
    if (state.kind === "closed" && dialog.open) dialog.close();
  }, [state]);

  if (state.kind === "closed") {
    return <dialog aria-label="Project image viewer" className="lightbox" ref={dialogRef} />;
  }

  const selected = images[state.selectedIndex];

  function close() {
    const triggerId = state.kind === "open" ? state.triggerId : undefined;
    setState(closedLightbox);
    requestAnimationFrame(() => {
      if (triggerId) document.getElementById(triggerId)?.focus();
    });
  }

  return (
    <dialog
      aria-label="Project image viewer"
      className="lightbox"
      data-testid="media-lightbox"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft")
          setState(reduceLightboxState(state, { type: "previous" }, images.length));
        if (event.key === "ArrowRight")
          setState(reduceLightboxState(state, { type: "next" }, images.length));
      }}
      ref={dialogRef}
    >
      <Image
        alt={selected.alt}
        height={selected.height}
        priority
        sizes="90vw"
        src={selected.src}
        width={selected.width}
      />
      {selected.caption ? <p>{selected.caption}</p> : null}
      <p aria-live="polite">
        Image {state.selectedIndex + 1} of {images.length}
      </p>
      <div className="lightbox-controls">
        {images.length > 1 ? (
          <button
            aria-label="Previous image"
            className="icon-button"
            data-testid="media-lightbox-previous"
            onClick={() =>
              setState(reduceLightboxState(state, { type: "previous" }, images.length))
            }
            type="button"
          >
            <ChevronLeftIcon />
          </button>
        ) : (
          <span />
        )}
        <button
          aria-label="Close image viewer"
          className="icon-button"
          data-testid="media-lightbox-close"
          onClick={close}
          type="button"
        >
          <CloseIcon />
        </button>
        {images.length > 1 ? (
          <button
            aria-label="Next image"
            className="icon-button"
            data-testid="media-lightbox-next"
            onClick={() => setState(reduceLightboxState(state, { type: "next" }, images.length))}
            type="button"
          >
            <ChevronRightIcon />
          </button>
        ) : (
          <span />
        )}
      </div>
    </dialog>
  );
}
