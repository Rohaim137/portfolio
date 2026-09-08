import type { PostSummary, ProjectSummary, PublicDocument, ReadingSummary } from "../domain";
import { compareCalendarDates } from "./calendar-date";

export function compareProjects(left: ProjectSummary, right: ProjectSummary): number {
  return (
    compareBooleanDescending(left.featured, right.featured) ||
    compareCalendarDates(left.completedAt, right.completedAt) ||
    compareText(left.title, right.title) ||
    compareText(left.slug, right.slug)
  );
}

export function comparePosts(left: PostSummary, right: PostSummary): number {
  return (
    compareCalendarDates(left.publishedAt, right.publishedAt) ||
    compareText(left.title, right.title) ||
    compareText(left.slug, right.slug)
  );
}

export function compareReading(left: ReadingSummary, right: ReadingSummary): number {
  return (
    compareCalendarDates(relevantReadingDate(left), relevantReadingDate(right)) ||
    compareText(left.title, right.title) ||
    compareText(left.slug, right.slug)
  );
}

export function compareDocuments(left: PublicDocument, right: PublicDocument): number {
  return (
    compareBooleanDescending(left.featured ?? false, right.featured ?? false) ||
    compareCalendarDates(left.updatedAt, right.updatedAt) ||
    compareText(left.title, right.title) ||
    compareText(left.file, right.file)
  );
}

function relevantReadingDate(item: ReadingSummary) {
  return item.completedAt ?? item.startedAt;
}

function compareBooleanDescending(left: boolean, right: boolean): number {
  return left === right ? 0 : left ? -1 : 1;
}

function compareText(left: string, right: string): number {
  const normalizedLeft = left.toLowerCase();
  const normalizedRight = right.toLowerCase();
  return normalizedLeft < normalizedRight ? -1 : normalizedLeft > normalizedRight ? 1 : 0;
}
