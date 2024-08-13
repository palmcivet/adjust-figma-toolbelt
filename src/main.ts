import { registerInitialize } from "./core";
import { findToolbeltElement } from "./helper";
import { EXACT_SELECTOR, PREFIX } from "./constant";
import { registerCustomizeMenu, registerDefaultMenu } from "./menu";

(() => {
  function onReady() {
    const element = findToolbeltElement();
    if (!element) {
      console.error(
        `[${PREFIX}] Can not find figma toolbelt: \`${EXACT_SELECTOR}\`.`
      );
      return;
    }

    registerInitialize(element);
    registerDefaultMenu(element);
    registerCustomizeMenu(element);

    console.log(`[${PREFIX}] The script is enabled.`);
  }

  const _onload_ = window.onload || function () {};
  window.onload = (event) => {
    (_onload_ as any)(event);

    onReady();
  };
})();
