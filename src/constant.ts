export const PREFIX = "adjust";

export const STORAGE_LEFT = `__${PREFIX.toUpperCase()}_LEFT__`;

export const STORAGE_BOTTOM = `__${PREFIX.toUpperCase()}_BOTTOM__`;

export const TOOLBELT_SELECTOR = `[class*="positioned_design_toolbelt--root--"]`;

export const FLOAT_MENU_STYLE = `
${TOOLBELT_SELECTOR} [class*="dropdown--dropdown--"] {
  margin-top: 6px;
  bottom: unset !important;
}

${TOOLBELT_SELECTOR} [class*="scroll_container--clipContainer--"] {
  height: auto !important;
}

${TOOLBELT_SELECTOR} [class*="pointing_dropdown--scrollIndicator--"] {
  display: none !important;
}`;

export const DEFAULT_BOTTOM = 12;

export const DEFAULT_TOP = 48 + DEFAULT_BOTTOM;

export const FLOAT_MENU_TOP = 184;

export const LABEL_PIN_DEFAULT_TOP = "⬆️ Pin the toolbelt to the top";

export const LABEL_UNPIN_DEFAULT_TOP = "🔝 The toolbelt is already at the top";

export const LABEL_START_CUSTOM_POSITION = "🎨 Customize the toolbelt position";

export const LABEL_STOP_CUSTOM_POSITION = "💾 Save the position and exit";
