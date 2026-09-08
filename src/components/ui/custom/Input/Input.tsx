import { Input as InputShadcn } from "@/components/ui/shadcn/input";
import type { InputProps, InputType } from "./Input.types";
import { cn } from "@/lib/utils";
import { usePasswordInput } from "./hooks/usePasswordInput";
import { InputLeftAdornment } from "./parts/InputLeftAdornment";
import { InputRightAdornment } from "./parts/InputRightAdornment";

const Input = ({
  label,
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
      {label && (
        <label className="block px-1 text-sm font-medium text-slate-700">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-md border px-3 py-1 transition-colors focus-within:border-purple-300 focus-within:ring-3 focus-within:ring-purple-300/50",
          error &&
            "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
        )}
      >
        <InputLeftAdornment leftIcon={leftIcon} type={type} />
        <InputShadcn
          {...props}
          type={inputType}
          className="flex-1 placeholder:text-slate-400"
        />
        <InputRightAdornment
          isPasswordInput={isPasswordInput}
          PasswordIcon={PasswordIcon}
          rightIcon={rightIcon}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </div>
      {error && (
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
