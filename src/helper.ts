import { TOOLBELT_SELECTOR } from "./constant";

export function findToolbeltElement() {
  const exactElement = document.querySelector(TOOLBELT_SELECTOR);
  if (!exactElement) {
    return null;
  }
  return exactElement as HTMLElement;
}

export function createMenuStore() {
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
