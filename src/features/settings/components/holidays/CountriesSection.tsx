import Button from "@/components/ui/custom/Button";
import { useEffect, useState } from "react";
import { useCountryHoliday } from "../../hooks/holidays/useCountryHoliday";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { CountryListItem } from "./components/CountryListItem";
import { MODAL_MODE } from "@/constants/modal.constants";
import { CountryFormModal } from "./components/CountryFormModal";
import type { CountryData } from "../../types/holidays/holidays.types";

export const CountriesSection = () => {
  const {
    countries,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
    errorMessage,
  } = useCountryHoliday();
  const [activeCountry, setActiveCountry] = useState("");
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  );

  const handleOpenAddCountryModal = () => {
    setSelectedCountry(null);
    setModalMode(MODAL_MODE.ADD);
  };

  const handleOpenEditCountryModal = (country: CountryData) => {
    setSelectedCountry(country);
    setModalMode(MODAL_MODE.EDIT);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
    setModalMode(null);
  };

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
    <>
      <div className="flex-1 border rounded-md">
        <div className="font-bold border-b px-4 py-2">Countries</div>
        <div className="px-4 p-2">
          <Button
            type="button"
            className="font-normal p-4 my-2"
            onClick={handleOpenAddCountryModal}
          >
            Add Country
          </Button>
          <div className="flex-1">
            {countries.map((country) => (
              <CountryListItem
                key={country.country_code}
                active={activeCountry === country.country_code}
                country={country}
                onClick={() => setActiveCountry(country.country_code)}
                onEdit={() => handleOpenEditCountryModal(country)}
              />
            ))}
          </div>
        </div>
      </div>

      <CountryFormModal
        open={modalMode !== null}
        mode={modalMode}
        country={selectedCountry}
        countries={countries}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseModal();
          }
        }}
        setActiveCountry={setActiveCountry}
      />
    </>
  );
};
