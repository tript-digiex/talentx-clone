import type { ReactNode } from "react";

export type RadioOption = {
  label: ReactNode;
  value: string;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  options: RadioOption[];
  value?: string;
  name?: string;
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  className?: string;
  optionClassName?: string;
  onValueChange?: (value: string) => void;
};
