import type { TAG_ICON_POSITION } from "./tag.constants";

export function shouldRenderTagIcon(
  iconPosition: TAG_ICON_POSITION,
  position: TAG_ICON_POSITION,
  icon?: React.ReactNode,
) {
  return iconPosition === position && !!icon;
}
