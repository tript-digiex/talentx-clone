import { Lock, Mail } from "lucide-react";
import type { ReactNode } from "react";

import type { InputType } from "../Input.types";

type InputLeftAdornmentProps = {
  leftIcon: ReactNode;
  type: InputType;
};

export const InputLeftAdornment = ({
  leftIcon,
  type,
}: InputLeftAdornmentProps) => {

  if (type === "email") return <Mail className="size-4" />;
  
  if (type === "password") return <Lock className="size-4" />;

  if (!leftIcon) return null;

  return (
    <span className="flex shrink-0 items-center text-muted-foreground">
      {leftIcon}
    </span>
  );
};
