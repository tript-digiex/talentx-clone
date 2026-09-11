import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    HolidayPayload,
  UpdateHolidayResponse,
} from "../../types/holidays/holidays.types";
import { updateHolidayApi } from "../../api/holiday.api";
import { toast } from "sonner";
import { holidayKeys } from "../../types/holidays/holidays.constants";

type UpdateHolidayVariables = {
  holidayId: string;
  payload: HolidayPayload;
};

export const useUpdateHoliday = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: ({ holidayId, payload }: UpdateHolidayVariables) =>
      updateHolidayApi(holidayId, payload),
    onSuccess: (response: UpdateHolidayResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Holiday updated successfully");
      query.invalidateQueries({
        queryKey: holidayKeys.holidays(response.data.country_holiday_id),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
