import { useQuery } from "@tanstack/react-query";
import { holidayKeys } from "../../types/holidays/holidays.constants";
import { getCountryHoliday } from "../../api/holiday.api";

export const useCountryHoliday = () => {
  const query = useQuery({
    queryKey: holidayKeys.countries(),
    queryFn: getCountryHoliday,
    enabled: true,
  });

  const response = query.data;
  const countries = response?.success ? response.data : [];
  const errorMessage =
    response && !response.success
      ? response.error.message
      : query.error?.message;

  return {
    ...query,
    countries,
    errorMessage,
  };
};
