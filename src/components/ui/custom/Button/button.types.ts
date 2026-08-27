import type { ComponentProps, ReactNode } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}