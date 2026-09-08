import type { DestinationState, SocialLabel } from "../domain";

export function isSecureWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      Boolean(url.hostname) &&
      url.username === "" &&
      url.password === ""
    );
  } catch {
    return false;
  }
}

export function isMailDestination(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "mailto:" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url.pathname);
  } catch {
    return false;
  }
}

export function resolveDestination(label: SocialLabel, configuredValue?: string): DestinationState {
  const value = configuredValue?.trim();

  if (!value) {
    if (label === "GitHub") {
      throw new Error("GitHub must be configured as an active destination.");
    }

    return { kind: "pending", label };
  }

  const valid = label === "Email" ? isMailDestination(value) : isSecureWebUrl(value);
  if (!valid) {
    throw new Error(`${label} has an unsupported or invalid destination.`);
  }

  return { kind: "active", label, href: value };
}
