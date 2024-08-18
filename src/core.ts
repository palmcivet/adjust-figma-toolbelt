import { getToolbeltPosition } from "./persistent";
import { floatMenuStore, transitionStore } from "./singleton";

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

export async function registerInitialize(element: HTMLElement) {
  transitionStore.enable(element);

  const data = await getToolbeltPosition();
  if (data.bottom !== null) {
    moveToolbeltToBottom(element, data.bottom);
  }

  floatMenuStore.update(element);
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
    event.stopPropagation();

    startY = event.clientY;
    viewportHeight = window.innerHeight;

    const { y } = element.getBoundingClientRect();
    toolbeltY = y;

    window.document.addEventListener("mousemove", onMouseMove);
    window.document.addEventListener("mouseup", onMouseUp);

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

    window.document.removeEventListener("mousemove", onMouseMove);
    window.document.removeEventListener("mouseup", onMouseUp);
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
