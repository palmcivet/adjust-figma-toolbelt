import { FLOAT_MENU_STYLE, FLOAT_MENU_TOP } from "./constant";
import { getToolbeltPosition } from "./persistent";

export function moveToolbeltToTop(element: HTMLElement, top: number): Position {
  const { height: toolbeltHeight } = element.getBoundingClientRect();
  const { innerHeight: viewportHeight } = window;

  const bottom = viewportHeight - toolbeltHeight - top;
  element.style.bottom = `${bottom}px`;

  return { left: null, bottom };
}

export function moveToolbeltToBottom(
  element: HTMLElement,
  bottom: number
): Position {
  element.style.bottom = `${bottom}px`;

  return { left: null, bottom };
}

let styleElement: HTMLStyleElement;
export function updateFloatMenu(element: HTMLElement) {
  const { top: toolbeltTop, height: toolbeltHeight } =
    element.getBoundingClientRect();
  const toolbeltBottom = window.innerHeight - toolbeltHeight;

  if (toolbeltTop < FLOAT_MENU_TOP && toolbeltBottom > FLOAT_MENU_TOP) {
    styleElement = GM_addStyle(FLOAT_MENU_STYLE);
  } else {
    styleElement?.remove();
  }
}

export function registerAnimation(element: HTMLElement) {
  element.style.transition = "bottom 0.3s ease-in-out";
}

export async function registerInitialize(element: HTMLElement) {
  const data = await getToolbeltPosition();

  if (data.bottom !== null) {
    moveToolbeltToBottom(element, data.bottom);
  }

  // wait for the animation to finish and update the position.
  setTimeout(() => {
    updateFloatMenu(element);
  }, 1000);
}

export function bindMouseEvent(element: HTMLElement) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let viewportWidth = 0;
  let viewportHeight = 0;
  let toolbeltX = 0;
  let toolbeltY = 0;
  let position: Position;

  const onMouseDown = (event: MouseEvent) => {
    startY = event.clientY;
    viewportHeight = window.innerHeight;

    const { y } = element.getBoundingClientRect();
    toolbeltY = y;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    isDragging = true;
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    const { clientY } = event;
    const offsetY = clientY - startY;
    position = moveToolbeltToTop(element, toolbeltY + offsetY);
  };

  const onMouseUp = (event: MouseEvent) => {
    onMouseMove(event);

    isDragging = false;

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return {
    enable: () => {
      element.addEventListener("mousedown", onMouseDown);
    },
    disable: (): Position => {
      element.removeEventListener("mousedown", onMouseDown);
      return position;
    },
  };
}

export function bindCursorStyle(element: HTMLElement) {
  let cursorStyle = "default";

  const enable = () => {
    cursorStyle = element.style.cursor;
    element.style.cursor = "move";
  };

  const disable = () => {
    element.style.cursor = cursorStyle;
  };

  return {
    enable,
    disable,
  };
}
