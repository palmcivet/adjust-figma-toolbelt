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
import { setToolbeltPosition } from "./persistent";

export function registerDefaultMenu(element: HTMLElement) {
  let id: number;

  const onPin = () => {
    GM_unregisterMenuCommand(id);

    const position = moveToolbeltToTop(element, DEFAULT_TOP);
    setToolbeltPosition(position);

    id = GM_registerMenuCommand(LABEL_UNPIN_DEFAULT_TOP, onUnpin);
  };

  const onUnpin = () => {
    GM_unregisterMenuCommand(id);

    const position = moveToolbeltToBottom(element, DEFAULT_BOTTOM);
    setToolbeltPosition(position);

    id = GM_registerMenuCommand(LABEL_PIN_DEFAULT_TOP, onPin);
  };

  id = GM_registerMenuCommand(LABEL_PIN_DEFAULT_TOP, onPin);
}

export function registerCustomizeMenu(element: HTMLElement) {
  let id: number;

  const cursorStyle = registerCursor(element);
  const mouseEvent = registerEvent(element);

  const onStart = () => {
    GM_unregisterMenuCommand(id);

    cursorStyle.enable();
    mouseEvent.enable();

    id = GM_registerMenuCommand(LABEL_STOP_CUSTOM_POSITION, onStop);
  };

  const onStop = () => {
    GM_unregisterMenuCommand(id);

    cursorStyle.disable();
    const position = mouseEvent.disable();
    setToolbeltPosition(position);

    id = GM_registerMenuCommand(LABEL_START_CUSTOM_POSITION, onStop);
  };

  id = GM_registerMenuCommand(LABEL_START_CUSTOM_POSITION, onStart);
}
