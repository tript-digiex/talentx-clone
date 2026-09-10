import { COUNTRY_FLAG_MAP } from "../types/holidays/holidays.constants";

export const getCountryInfo = (countryCode: string) => {
  return COUNTRY_FLAG_MAP[countryCode.toUpperCase()];
};
