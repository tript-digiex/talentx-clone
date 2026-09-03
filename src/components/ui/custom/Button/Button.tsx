import { Button as ButtonShadcn } from "@/components/ui/shadcn/button";
import type { ButtonProps } from "./button.types";
import { showRightIcon } from "./button.utils";

const Button = ({
  children,
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  
  return (
    <ButtonShadcn
      className={className}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon}
      {children}
      {showRightIcon(loading, rightIcon)}
    </ButtonShadcn>
  );
};

export default Button;
