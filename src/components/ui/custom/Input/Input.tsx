import { Input as InputShadcn } from "@/components/ui/shadcn/input";
import type { InputProps, InputType } from "./Input.types";
import { cn } from "@/lib/utils";
import { usePasswordInput } from "./hooks/usePasswordInput";
import { InputLeftAdornment } from "./parts/InputLeftAdornment";
import { InputRightAdornment } from "./parts/InputRightAdornment";

const Input = ({
  leftIcon,
  rightIcon,
  error,
  helperText,
  ...props
}: InputProps) => {
  const type: InputType = props.type;
  const { isPasswordInput, inputType, PasswordIcon, togglePasswordVisibility } =
    usePasswordInput(type);

  return (
    <div className="space-y-1.5">
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-md border px-3 py-1 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          error &&
            "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
        )}
      >
        <InputLeftAdornment leftIcon={leftIcon} type={type} />
        <InputShadcn {...props} type={inputType} className="flex-1" />
        <InputRightAdornment
          isPasswordInput={isPasswordInput}
          PasswordIcon={PasswordIcon}
          rightIcon={rightIcon}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </div>
      {helperText && (
        <p
          className={cn(
            "px-1 text-xs text-muted-foreground",
            error && "text-red-500",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
