
import type { HTMLAttributes, ReactNode } from "react";
import type { TAG_ICON_POSITION, TAG_VARIANTS } from "./tag.constants";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  value: string;
  variant?: TAG_VARIANTS;
  icon?: ReactNode;
  iconPosition?: TAG_ICON_POSITION;
};
