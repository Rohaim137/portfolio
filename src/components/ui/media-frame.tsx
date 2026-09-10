import Image from "next/image";

import type { ProjectMedia } from "@/lib/content-application-foundation/domain";

type MediaFrameProps = Readonly<{
  media: ProjectMedia;
  priority?: boolean;
  imageButton?: boolean;
  imageButtonId?: string;
  onImageOpen?: () => void;
}>;

export function MediaFrame({
  media,
  priority = false,
  imageButton = false,
  imageButtonId,
  onImageOpen,
}: MediaFrameProps) {
  const image =
    media.kind === "image" ? (
      <Image
        alt={media.alt}
        height={media.height}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        src={media.src}
        width={media.width}
      />
    ) : null;

  return (
    <figure className="media-frame">
      {image && imageButton ? (
        <button
          aria-label={`Open larger view: ${media.alt}`}
          className="media-trigger"
          data-testid="project-gallery-image-button"
          id={imageButtonId}
          onClick={onImageOpen}
          type="button"
        >
          {image}
        </button>
      ) : image ? (
        image
      ) : media.kind === "video" ? (
        <video
          aria-label={media.alt}
          controls
          muted
          playsInline
          poster={media.poster}
          preload="metadata"
          src={media.src}
        />
      ) : null}
      {media.caption ? <figcaption>{media.caption}</figcaption> : null}
    </figure>
  );
}
