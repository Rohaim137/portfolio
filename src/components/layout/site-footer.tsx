import type { DestinationState } from "@/lib/content-application-foundation/domain";

import { SocialDestinations } from "./social-destinations";

export function SiteFooter({
  destinations,
}: Readonly<{ destinations: readonly DestinationState[] }>) {
  return (
    <footer className="site-footer site-shell">
      <p>Muhammad Rohaim&apos;s portfolio of software and machine learning work.</p>
      <SocialDestinations destinations={destinations} />
    </footer>
  );
}
