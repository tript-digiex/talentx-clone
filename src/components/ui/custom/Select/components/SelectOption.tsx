import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SelectOption as SelectOptionType } from "../select.types";

type SelectOptionProps = {
  option: SelectOptionType;
  selected: boolean;
  onSelect: (value: string) => void;
};

const SelectOption = ({ option, selected, onSelect }: SelectOptionProps) => {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={option.disabled}
      className={cn(
        "flex h-10 w-full items-center justify-between gap-3 rounded px-2.5 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer bg-gray-100 my-1",
        selected && "bg-slate-100 text-slate-700",
      )}
      onClick={() => onSelect(option.value)}
    >
      <span className="flex min-w-0 flex-1 items-center gap-3">
        {option.icon && (
          <span className="flex size-5 shrink-0 items-center justify-center">
            {option.icon}
          </span>
        )}

        <span className="min-w-0 truncate">{option.label}</span>
      </span>

      {selected && <Check className="size-5 shrink-0 text-purple-500" />}
    </button>
  );
};

export default SelectOption;
