import type { ReactNode } from "react";
import type { TABS_VARIANT } from "./tabs.constants";

export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;

  variant?: TABS_VARIANT;

  className?: string;
  listClassName?: string;
  triggerClassName?: string;
};
