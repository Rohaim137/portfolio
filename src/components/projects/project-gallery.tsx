"use client";

import { useState } from "react";

import { MediaFrame } from "@/components/ui";
import type { ImageMedia, ProjectMedia } from "@/lib/content-application-foundation/domain";
import {
  closedLightbox,
  reduceLightboxState,
  type LightboxState,
} from "@/lib/portfolio-experience";

import { MediaLightbox } from "./media-lightbox";

export function ProjectGallery({
  items,
  label,
}: Readonly<{ items: readonly ProjectMedia[]; label: string }>) {
  const [lightbox, setLightbox] = useState<LightboxState>(closedLightbox);
  const images = items.filter((item): item is ImageMedia => item.kind === "image");

  if (items.length === 0) return null;

  return (
    <section aria-label={label} className="project-gallery" data-od-id="project-gallery">
      {items.map((media, mediaIndex) => {
        const imageIndex = media.kind === "image" ? images.indexOf(media) : -1;
        const triggerId = `project-gallery-image-${mediaIndex}`;
        return (
          <MediaFrame
            imageButton={media.kind === "image"}
            imageButtonId={triggerId}
            key={`${media.src}-${mediaIndex}`}
            media={media}
            onImageOpen={
              imageIndex >= 0
                ? () =>
                    setLightbox(
                      reduceLightboxState(
                        lightbox,
                        { type: "open", index: imageIndex, triggerId },
                        images.length,
                      ),
                    )
                : undefined
            }
          />
        );
      })}
      <MediaLightbox images={images} setState={setLightbox} state={lightbox} />
    </section>
  );
}
