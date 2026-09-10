import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { SelectOption } from "../select.types";

type SelectTriggerProps = {
  id: string;
  open: boolean;
  loading: boolean;
  disabled: boolean;
  selectedOption?: SelectOption;
  placeholder: string;
  error: boolean;
  className?: string;
  onClick: () => void;
  onBlur?: () => void;
};

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(({
    id,
    open,
    loading,
    disabled,
    selectedOption,
    placeholder,
    error,
    className,
    onClick,
    onBlur,
  }, ref) => {
  return (
    <button
      ref={ref}
      id={id}
      type="button"
      className={cn(
        "flex h-12 w-full items-center justify-between gap-3 rounded-md border bg-white px-3 text-left text-sm text-slate-700 outline-none transition-colors focus:border-purple-300 focus:ring-3 focus:ring-purple-300/50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 cursor-pointer",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        className,
      )}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-invalid={error}
      onClick={onClick}
      onBlur={onBlur}
    >
      <span
        className={cn(
          "flex min-w-0 items-center gap-2 truncate",
          !selectedOption && "text-slate-400",
        )}
      >
        {loading ? (
          "Loading..."
        ) : selectedOption ? (
          <>
            {selectedOption.icon && (
              <span className="flex size-5 shrink-0 items-center justify-center">
                {selectedOption.icon}
              </span>
            )}

            <span className="min-w-0 truncate">{selectedOption.label}</span>
          </>
        ) : (
          placeholder
        )}
      </span>

      <ChevronDown
        className={cn(
          "size-4 shrink-0 text-slate-500 transition-transform",
          open && "rotate-180",
        )}
      />
    </button>
  );
});

SelectTrigger.displayName = "SelectTrigger";

export default SelectTrigger;
