import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCountryHoliday } from "../../api/holiday.api";
import type { CountryResponse } from "../../types/holidays/holidays.types";
import { toast } from "sonner";
import { holidayKeys } from "../../types/holidays/holidays.constants";

export const useCreateCountryHoliday = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: createCountryHoliday,
    onSuccess: (response: CountryResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Country holiday created successfully");
      query.invalidateQueries({
        queryKey: holidayKeys.countries(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
