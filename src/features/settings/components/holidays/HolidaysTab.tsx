import { useState } from "react";
import { useCountryHoliday } from "../../hooks/holidays/useCountryHoliday";
import { CountriesSection } from "./CountriesSection";
import { HolidaysSection } from "./HolidaysSection";

export const HolidaysTab = () => {
  const {
    countries,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    errorMessage,
  } = useCountryHoliday();
  const [activeCountry, setActiveCountry] = useState("");

  const activeCountryHoliday = countries.find(
    (country) => country.country_code === activeCountry,
  );

  return (
    <div className="flex gap-4">
      <CountriesSection
        countries={countries}
        isLoading={isCountriesLoading}
        isError={isCountriesError}
        errorMessage={errorMessage}
        activeCountry={activeCountry}
        setActiveCountry={setActiveCountry}
      />
      <HolidaysSection countryHolidayId={activeCountryHoliday?.id ?? ""} />
    </div>
  );
};
