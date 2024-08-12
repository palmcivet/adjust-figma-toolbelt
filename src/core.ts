export function moveToolbeltToTop(element: HTMLElement, top: number) {
  const { height: toolbeltHeight } = element.getBoundingClientRect();
  const { innerHeight: viewportHeight } = window;
  element.style.bottom = `${viewportHeight - toolbeltHeight - top}px`;
}

export function moveToolbeltToBottom(element: HTMLElement, bottom: number) {
  element.style.bottom = `${bottom}px`;
}

export function registerEvent(element: HTMLElement) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let viewportWidth = 0;
  let viewportHeight = 0;
  let toolbeltX = 0;
  let toolbeltY = 0;

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
    moveToolbeltToTop(element, toolbeltY + offsetY);
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
    disable: () => {
      element.removeEventListener("mousedown", onMouseDown);
    },
  };
}

export function registerCursor(element: HTMLElement) {
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

export function registerFloatMenu(element: HTMLElement) {
  const enable = () => {};

  const disable = () => {};

  return {
    enable,
    disable,
  };
}
