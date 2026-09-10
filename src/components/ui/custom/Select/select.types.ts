import type { ReactNode } from "react";

export type SelectOption = {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  searchValue?: string;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  loading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  maxVisibleItems?: number;
  menuPlacement?: "top" | "bottom";
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  onBlur?: () => void;
  onValueChange: (value: string) => void;
};