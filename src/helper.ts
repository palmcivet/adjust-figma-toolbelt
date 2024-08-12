import { EXACT_SELECTOR } from "./constant";

export function findToolbeltElement() {
  const exactElement = document.querySelector(EXACT_SELECTOR);
  if (!exactElement) {
    return null;
  }
  return exactElement as HTMLElement;
}
