import { apiClient } from "@/lib/axios";
import type {
  CountryResponse,
  CreateCountryHolidayPayload,
} from "../types/holidays/holidays.types";

export const getCountryHoliday = async (): Promise<CountryResponse> => {
  const response = await apiClient.get<CountryResponse>("/v1/country-holiday");
  return response.data;
};

export const createCountryHoliday = async (
  payload: CreateCountryHolidayPayload,
): Promise<CountryResponse> => {
  const response = await apiClient.post<CountryResponse>(
    "/v1/country-holiday",
    payload,
  );
  return response.data;
};
