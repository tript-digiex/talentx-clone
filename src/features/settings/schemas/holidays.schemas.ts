import z from "zod";

export const createCountryHolidaySchema = z.object({
  country_code: z.string().min(1, "Country is required"),
});

export const createHolidaySchema = z.object({
  country_holiday_id: z.string().min(1, "Country code is required"),
  holiday_date: z.string().min(1, "Holiday date is required"),
  description: z.string().min(1, "Description is required"),
});
