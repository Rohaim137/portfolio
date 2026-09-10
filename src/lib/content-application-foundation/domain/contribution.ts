import type { CalendarDate, IsoTimestamp } from "./shared";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = Readonly<{
  date: CalendarDate;
  count: number;
  level: ContributionLevel;
}>;

export type ContributionWeek = Readonly<{
  days: readonly ContributionDay[];
}>;

export type ContributionCalendarData = Readonly<{
  username: string;
  generatedAt: IsoTimestamp;
  weeks: readonly ContributionWeek[];
}>;

export type OptionalContributionData =
  Readonly<{ kind: "available"; data: ContributionCalendarData }> | Readonly<{ kind: "absent" }>;
