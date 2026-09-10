import { useCallback, useEffect, useMemo, useState } from "react";

import type { SelectOption } from "../select.types";
import { getOptionSearchText } from "../select.utils";

type UseSearchOptionsSelectProps = {
  options: SelectOption[];
  searchable: boolean;
  open: boolean;
};

export const useSearchOptionsSelect = ({
  options,
  searchable,
  open,
}: UseSearchOptionsSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const visibleOptions = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!searchable || !normalizedSearchTerm) {
      return options;
    }

    return options.filter((option) =>
      getOptionSearchText(option).toLowerCase().includes(normalizedSearchTerm),
    );
  }, [options, searchable, searchTerm]);

  const clearSearchTerm = useCallback(() => {
    setSearchTerm("");
  }, []);

  useEffect(() => {
    if (!open) {
      clearSearchTerm();
    }
  }, [clearSearchTerm, open]);

  return {
    searchTerm,
    setSearchTerm,
    visibleOptions,
    clearSearchTerm,
  };
};
