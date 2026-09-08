import type { CalendarDate } from "./shared";

export type PublicDocument = Readonly<{
  title: string;
  file: string;
  description: string;
  updatedAt?: CalendarDate;
  category?: string;
  featured?: boolean;
}>;

export type AssetCheck = Readonly<{
  file: string;
  exists: boolean;
}>;
