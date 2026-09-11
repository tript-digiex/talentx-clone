export const DATE_SELECT_MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const DATE_SELECT_WEEK_COUNT = 6;
const DAYS_IN_WEEK = 7;

export type DateSelectDay = {
  date: Date;
  isCurrentMonth: boolean;
};

const padDatePart = (value: number) => value.toString().padStart(2, "0");

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

export const isSameDay = (left: Date | null, right: Date | null) => {
  if (!left || !right) {
    return false;
  }

  return startOfDay(left).getTime() === startOfDay(right).getTime();
};

export const formatDateSelectValue = (date: Date) => {
  const month = padDatePart(date.getMonth() + 1);
  const day = padDatePart(date.getDate());
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const parseDateSelectValue = (value: string | null | undefined) => {
  if (!value) {
    return null;
  }

  const [month, day, year] = value.split("/").map(Number);

  if (!month || !day || !year) {
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
};

export const toDateSelectValue = (value: Date | string | null | undefined) => {
  if (!value) {
    return "";
  }

  const parsedDate =
    typeof value === "string"
      ? parseDateSelectValue(value) ?? new Date(value)
      : value;

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return formatDateSelectValue(parsedDate);
};

export const getDateSelectDays = (month: Date): DateSelectDay[] => {
  const monthStart = startOfMonth(month);
  const firstVisibleDate = new Date(monthStart);
  firstVisibleDate.setDate(monthStart.getDate() - monthStart.getDay());

  return Array.from(
    { length: DATE_SELECT_WEEK_COUNT * DAYS_IN_WEEK },
    (_, index) => {
      const date = new Date(firstVisibleDate);
      date.setDate(firstVisibleDate.getDate() + index);

      return {
        date,
        isCurrentMonth: date.getMonth() === monthStart.getMonth(),
      };
    },
  );
};
