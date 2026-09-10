import Button from "@/components/ui/custom/Button";
import { useEffect, useState } from "react";
import { useCountryHoliday } from "../../hooks/holidays/useCountryHoliday";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { CountryListItem } from "./components/CountryListItem";

export const CountriesSection = () => {
  const {
    countries,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    errorMessage,
  } = useCountryHoliday();
  const [activeCountry, setActiveCountry] = useState("");

  useEffect(() => {
    if (countries.length > 0 && !activeCountry) {
      setActiveCountry(countries[0].country_code);
    }
  }, [countries, activeCountry]);

  if (isCountriesLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <SpinnerLoader />
      </div>
    );
  }

  if (isCountriesError) {
    return (
      <ErrorMessage errorMessage={errorMessage || "Error loading countries"} />
    );
  }

  return (
    <div className="flex-1 border rounded-md">
      <div className="font-bold border-b px-4 py-2">Countries</div>
      <div className="px-4 p-2">
        <Button className="font-normal p-4 my-2">Add Country</Button>
        <div className="flex-1">
          {countries.map((country) => (
            <CountryListItem
              key={country.country_code}
              active={activeCountry === country.country_code}
              country_code={country.country_code}
              onClick={() => setActiveCountry(country.country_code)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
