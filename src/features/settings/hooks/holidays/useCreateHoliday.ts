import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHolidayApi } from "../../api/holiday.api";
import type { CreateHolidayResponse } from "../../types/holidays/holidays.types";
import { toast } from "sonner";
import { holidayKeys } from "../../types/holidays/holidays.constants";

export const useCreateHoliday = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: createHolidayApi,
    onSuccess: (response: CreateHolidayResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Country holiday created successfully");
      query.invalidateQueries({
        queryKey: holidayKeys.holidays(response.data.country_holiday_id),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
