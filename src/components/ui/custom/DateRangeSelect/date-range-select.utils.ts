import {
  CALENDAR_WEEKS,
  DATE_FORMATTER,
  DATE_RANGE,
  DAY_STATE,
  DAYS_IN_WEEK,
  END_DATE_TIME,
  MONTH_FORMATTER,
  START_DATE_TIME,
} from "./date-range-select.constants";
import type {
  CalendarDay,
  DateRangeDraftValue,
  DateRangeValue,
} from "./date-range-select.types";

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(left: Date | null, right: Date | null) {
  if (!left || !right) {
    return false;
  }

  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

export function isBeforeDay(left: Date, right: Date) {
  return startOfDay(left).getTime() < startOfDay(right).getTime();
}

export function isWithinRange(date: Date, range: DateRangeDraftValue) {
  if (!range.startDate || !range.endDate) {
    return false;
  }

  const dayTime = startOfDay(date).getTime();
  const startTime = startOfDay(range.startDate).getTime();
  const endTime = startOfDay(range.endDate).getTime();

  return dayTime > startTime && dayTime < endTime;
}

export function getCalendarDays(month: Date): CalendarDay[] {
  const monthStart = startOfMonth(month);
  const firstVisibleDate = new Date(monthStart);
  firstVisibleDate.setDate(monthStart.getDate() - monthStart.getDay());

  return Array.from({ length: CALENDAR_WEEKS * DAYS_IN_WEEK }, (_, index) => {
    const date = new Date(firstVisibleDate);
    date.setDate(firstVisibleDate.getDate() + index);

    return {
      date,
      isCurrentMonth: date.getMonth() === monthStart.getMonth(),
    };
  });
}

export function getNextRange(date: Date, currentRange: DateRangeDraftValue) {
  const selectedDate = startOfDay(date);

  if (!currentRange.startDate || currentRange.endDate) {
    return {
      startDate: selectedDate,
      endDate: null,
    };
  }

  if (isBeforeDay(selectedDate, currentRange.startDate)) {
    return {
      startDate: selectedDate,
      endDate: startOfDay(currentRange.startDate),
    };
  }

  return {
    startDate: startOfDay(currentRange.startDate),
    endDate: selectedDate,
  };
}

export function formatMonthLabel(date: Date) {
  return MONTH_FORMATTER.format(date);
}

export function formatDateRange(value: DateRangeDraftValue) {
  if (!value.startDate || !value.endDate) {
    return "";
  }

  return `${DATE_FORMATTER.format(value.startDate)} - ${DATE_FORMATTER.format(
    value.endDate,
  )}`;
}

function padDatePart(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatDateTimeValue(date: Date, time: DATE_RANGE) {
  const day = padDatePart(date.getDate());
  const month = padDatePart(date.getMonth() + 1);
  const year = date.getFullYear();
  const clock = time === DATE_RANGE.START ? START_DATE_TIME : END_DATE_TIME;

  return `${month}/${day}/${year} ${clock}`;
}

export function parseDateTimeValue(value: string | null) {
  if (!value) {
    return null;
  }

  const [datePart] = value.trim().split(" ");
  const [month, day, year] = datePart.split("/").map(Number);

  if (!day || !month || !year) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function toDraftDateRange(value: DateRangeValue): DateRangeDraftValue {
  const startDate = parseDateTimeValue(value.from_date);
  const endDate = parseDateTimeValue(value.to_date);

  return {
    startDate,
    endDate: endDate ?? (startDate ? startOfDay(new Date()) : null),
  };
}

export function toDateRangeValue(value: DateRangeDraftValue): DateRangeValue {
  const endDate =
    value.endDate ?? (value.startDate ? startOfDay(new Date()) : null);

  return {
    from_date: value.startDate
      ? formatDateTimeValue(value.startDate, DATE_RANGE.START)
      : null,
    to_date: endDate ? formatDateTimeValue(endDate, DATE_RANGE.END) : null,
  };
}

export function getInitialMonth(value: DateRangeValue) {
  return startOfMonth(toDraftDateRange(value).startDate ?? new Date());
}

export function getDayState(day: CalendarDay, draftValue: DateRangeDraftValue) {
  if (
    isSameDay(day.date, draftValue.startDate) ||
    isSameDay(day.date, draftValue.endDate)
  ) {
    return DAY_STATE.SELECTED;
  }

  if (isWithinRange(day.date, draftValue)) {
    return DAY_STATE.IN_RANGE;
  }

  if (isSameDay(day.date, new Date())) {
    return DAY_STATE.TODAY;
  }

  if (!day.isCurrentMonth) {
    return DAY_STATE.MUTED;
  }

  if (day.date.getDay() === 0 || day.date.getDay() === 6) {
    return DAY_STATE.WEEKEND;
  }

  return DAY_STATE.DEFAULT;
}
