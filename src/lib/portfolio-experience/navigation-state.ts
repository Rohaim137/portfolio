import type { NavigationInteraction, NavigationMenuState } from "./types";

export function reduceNavigationState(
  state: NavigationMenuState,
  interaction: NavigationInteraction,
): NavigationMenuState {
  return interaction.type === "toggle" ? (state === "open" ? "closed" : "open") : "closed";
}

export function isCurrentRoute(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  const normalizedHref = href.endsWith("/") ? href : `${href}/`;
  const normalizedPath = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
  return normalizedPath.startsWith(normalizedHref);
}
