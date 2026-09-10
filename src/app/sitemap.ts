import type { MetadataRoute } from "next";

import {
  getPublishedRoutes,
  metadataService,
} from "@/lib/content-application-foundation/services/composition-root";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return metadataService.sitemap(await getPublishedRoutes()).map((entry) => ({
    url: entry.location,
    lastModified: entry.lastModified,
    changeFrequency: "monthly",
  }));
}
