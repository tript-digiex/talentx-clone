import { toast } from "sonner";
import { deleteHolidayApi } from "../../api/holiday.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteHolidayResponse } from "../../types/holidays/holidays.types";
import { holidayKeys } from "../../types/holidays/holidays.constants";

export const useDeleteHoliday = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: deleteHolidayApi,
    onSuccess: (response: DeleteHolidayResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Holiday deleted successfully");
      query.invalidateQueries({
        queryKey: holidayKeys.countries(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
