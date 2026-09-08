import type { MetadataRoute } from "next";

import {
  fixedPublishedRoutes,
  metadataService,
} from "@/lib/content-application-foundation/services/composition-root";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return metadataService.sitemap(fixedPublishedRoutes).map((entry) => ({
    url: entry.location,
    lastModified: entry.lastModified,
    changeFrequency: "monthly",
  }));
}
