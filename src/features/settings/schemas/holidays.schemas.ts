import z from "zod";

export const createCountryHolidaySchema = z.object({
  country_code: z.string().min(1, "Country is required"),
});
