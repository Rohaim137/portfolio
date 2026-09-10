export type ImageMedia = Readonly<{
  kind: "image";
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}>;

export type VideoMedia = Readonly<{
  kind: "video";
  src: string;
  poster: string;
  alt: string;
  caption?: string;
}>;

export type ProjectMedia = ImageMedia | VideoMedia;
export type CoverMedia = ImageMedia;
