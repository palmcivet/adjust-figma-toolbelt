import { findToolbeltElement } from "./helper";
import { registerAnimation, registerInitialize } from "./core";
import { TOOLBELT_SELECTOR, PREFIX } from "./constant";
import { registerCustomizeMenu, registerDefaultMenu } from "./menu";

(() => {
  function onReady() {
    const element = findToolbeltElement();
    if (!element) {
      console.error(
        `[${PREFIX}] Can not find figma toolbelt: \`${TOOLBELT_SELECTOR}\`.`
      );
      return;
    }

    registerAnimation(element);
    registerInitialize(element);
    registerDefaultMenu(element);
    registerCustomizeMenu(element);

    console.info(`[${PREFIX}] The script is enabled.`);
  }

  const _onload_ = window.onload || function () {};
  window.onload = (event) => {
    (_onload_ as any)(event);

    onReady();
  };
})();
