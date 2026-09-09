import type { ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  name?: string;
  label?: ReactNode;
  placeholder?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  loading?: boolean;
  emptyMessage?: ReactNode;
  maxVisibleItems?: number;
  menuPlacement?: "top" | "bottom";
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  onBlur?: () => void;
  onValueChange?: (value: string) => void;
};
