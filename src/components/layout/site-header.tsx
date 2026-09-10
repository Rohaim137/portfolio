import Link from "next/link";

import type { NavigationItem } from "@/lib/content-application-foundation/domain";

import { PrimaryNavigation } from "./primary-navigation";

export function SiteHeader({ navigation }: Readonly<{ navigation: readonly NavigationItem[] }>) {
  return (
    <header className="site-header site-shell">
      <Link className="brand-link" data-testid="site-brand-link" href="/">
        Muhammad Rohaim
      </Link>
      <PrimaryNavigation items={navigation} />
    </header>
  );
}
