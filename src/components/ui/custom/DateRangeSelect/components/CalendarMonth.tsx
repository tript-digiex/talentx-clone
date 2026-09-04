import { useMemo } from "react";
import {
  formatMonthLabel,
  getCalendarDays,
  getDayState,
} from "../date-range-select.utils";
import type { DateRangeDraftValue } from "../date-range-select.types";
import { WEEKDAY_LABELS } from "../date-range-select.constants";
import { dateRangeSelectDayVariants } from "../date-range-select.variants";
import { cn } from "@/lib/utils";

type CalendarMonthProps = {
  month: Date;
  draftValue: DateRangeDraftValue;
  onSelectDate: (date: Date) => void;
};

const CalendarMonth = ({
  month,
  draftValue,
  onSelectDate,
}: CalendarMonthProps) => {
  const days = useMemo(() => getCalendarDays(month), [month]);

  return (
    <div className="w-79.5">
      <h3 className="mb-5 text-center text-xl font-semibold text-gray-950">
        {formatMonthLabel(month)}
      </h3>
      <div className="mb-4 grid grid-cols-7 text-center text-sm font-semibold text-gray-800">
        {WEEKDAY_LABELS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day) => (
          <button
            key={day.date.toISOString()}
            type="button"
            className={cn(
              dateRangeSelectDayVariants({
                state: getDayState(day, draftValue),
              }),
            )}
            onClick={() => onSelectDate(day.date)}
          >
            {day.date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarMonth;
