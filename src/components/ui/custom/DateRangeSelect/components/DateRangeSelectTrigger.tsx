import { Calendar, X } from "lucide-react";
import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { dateRangeSelectTriggerVariants } from "../date-range-select.variants";

type DateRangeSelectTriggerProps = {
  selectedLabel: string;
  placeholder: string;
  hasSelectedRange: boolean;
  disabled: boolean;
  className?: string;
  onClear: (event: MouseEvent<HTMLSpanElement>) => void;
};

const DateRangeSelectTrigger = ({
  selectedLabel,
  placeholder,
  hasSelectedRange,
  disabled,
  className,
  onClear,
}: DateRangeSelectTriggerProps) => {
  return (
    <div
      className={cn(
        dateRangeSelectTriggerVariants({
          selected: hasSelectedRange,
          disabled,
        }),
        className,
      )}
    >
      <Calendar className="size-5 shrink-0 text-gray-700" />
      <span className="min-w-0 flex-1 truncate text-left">
        {selectedLabel || placeholder}
      </span>
      {hasSelectedRange && (
        <span
          role="button"
          className="ml-1 flex size-6 shrink-0 items-center justify-center rounded-full text-blue-700 hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
          onClick={onClear}
        >
          <X className="size-5" />
        </span>
      )}
    </div>
  );
};

export default DateRangeSelectTrigger;
