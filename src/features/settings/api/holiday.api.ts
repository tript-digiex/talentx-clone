import { apiClient } from "@/lib/axios";
import type { CountryResponse } from "../types/holidays/holidays.types";

export const getCountryHoliday = async (): Promise<CountryResponse> => {
  const response = await apiClient.get<CountryResponse>("/v1/country-holiday");
  return response.data;
};
