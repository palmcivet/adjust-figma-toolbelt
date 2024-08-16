import { TOOLBELT_SELECTOR } from "./constant";

export function findToolbeltElement() {
  const exactElement = document.querySelector(TOOLBELT_SELECTOR);
  if (!exactElement) {
    return null;
  }
  return exactElement as HTMLElement;
}
