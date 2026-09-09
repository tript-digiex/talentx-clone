import { useEffect, useMemo, useRef, useState } from "react";

import type { SelectOption } from "./select.types";

interface UseSelectProps {
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  onBlur?: () => void;
  onValueChange?: (value: string) => void;
}

export const useSelect = ({
  options,
  value,
  disabled = false,
  loading = false,
  onBlur,
  onValueChange,
}: UseSelectProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const isDisabled = disabled || loading;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [onBlur, open]);

  const handleToggle = () => {
    if (isDisabled) {
      return;
    }

    setOpen((currentOpen) => !currentOpen);
  };

  const handleSelect = (nextValue: string) => {
    onValueChange?.(nextValue);
    setOpen(false);
    onBlur?.();
  };

  return {
    wrapperRef,
    open,
    selectedOption,
    isDisabled,
    handleToggle,
    handleSelect,
  };
};
