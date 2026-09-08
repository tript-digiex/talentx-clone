import { cn } from "@/lib/utils";
import { useState, type ChangeEvent } from "react";
import type { TextareaProps } from "./Textarea.types";
import { getTextLength } from "./text-area.utils";

const Textarea = ({
  label,
  leftIcon,
  error,
  helperText,
  showCount = false,
  className,
  value,
  defaultValue,
  maxLength,
  onChange,
  ...props
}: TextareaProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ? defaultValue : "",
  );
  const currentLength =
    value !== undefined ? getTextLength(value) : uncontrolledValue.length;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setUncontrolledValue(event.target.value);
    }

    onChange?.(event);
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block px-1 text-sm font-medium text-slate-700">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={cn(
          "flex min-h-28 w-full items-start gap-2 rounded-md border px-3 py-2 transition-colors focus-within:border-purple-300 focus-within:ring-3 focus-within:ring-purple-300/50",
          error &&
            "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
          props.disabled && "cursor-not-allowed bg-slate-50 opacity-70",
        )}
      >
        {leftIcon && (
          <span className="mt-1 flex shrink-0 text-slate-700">{leftIcon}</span>
        )}

        <textarea
          {...props}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            "min-h-24 flex-1 resize-none bg-transparent text-base outline-none placeholder:text-slate-400 disabled:cursor-not-allowed md:text-sm",
            className,
          )}
        />
      </div>

      {(helperText || showCount) && (
        <div className="flex items-start justify-between gap-3 px-1">
          {helperText && (
            <p
              className={cn(
                "text-xs text-muted-foreground",
                error && "text-red-500",
              )}
            >
              {helperText}
            </p>
          )}

          {showCount && maxLength && (
            <p className="shrink-0 text-xs font-semibold text-slate-500">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Textarea;
