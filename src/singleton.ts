import { FLOAT_MENU_STYLE, FLOAT_MENU_TOP } from "./constant";

function createMenuStore() {
  type MenuType = "DEFAULT" | "CUSTOMIZE";

  type MenuItem = {
    id: number;
    label: string;
    callback: (event: MouseEvent | KeyboardEvent) => void;
  };

  const menuStore = new Map<MenuType, MenuItem>();

  const _removeMenus = () => {
    for (const menu of menuStore.values()) {
      GM_unregisterMenuCommand(menu.id);
    }
  };

  const _registerMenus = () => {
    for (const menu of menuStore.values()) {
      const newId = GM_registerMenuCommand(menu.label, menu.callback);
      menu.id = newId;
    }
  };

  const update = (
    type: MenuType,
    label: MenuItem["label"],
    callback: MenuItem["callback"]
  ) => {
    _removeMenus();

    menuStore.set(type, {
      id: 0,
      label,
      callback,
    });

    _registerMenus();
  };

  return {
    update,
  };
}

function createFloatMenuStore() {
  let styleElement: HTMLStyleElement;

  const update = (element: HTMLElement) => {
    const { top: toolbeltTop, height: toolbeltHeight } =
      element.getBoundingClientRect();
    const toolbeltBottom = window.innerHeight - toolbeltHeight;

    if (toolbeltTop < FLOAT_MENU_TOP && toolbeltBottom > FLOAT_MENU_TOP) {
      styleElement = GM_addStyle(FLOAT_MENU_STYLE);
    } else {
      styleElement?.remove();
    }
  };

  return {
    update,
  };
}

function createTransitionStore() {
  let transitionStyle: string | null = null;

  const enable = (element: HTMLElement) => {
    if (transitionStyle === null) {
      transitionStyle = element.style.transition;
    }
    element.style.transition = "bottom 0.3s ease-in-out";
  };

  const disable = (element: HTMLElement) => {
    if (transitionStyle !== null) {
      element.style.transition = transitionStyle;
    }
  };

  return {
    enable,
    disable,
  };
}

export const menuStore = createMenuStore();
export const floatMenuStore = createFloatMenuStore();
export const transitionStore = createTransitionStore();
