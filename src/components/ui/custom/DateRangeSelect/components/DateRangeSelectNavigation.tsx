import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DateRangeDraftValue } from "../date-range-select.types";
import { addMonths } from "../date-range-select.utils";
import CalendarMonth from "./CalendarMonth";

type DateRangeSelectNavigationProps = {
  visibleMonth: Date;
  draftValue: DateRangeDraftValue;
  onMonthChange: (month: Date) => void;
  onSelectDate: (date: Date) => void;
};

const DateRangeSelectNavigation = ({
  visibleMonth,
  draftValue,
  onMonthChange,
  onSelectDate,
}: DateRangeSelectNavigationProps) => {
  const nextMonth = addMonths(visibleMonth, 1);

  return (
    <div className="mb-4 flex items-start justify-between gap-6">
      <button
        type="button"
        className="mt-1 flex size-10 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50"
        onClick={() => onMonthChange(addMonths(visibleMonth, -1))}
      >
        <ChevronLeft className="size-6" />
      </button>

      <div className="flex gap-8">
        <CalendarMonth
          month={visibleMonth}
          draftValue={draftValue}
          onSelectDate={onSelectDate}
        />

        <CalendarMonth
          month={nextMonth}
          draftValue={draftValue}
          onSelectDate={onSelectDate}
        />
      </div>

      <button
        type="button"
        className="mt-1 flex size-10 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-300/50"
        onClick={() => onMonthChange(addMonths(visibleMonth, 1))}
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}

export default DateRangeSelectNavigation;