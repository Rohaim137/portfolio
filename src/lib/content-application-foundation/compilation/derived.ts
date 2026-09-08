import type { HeadingEntry, ReadingTime } from "../domain";

const wordsPerMinute = 220;

export function extractHeadings(source: string): readonly HeadingEntry[] {
  const headings: HeadingEntry[] = [];
  const anchorCounts = new Map<string, number>();
  let inFence = false;

  for (const line of source.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }

    const match = /^(#{2,4})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) {
      continue;
    }

    const text = stripInlineMarkdown(match[2]).trim();
    const baseAnchor = toAnchor(text) || "section";
    const count = (anchorCounts.get(baseAnchor) ?? 0) + 1;
    anchorCounts.set(baseAnchor, count);

    headings.push({
      depth: match[1].length,
      text,
      anchor: count === 1 ? baseAnchor : `${baseAnchor}-${count}`,
    });
  }

  return headings;
}

export function estimateReadingTime(source: string): ReadingTime {
  const plainText = source
    .replace(/```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[\][()#*_>`~-]/g, " ");
  const words = plainText.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return {
    words,
    minutes,
    label: `${minutes} min read`,
  };
}

function toAnchor(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~`]/g, "");
}
