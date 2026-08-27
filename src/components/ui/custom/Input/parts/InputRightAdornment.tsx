import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type InputRightAdornmentProps = {
  isPasswordInput: boolean;
  PasswordIcon: LucideIcon;
  rightIcon?: ReactNode;
  togglePasswordVisibility: () => void;
};

export const InputRightAdornment = ({
  isPasswordInput,
  PasswordIcon,
  rightIcon,
  togglePasswordVisibility,
}: InputRightAdornmentProps) => {
  if (isPasswordInput)
    return (
      <button
        type="button"
        className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        <PasswordIcon className="size-4" aria-hidden="true" />
      </button>
    );

  if (!rightIcon) return null;

  return (
    <span className="flex shrink-0 items-center text-muted-foreground">
      {rightIcon}
    </span>
  );
};
