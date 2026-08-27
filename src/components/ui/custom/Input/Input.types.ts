import type { ComponentProps, ReactNode } from "react";

export type InputType = ComponentProps<"input">["type"];

export interface InputProps extends ComponentProps<"input"> {
  type: InputType;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  helperText?: string;
}
