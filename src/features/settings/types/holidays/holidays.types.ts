import type { ApiResponse } from "@/lib/axios";
import type { COUNTRY_STATUS } from "./holidays.constants";

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
}