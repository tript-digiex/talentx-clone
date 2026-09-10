import type { CSSProperties, RefObject } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import SelectOptionComponent from "./SelectOption";
import SelectSearch from "./SelectSearch";
import type { SelectOption } from "../select.types";

type SelectMenuProps = {
  menuRef: RefObject<HTMLDivElement | null>;
  menuStyle?: CSSProperties;
  menuClassName?: string;

  searchable: boolean;
  searchTerm: string;
  searchPlaceholder: string;

  visibleOptions: SelectOption[];
  value?: string;

  emptyMessage: string;
  optionsMaxHeight: number;
  triggerId: string;

  onSearchChange: (value: string) => void;
  onSelect: (value: string) => void;
};

const SelectMenu = ({
  menuRef,
  menuStyle,
  menuClassName,
  searchable,
  searchTerm,
  searchPlaceholder,
  visibleOptions,
  value,
  emptyMessage,
  optionsMaxHeight,
  triggerId,
  onSearchChange,
  onSelect,
}: SelectMenuProps) => {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      className={cn(
        "fixed z-[100] overflow-hidden rounded-md border border-slate-100 bg-white py-1 shadow-lg",
        menuClassName,
      )}
      style={menuStyle}
    >
      {searchable && (
        <SelectSearch
          value={searchTerm}
          placeholder={searchPlaceholder}
          onChange={onSearchChange}
        />
      )}

      <div
        role="listbox"
        aria-labelledby={triggerId}
        className="overflow-y-auto px-1"
        style={{ maxHeight: optionsMaxHeight }}
      >
        {visibleOptions.length === 0 ? (
          <div className="flex h-10 items-center px-3 text-sm text-slate-500">
            {emptyMessage}
          </div>
        ) : (
          visibleOptions.map((option) => (
            <SelectOptionComponent
              key={option.value}
              option={option}
              selected={option.value === value}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>,
    document.body,
  );
};

export default SelectMenu;
