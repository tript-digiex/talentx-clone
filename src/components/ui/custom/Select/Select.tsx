import { useRef, useId } from "react";

import { cn } from "@/lib/utils";

import type { SelectProps } from "./select.types";
import SelectTrigger from "./components/SelectTrigger";
import { useSelectMenuPosition } from "./hooks/useSelectMenuPosition";
import { useSelect } from "./hooks/useSelect";
import SelectMenu from "./components/SelectMenu";
import { useSearchOptionsSelect } from "./hooks/useSearchOptionsSelect";

const Select = ({
  options,
  value,
  name,
  label,
  placeholder = "Select option",
  required = false,
  disabled = false,
  error = false,
  helperText,
  loading = false,
  emptyMessage = "No options",
  searchable = false,
  searchPlaceholder = "Search",
  maxVisibleItems = 5,
  menuPlacement = "bottom",
  className,
  triggerClassName,
  menuClassName,
  onBlur,
  onValueChange,
}: SelectProps) => {
  const generatedId = useId();
  const triggerId = name ?? generatedId;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    wrapperRef,
    open,
    selectedOption,
    isDisabled,
    handleToggle,
    handleSelect,
  } = useSelect({
    options,
    value,
    menuRef,
    disabled,
    loading,
    onBlur,
    onValueChange,
  });

  const { menuStyle, optionsMaxHeight } = useSelectMenuPosition({
    triggerRef,
    open,
    menuPlacement,
    maxVisibleItems,
    searchable,
  });

  const { searchTerm, setSearchTerm, visibleOptions, clearSearchTerm } =
    useSearchOptionsSelect({
      options,
      searchable,
      open,
    });

  const handleSelectOption = (nextValue: string) => {
    handleSelect(nextValue);
    clearSearchTerm();
  };

  return (
    <div ref={wrapperRef} className={cn("relative space-y-1.5", className)}>
      {label && (
        <label
          htmlFor={triggerId}
          className="block px-1 text-sm font-medium text-slate-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <SelectTrigger
        ref={triggerRef}
        id={triggerId}
        open={open}
        loading={loading}
        disabled={isDisabled}
        selectedOption={selectedOption}
        placeholder={placeholder}
        error={error}
        className={triggerClassName}
        onClick={handleToggle}
        onBlur={onBlur}
      />

      {open && (
        <SelectMenu
          menuRef={menuRef}
          menuStyle={menuStyle}
          menuClassName={menuClassName}
          searchable={searchable}
          searchTerm={searchTerm}
          searchPlaceholder={searchPlaceholder}
          visibleOptions={visibleOptions}
          value={value}
          emptyMessage={emptyMessage}
          optionsMaxHeight={optionsMaxHeight}
          triggerId={triggerId}
          onSearchChange={setSearchTerm}
          onSelect={handleSelectOption}
        />
      )}

      {helperText && (
        <p
          className={cn(
            "px-1 text-xs text-muted-foreground",
            error && "text-red-500",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
