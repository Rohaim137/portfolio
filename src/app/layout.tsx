import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/layout";
import { metadataService } from "@/lib/content-application-foundation/services/composition-root";
import { validatedSiteConfig } from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";

import "./globals.css";

export const metadata = toNextMetadata(
  metadataService.forIndex({
    title: validatedSiteConfig.title,
    description: validatedSiteConfig.defaultDescription,
    pathname: "/",
  }),
);

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" data-testid="site-skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader navigation={validatedSiteConfig.navigation} />
        {children}
        <SiteFooter destinations={validatedSiteConfig.destinations} />
      </body>
    </html>
  );
}
