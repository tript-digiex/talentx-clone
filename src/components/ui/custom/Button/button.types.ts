import type { ComponentProps, ReactNode } from "react";
import { Button as ButtonShadcn } from "@/components/ui/shadcn/button";

export interface ButtonProps extends ComponentProps<typeof ButtonShadcn> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}
