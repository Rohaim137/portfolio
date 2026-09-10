import type { LightboxAction, LightboxState } from "./types";

export const closedLightbox: LightboxState = Object.freeze({ kind: "closed" });

export function reduceLightboxState(
  state: LightboxState,
  action: LightboxAction,
  itemCount: number,
): LightboxState {
  if (itemCount <= 0 || action.type === "close") return closedLightbox;

  if (action.type === "open") {
    if (!Number.isInteger(action.index) || action.index < 0 || action.index >= itemCount) {
      return closedLightbox;
    }
    return { kind: "open", selectedIndex: action.index, triggerId: action.triggerId };
  }

  if (state.kind === "closed") return state;

  const offset = action.type === "next" ? 1 : -1;
  return {
    ...state,
    selectedIndex: (state.selectedIndex + offset + itemCount) % itemCount,
  };
}
