import { Check, ChevronDown } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import type { SelectProps } from "./select.types";
import { useSelect } from "./useSelect";
import { OPTION_HEIGHT } from "./select.constants";

const Select = ({
  options,
  value,
  name,
  label,
  placeholder = "Select option",
  required = false,
  disabled = false,
  error = false,
  helperText,
  loading = false,
  emptyMessage = "No options",
  maxVisibleItems = 5,
  menuPlacement = "bottom",
  className,
  triggerClassName,
  menuClassName,
  onBlur,
  onValueChange,
}: SelectProps) => {
  const generatedId = useId();
  const triggerId = name ?? generatedId;

  const {
    wrapperRef,
    open,
    selectedOption,
    isDisabled,
    handleToggle,
    handleSelect,
  } = useSelect({
    options,
    value,
    disabled,
    loading,
    onBlur,
    onValueChange,
  });

  const menuMaxHeight = OPTION_HEIGHT * maxVisibleItems;

  return (
    <div ref={wrapperRef} className={cn("relative space-y-1.5", className)}>
      {label && (
        <label
          htmlFor={triggerId}
          className="block px-1 text-sm font-medium text-slate-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <button
        id={triggerId}
        type="button"
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 rounded-md border bg-white px-3 text-left text-sm text-slate-700 outline-none transition-colors focus:border-purple-300 focus:ring-3 focus:ring-purple-300/50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 cursor-pointer",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          triggerClassName,
        )}
        disabled={isDisabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={error}
        onClick={handleToggle}
        onBlur={onBlur}
      >
        <span
          className={cn(
            "min-w-0 truncate",
            !selectedOption && "text-slate-400",
          )}
        >
          {loading ? "Loading..." : (selectedOption?.label ?? placeholder)}
        </span>

        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-slate-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-[70] w-full overflow-hidden rounded-md border border-slate-100 bg-white py-1 shadow-lg",
            menuPlacement === "top" ? "bottom-14" : "top-[calc(100%+0.25rem)]",
            menuClassName,
          )}
        >
          <div
            role="listbox"
            aria-labelledby={triggerId}
            className="overflow-y-auto px-1"
            style={{ maxHeight: menuMaxHeight }}
          >
            {options.length === 0 ? (
              <div className="flex h-10 items-center px-3 text-sm text-slate-500">
                {emptyMessage}
              </div>
            ) : (
              options.map((option) => {
                const selected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    disabled={option.disabled}
                    className={cn(
                      "flex h-10 w-full items-center justify-between gap-3 rounded px-2.5 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer bg-gray-100 my-1",
                      selected && "bg-slate-100 text-slate-700",
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className="min-w-0 truncate">{option.label}</span>
                    {selected && (
                      <Check className="size-5 shrink-0 text-purple-500" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

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

export default Select;
