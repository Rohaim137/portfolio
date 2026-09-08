import "server-only";

import { siteConfig } from "@/config/site";

import type { PublishedRoute, SiteConfig } from "../domain";
import { isSecureWebUrl } from "../policies";
import { siteConfigSchema } from "../validation";
import { MetadataService } from "./metadata-service";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (configuredSiteUrl && !isSecureWebUrl(configuredSiteUrl)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTPS URL.");
}

const validated = siteConfigSchema.parse({
  ...siteConfig,
  ...(configuredSiteUrl ? { siteUrl: configuredSiteUrl } : {}),
});

export const validatedSiteConfig: SiteConfig = validated;
export const metadataService = new MetadataService(validatedSiteConfig);

export const fixedPublishedRoutes: readonly PublishedRoute[] = [
  { pathname: "/", sourceKind: "fixed" },
  { pathname: "/projects/", sourceKind: "fixed" },
  { pathname: "/blog/", sourceKind: "fixed" },
  { pathname: "/reading/", sourceKind: "fixed" },
  { pathname: "/docs/", sourceKind: "fixed" },
];
