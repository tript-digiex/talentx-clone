import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCountryHoliday } from "../../api/holiday.api";
import type {
  CountryResponse,
  UpdateCountryHolidayPayload,
} from "../../types/holidays/holidays.types";
import { toast } from "sonner";
import { holidayKeys } from "../../types/holidays/holidays.constants";

type UpdateCountryHolidayVariables = {
  countryId: string;
  payload: UpdateCountryHolidayPayload;
};

export const useUpdateCountryHoliday = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: ({ countryId, payload }: UpdateCountryHolidayVariables) =>
      updateCountryHoliday(countryId, payload),
    onSuccess: (response: CountryResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Country holiday updated successfully");
      query.invalidateQueries({
        queryKey: holidayKeys.countries(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
