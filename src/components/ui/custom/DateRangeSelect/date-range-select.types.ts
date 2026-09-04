export type DateRangeValue = {
  from_date: string | null;
  to_date: string | null;
};

export type DateRangeDraftValue = {
  startDate: Date | null;
  endDate: Date | null;
};

export type DateRangeSelectProps = {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};
