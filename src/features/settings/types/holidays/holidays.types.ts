import type { ApiResponse } from "@/lib/axios";
import type { COUNTRY_STATUS } from "./holidays.constants";
import type z from "zod";
import type { createCountryHolidaySchema } from "../../schemas/holidays.schemas";

export type CountryData = {
  id: string;
  country_code: string;
  status: COUNTRY_STATUS;
  created_date: string;
};

export type CountryResponse = ApiResponse<CountryData[]>;

export type CountryInfo = {
  name: string;
  img: string;
};

export type CreateCountryHolidayPayload = z.infer<
  typeof createCountryHolidaySchema
>;

export type UpdateCountryHolidayPayload = CreateCountryHolidayPayload
export type DeleteCountryHolidayResponse = ApiResponse<string>
