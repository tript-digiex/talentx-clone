import { apiClient } from "@/lib/axios";
import type {
  CountryResponse,
  CreateCountryHolidayPayload,
  CreateHolidayPayload,
  CreateHolidayResponse,
  DeleteCountryHolidayResponse,
  HolidayResponse,
  UpdateCountryHolidayPayload,
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

export const updateCountryHoliday = async (
  countryId: string,
  payload: UpdateCountryHolidayPayload,
): Promise<CountryResponse> => {
  const response = await apiClient.put<CountryResponse>(
    `/v1/country-holiday/${countryId}`,
    payload,
  );
  return response.data;
};

export const deleteCountryHoliday = async (
  countryId: string,
): Promise<DeleteCountryHolidayResponse> => {
  const response = await apiClient.delete<DeleteCountryHolidayResponse>(
    `/v1/country-holiday/${countryId}`,
  );
  return response.data;
};

export const getHolidayByCountryId = async (
  countryId: string,
): Promise<HolidayResponse> => {
  const response = await apiClient.get<HolidayResponse>("/v1/holiday", {
    params: {
      country_holiday_id: countryId,
    },
  });

  return response.data;
};

export const createHolidayApi = async (
  payload: CreateHolidayPayload,
): Promise<CreateHolidayResponse> => {
  const response = await apiClient.post<CreateHolidayResponse>(
    "/v1/holiday",
    payload,
  );
  return response.data;
};
