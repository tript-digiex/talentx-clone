import { useId } from "react";
import { cn } from "@/lib/utils";
import type { RadioGroupProps } from "./radio-group.types";

const RadioGroup = ({
  options,
  value,
  name,
  label,
  required = false,
  disabled = false,
  error = false,
  helperText,
  className,
  optionClassName,
  onValueChange,
}: RadioGroupProps) => {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <fieldset className={cn("space-y-3", className)} disabled={disabled}>
      {label && (
        <legend className="px-1 text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </legend>
      )}

      <div className="space-y-4">
        {options.map((option) => {
          const checked = value === option.value;
          const optionId = `${groupName}-${option.value}`;
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex items-start gap-2.5 text-sm",
                isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                optionClassName,
              )}
            >
              <span className="relative mt-0.5 flex size-4 shrink-0 items-center justify-center">
                <input
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={checked}
                  disabled={isDisabled}
                  className="peer sr-only"
                  onChange={() => onValueChange?.(option.value)}
                />

                <span
                  className={cn(
                    "size-4 rounded-full border border-slate-300 bg-white transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-purple-300/50",
                    checked && "border-purple-500 bg-purple-500",
                    error && !checked && "border-red-500",
                  )}
                />

                {checked && (
                  <span className="pointer-events-none absolute size-1.5 rounded-full bg-white" />
                )}
              </span>

              <span className="min-w-0">
                <span className="block font-bold leading-5 text-slate-700">
                  {option.label}
                </span>

                {option.description && (
                  <span className="block leading-5 text-slate-600">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {error && helperText && (
        <p className="px-1 text-xs text-red-500">{helperText}</p>
      )}
    </fieldset>
  );
};

export default RadioGroup;
