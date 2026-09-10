import type { SelectOption } from "./select.types";

export const getOptionSearchText = (option: SelectOption) => {
  if (option.searchValue) {
    return option.searchValue;
  }

  if (typeof option.label === "string") {
    return option.label;
  }

  return option.value;
};