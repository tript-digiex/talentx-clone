import { useQuery } from "@tanstack/react-query";
import { holidayKeys } from "../../types/holidays/holidays.constants";
import { getHolidayByCountryId } from "../../api/holiday.api";

export const useHolidaysByCountry = (countryId: string) => {
  const query = useQuery({
    queryKey: holidayKeys.holidays(countryId),
    queryFn: () => getHolidayByCountryId(countryId),
    enabled: !!countryId,
  });

  const response = query.data;
  const holidays = response?.success ? response.data : [];
  const errorMessage =
    response && !response.success
      ? response.error.message
      : query.error?.message;

  return {
    ...query,
    holidays,
    errorMessage,
  };
};
