import type { MouseEvent } from "react";
import { useMemo, useState } from "react";

import type {
  DateRangeDraftValue,
  DateRangeSelectProps,
} from "../date-range-select.types";
import {
  formatDateRange,
  getInitialMonth,
  getNextRange,
  toDateRangeValue,
  toDraftDateRange,
} from "../date-range-select.utils";

type UseDateRangeSelectParams = Pick<
  DateRangeSelectProps,
  "value" | "onChange" | "disabled"
>;

export function useDateRangeSelect({
  value,
  onChange,
  disabled = false,
}: UseDateRangeSelectParams) {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<DateRangeDraftValue>(() =>
    toDraftDateRange(value),
  );
  const [visibleMonth, setVisibleMonth] = useState(() =>
    getInitialMonth(value),
  );

  const selectedValue = useMemo(() => toDraftDateRange(value), [value]);
  const selectedLabel = formatDateRange(selectedValue);
  const hasSelectedRange = Boolean(value.from_date && value.to_date);
  const canApply = Boolean(draftValue.startDate);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftValue(toDraftDateRange(value));
      setVisibleMonth(getInitialMonth(value));
    }

    setOpen(nextOpen);
  };

  const handleClear = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) {
      return;
    }

    onChange({
      from_date: null,
      to_date: null,
    });
    setOpen(false);
  };

  const handleSelectDate = (date: Date) => {
    setDraftValue((currentValue) => getNextRange(date, currentValue));
  };

  const handleCancel = () => {
    setDraftValue(toDraftDateRange(value));
    setOpen(false);
  };

  const handleApply = () => {
    onChange(toDateRangeValue(draftValue));
    setOpen(false);
  };

  return {
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
  };
}
