import type { ReactNode } from "react";

import { metadataService } from "@/lib/content-application-foundation/services/composition-root";
import { toNextMetadata } from "@/lib/content-application-foundation/services/metadata-service";

import "./globals.css";

export const metadata = toNextMetadata(
  metadataService.forIndex({
    title: "Rohaim — Portfolio",
    description: "An editorial portfolio for selected work, writing, and research notes.",
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
        {children}
      </body>
    </html>
  );
}
