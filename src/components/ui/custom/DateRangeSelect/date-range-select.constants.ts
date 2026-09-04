export const DATE_RANGE_SELECT_PLACEHOLDER = "Choose dates";

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const CALENDAR_WEEKS = 6;
export const DAYS_IN_WEEK = 7;

export const START_DATE_TIME = "00:00:00";
export const END_DATE_TIME = "23:59:59";

export const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export enum DAY_STATE {
  DEFAULT = "default",
  SELECTED = "selected",
  IN_RANGE = "inRange",
  TODAY = "today",
  MUTED = "muted",
  WEEKEND = "weekend",
}

export enum DATE_RANGE {
  START = "start",
  END = "end",
}
