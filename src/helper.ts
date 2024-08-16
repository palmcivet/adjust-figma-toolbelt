import { TOOLBELT_SELECTOR } from "./constant";

export function findToolbeltElement() {
  const element = window.document.querySelector(TOOLBELT_SELECTOR);
  if (!element) {
    return null;
  }
  return element as HTMLElement;
}
