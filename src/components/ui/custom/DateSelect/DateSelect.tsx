import { Popover } from "@base-ui/react/popover";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import {
  addMonths,
  DATE_SELECT_MONTH_FORMATTER,
  formatDateSelectValue,
  getDateSelectDays,
  isSameDay,
  parseDateSelectValue,
  startOfMonth,
} from "./date-select.utils";

import { WEEKDAY_LABELS } from "./date-select.constants";
import {
  dateSelectDayStateVariants,
  dateSelectDayVariants,
  dateSelectHelperTextVariants,
  dateSelectLabelVariants,
  dateSelectNavigationButtonVariants,
  dateSelectPopupVariants,
  dateSelectTriggerVariants,
} from "./date-select.variants";
import type { DateSelectProps } from "./date-select.types";

const DateSelect = ({
  name,
  label,
  value,
  placeholder = "MM/DD/YYYY",
  required = false,
  disabled = false,
  error = false,
  helperText,
  className,
  onBlur,
  onValueChange,
}: DateSelectProps) => {
  const selectedDate = parseDateSelectValue(value);

  const today = useMemo(() => new Date(), []);
  const [open, setOpen] = useState(false);

  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(selectedDate ?? today),
  );

  const days = useMemo(() => getDateSelectDays(visibleMonth), [visibleMonth]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled) {
      return;
    }

    setOpen(nextOpen);

    if (nextOpen) {
      setVisibleMonth(startOfMonth(selectedDate ?? today));
    } else {
      onBlur?.();
    }
  };

  const handleSelectDate = (date: Date) => {
    onValueChange(formatDateSelectValue(date));
    setOpen(false);
    onBlur?.();
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className={dateSelectLabelVariants()}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Popover.Root open={open} onOpenChange={handleOpenChange}>
        <Popover.Trigger
          type="button"
          disabled={disabled}
          className={dateSelectTriggerVariants({
            error,
            disabled,
            open: open && !error,
          })}
          aria-invalid={error}
          aria-label={label}
          name={name}
        >
          <CalendarDays className="size-5 text-slate-500" />

          <span className={cn(value ? "text-slate-700" : "text-slate-400")}>
            {value || placeholder}
          </span>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Positioner
            sideOffset={10}
            align="center"
            className="z-[100]"
          >
            <Popover.Popup className={dateSelectPopupVariants()}>
              <div className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border-l border-t border-slate-200 bg-white" />

              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  className={dateSelectNavigationButtonVariants()}
                  onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="text-base font-bold text-slate-950">
                  {DATE_SELECT_MONTH_FORMATTER.format(visibleMonth)}
                </div>

                <button
                  type="button"
                  className={dateSelectNavigationButtonVariants()}
                  onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              <div className="mb-5 grid grid-cols-7 text-center text-sm font-semibold text-slate-700">
                {WEEKDAY_LABELS.map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-2">
                {days.map((day) => {
                  const isSelected = isSameDay(day.date, selectedDate);
                  const isToday = isSameDay(day.date, today);

                  return (
                    <button
                      key={day.date.toISOString()}
                      type="button"
                      className={cn(
                        dateSelectDayVariants(),
                        dateSelectDayStateVariants({
                          currentMonth: day.isCurrentMonth,
                          today: isToday,
                          selected: isSelected,
                        }),
                      )}
                      onClick={() => handleSelectDate(day.date)}
                    >
                      {day.date.getDate()}
                    </button>
                  );
                })}
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      {helperText && (
        <p className={dateSelectHelperTextVariants({ error })}>{helperText}</p>
      )}
    </div>
  );
};

export default DateSelect;
