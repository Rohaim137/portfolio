import type { MetadataRoute } from "next";

import { metadataService } from "@/lib/content-application-foundation/services/composition-root";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const definition = metadataService.robots();

  return {
    rules: { userAgent: "*", allow: [...definition.allow], disallow: [...definition.disallow] },
    ...(definition.sitemap ? { sitemap: definition.sitemap } : {}),
  };
}
