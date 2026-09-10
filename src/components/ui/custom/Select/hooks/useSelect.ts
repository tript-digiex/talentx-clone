import { useEffect, useMemo, useRef, useState } from "react";
import type { SelectOption } from "../select.types";

interface UseSelectProps {
  options: SelectOption[];
  value?: string;
  menuRef?: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  loading?: boolean;
  onBlur?: () => void;
  onValueChange?: (value: string) => void;
}

export const useSelect = ({
  options,
  value,
  menuRef,
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
      const target = event.target as Node;
      const clickedTrigger = wrapperRef.current?.contains(target);
      const clickedMenu = menuRef?.current?.contains(target);

      if (!clickedTrigger && !clickedMenu) {
        setOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuRef, onBlur, open]);

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
