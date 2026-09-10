import { toast } from "sonner";
import { deleteCountryHoliday } from "../../api/holiday.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteCountryHolidayResponse } from "../../types/holidays/holidays.types";
import { holidayKeys } from "../../types/holidays/holidays.constants";

export const useDeleteCountryHoliday = () => {
    const query = useQueryClient()

  return useMutation({
    mutationFn: deleteCountryHoliday,
    onSuccess: (response: DeleteCountryHolidayResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Country holiday deleted successfully");
      query.invalidateQueries({
        queryKey: holidayKeys.countries()
      })
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
