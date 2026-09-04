import { Popover } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";
import { DATE_RANGE_SELECT_PLACEHOLDER } from "./date-range-select.constants";
import DateRangeSelectActions from "./components/DateRangeSelectActions";
import DateRangeSelectNavigation from "./components/DateRangeSelectNavigation";
import DateRangeSelectTrigger from "./components/DateRangeSelectTrigger";
import { useDateRangeSelect } from "./hooks/useDateRangeSelect";
import type { DateRangeSelectProps } from "./date-range-select.types";

const DateRangeSelect = ({
  value,
  onChange,
  placeholder = DATE_RANGE_SELECT_PLACEHOLDER,
  disabled = false,
  className,
}: DateRangeSelectProps) => {
  const {
    open,
    draftValue,
    visibleMonth,
    selectedLabel,
    hasSelectedRange,
    canApply,
    handleOpenChange,
    handleClear,
    handleSelectDate,
    handleCancel,
    handleApply,
    setVisibleMonth,
  } = useDateRangeSelect({
    value,
    onChange,
    disabled,
  });

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        disabled={disabled}
        className="p-0 border-0 bg-transparent"
      >
        <DateRangeSelectTrigger
          selectedLabel={selectedLabel}
          placeholder={placeholder}
          hasSelectedRange={hasSelectedRange}
          disabled={disabled}
          className={className}
          onClear={handleClear}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner sideOffset={12} align="end">
          <Popover.Popup
            initialFocus={false}
            className={cn(
              "z-50 rounded-lg border border-gray-200 bg-white p-7 shadow-lg outline-none",
              "transition duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            )}
          >
            <DateRangeSelectNavigation
              visibleMonth={visibleMonth}
              draftValue={draftValue}
              onMonthChange={setVisibleMonth}
              onSelectDate={handleSelectDate}
            />

            <DateRangeSelectActions
              onCancel={handleCancel}
              onApply={handleApply}
              applyDisabled={!canApply}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DateRangeSelect;
