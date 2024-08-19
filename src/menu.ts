import {
  DEFAULT_PADDING,
  DEFAULT_TOP,
  LABEL_PIN_DEFAULT_TOP,
  LABEL_START_CUSTOM_POSITION,
  LABEL_STOP_CUSTOM_POSITION,
  LABEL_UNPIN_DEFAULT_TOP,
} from "./constant";
import {
  moveToolbeltToBottom,
  moveToolbeltToTop,
  bindCursorStyle,
  bindMouseEvent,
} from "./core";
import { setToolbeltPosition } from "./persistent";
import { floatMenuStore, menuStore, transitionStore } from "./singleton";

export function registerDefaultMenu(element: HTMLElement) {
  const onPin = () => {
    menuStore.update("DEFAULT", LABEL_UNPIN_DEFAULT_TOP, onUnpin);

    const position = moveToolbeltToTop(element, DEFAULT_TOP);
    setToolbeltPosition(position);

    floatMenuStore.update(element);
  };

  const onUnpin = () => {
    menuStore.update("DEFAULT", LABEL_PIN_DEFAULT_TOP, onPin);

    const position = moveToolbeltToBottom(element, DEFAULT_PADDING);
    setToolbeltPosition(position);

    floatMenuStore.update(element);
  };

  menuStore.update("DEFAULT", LABEL_PIN_DEFAULT_TOP, onPin);
}

export function registerCustomizeMenu(element: HTMLElement) {
  const cursorStyle = bindCursorStyle(element);
  const mouseEvent = bindMouseEvent(element);

  const onStart = () => {
    transitionStore.disable(element);

    menuStore.update("CUSTOMIZE", LABEL_STOP_CUSTOM_POSITION, onStop);

    cursorStyle.enable();
    mouseEvent.enable();
  };

  const onStop = () => {
    menuStore.update("CUSTOMIZE", LABEL_START_CUSTOM_POSITION, onStart);

    cursorStyle.disable();
    const position = mouseEvent.disable();
    setToolbeltPosition(position);
    floatMenuStore.update(element);

    transitionStore.enable(element);
  };

  menuStore.update("CUSTOMIZE", LABEL_START_CUSTOM_POSITION, onStart);
}
