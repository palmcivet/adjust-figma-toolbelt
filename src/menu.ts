import {
  DEFAULT_BOTTOM,
  DEFAULT_TOP,
  LABEL_PIN_DEFAULT_TOP,
  LABEL_START_CUSTOM_POSITION,
  LABEL_STOP_CUSTOM_POSITION,
  LABEL_UNPIN_DEFAULT_TOP,
} from "./constant";
import {
  moveToolbeltToBottom,
  moveToolbeltToTop,
  registerCursor,
  registerEvent,
} from "./core";

export function registerDefaultMenu(element: HTMLElement) {
  let id: number;

  const onPin = () => {
    GM_unregisterMenuCommand(id);

    moveToolbeltToTop(element, DEFAULT_TOP);

    id = GM_registerMenuCommand(LABEL_UNPIN_DEFAULT_TOP, onUnpin);
  };

  const onUnpin = () => {
    GM_unregisterMenuCommand(id);

    moveToolbeltToBottom(element, DEFAULT_BOTTOM);

    id = GM_registerMenuCommand(LABEL_PIN_DEFAULT_TOP, onPin);
  };

  id = GM_registerMenuCommand(LABEL_PIN_DEFAULT_TOP, onPin);
}

export function registerCustomizeMenu(element: HTMLElement) {
  let id: number;

  const mouseEvent = registerEvent(element);
  const cursorStyle = registerCursor(element);

  const onStart = () => {
    GM_unregisterMenuCommand(id);

    mouseEvent.enable();
    cursorStyle.enable();

    id = GM_registerMenuCommand(LABEL_STOP_CUSTOM_POSITION, onStop);
  };

  const onStop = () => {
    GM_unregisterMenuCommand(id);

    mouseEvent.disable();
    cursorStyle.disable();

    id = GM_registerMenuCommand(LABEL_START_CUSTOM_POSITION, onStop);
  };

  id = GM_registerMenuCommand(LABEL_START_CUSTOM_POSITION, onStart);
}
