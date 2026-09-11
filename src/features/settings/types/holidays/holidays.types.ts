import type { ApiResponse } from "@/lib/axios";
import type { COUNTRY_STATUS, HOLIDAY_STATUS } from "./holidays.constants";
import type z from "zod";
import type {
  createCountryHolidaySchema,
  holidaySchema,
} from "../../schemas/holidays.schemas";

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

export type UpdateCountryHolidayPayload = CreateCountryHolidayPayload;
export type DeleteCountryHolidayResponse = ApiResponse<string>;

export type HolidayData = {
  id: string;
  country_holiday_id: string;
  holiday_date: Date;
  description: string;
  status: HOLIDAY_STATUS;
  created_date: string;
  updated_date: string;
};

export type HolidayResponse = ApiResponse<HolidayData[]>;

export type HolidayPayload = z.infer<typeof holidaySchema>;

export type CreateHolidayData = Omit<HolidayData, "updated_date">;

export type CreateHolidayResponse = ApiResponse<CreateHolidayData>;

export type UpdateHolidayResponse = ApiResponse<HolidayData>;
