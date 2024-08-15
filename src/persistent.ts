import {
  DEFAULT_BOTTOM,
  PREFIX,
  STORAGE_BOTTOM,
  STORAGE_LEFT,
} from "./constant";

export async function getToolbeltPosition(): Promise<Position> {
  const left = await GM.getValue<number>(STORAGE_LEFT);
  const bottom = await GM.getValue<number>(STORAGE_BOTTOM);

  console.info(`[${PREFIX}] Read persistent data: ${left}, ${bottom}.`);

  return {
    left: left ?? null,
    bottom: bottom ?? DEFAULT_BOTTOM,
  };
}

export async function setToolbeltPosition({
  left,
  bottom,
}: Position): Promise<void> {
  console.info(`[${PREFIX}] Save persistent data: ${left}, ${bottom}.`);

  await GM.setValue(STORAGE_LEFT, left);
  await GM.setValue(STORAGE_BOTTOM, bottom);
}
