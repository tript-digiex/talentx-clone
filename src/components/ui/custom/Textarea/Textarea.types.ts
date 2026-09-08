import type { ComponentProps, ReactNode } from "react";

export interface TextareaProps extends ComponentProps<"textarea"> {
  label?: string;
  leftIcon?: ReactNode;
  error?: boolean;
  helperText?: string;
  showCount?: boolean;
  defaultValue?: string;
}
