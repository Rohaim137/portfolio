"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { CloseIcon, MenuIcon } from "@/components/ui";
import type { NavigationItem } from "@/lib/content-application-foundation/domain";
import { isCurrentRoute, reduceNavigationState } from "@/lib/portfolio-experience";

type PrimaryNavigationProps = Readonly<{ items: readonly NavigationItem[] }>;

const subscribeToHydration = () => () => undefined;
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

export function PrimaryNavigation({ items }: PrimaryNavigationProps) {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<"closed" | "open">("closed");
  const enhanced = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerSnapshot,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 48rem)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setMenuState("closed");
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  function closeFor(interaction: "escape" | "route-selected") {
    setMenuState((current) => reduceNavigationState(current, { type: interaction }));
    if (interaction === "escape") buttonRef.current?.focus();
  }

  return (
    <>
      <button
        aria-controls="primary-navigation"
        aria-expanded={menuState === "open"}
        className="navigation-menu-button"
        data-enhanced={enhanced}
        data-testid="primary-navigation-menu-button"
        onClick={() =>
          setMenuState((current) => reduceNavigationState(current, { type: "toggle" }))
        }
        ref={buttonRef}
        type="button"
      >
        {menuState === "open" ? <CloseIcon /> : <MenuIcon />}
        <span>{menuState === "open" ? "Close menu" : "Menu"}</span>
      </button>
      <nav
        aria-label="Primary navigation"
        className="primary-navigation"
        data-enhanced={enhanced}
        data-open={menuState === "open"}
        data-testid="primary-navigation"
        id="primary-navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuState === "open") closeFor("escape");
        }}
      >
        <ul className="primary-navigation-list">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                aria-current={isCurrentRoute(pathname, item.href) ? "page" : undefined}
                href={item.href}
                onClick={() => closeFor("route-selected")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
