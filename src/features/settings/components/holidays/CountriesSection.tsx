import Button from "@/components/ui/custom/Button";
import { useEffect, useState } from "react";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { MODAL_MODE } from "@/constants/modal.constants";
import { CountryFormModal } from "./components/CountryFormModal";
import type { CountryData } from "../../types/holidays/holidays.types";
import { DeleteCountryModal } from "./components/DeleteCountryModal";
import { getCountryInfo } from "../../utils/setting.utils";
import { SettingSectionListItem } from "@/components/common/SettingSectionListItem";
import { SettingContainerSection } from "@/components/common/SettingContainerSection";

export type CountriesSectionProps = {
  countries: CountryData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  activeCountry: string;
  setActiveCountry: (countryCode: string) => void;
};

export const CountriesSection = ({
  countries,
  isLoading,
  isError,
  errorMessage,
  activeCountry,
  setActiveCountry,
}: CountriesSectionProps) => {
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

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

  const handleOpenDeleteConfirm = (country: CountryData) => {
    setSelectedCountry(country);
    setIsDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setSelectedCountry(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleDeletedCountry = () => {
    if (selectedCountry?.country_code === activeCountry) {
      const nextActiveCountry = countries.find(
        (country) => country.id !== selectedCountry.id,
      );

      setActiveCountry(nextActiveCountry?.country_code ?? "");
    }

    handleCloseDeleteConfirm();
  };

  useEffect(() => {
    if (countries.length > 0 && !activeCountry) {
      setActiveCountry(countries[0].country_code);
    }
  }, [countries, activeCountry]);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (isError) {
    return (
      <ErrorMessage errorMessage={errorMessage || "Error loading countries"} />
    );
  }

  return (
    <>
      <SettingContainerSection title="Countries">
        <Button
          type="button"
          className="font-normal p-4 my-2"
          onClick={handleOpenAddCountryModal}
        >
          Add Country
        </Button>
        <div className="flex-1">
          {countries.map((country) => (
            <SettingSectionListItem
              key={country.country_code}
              label={
                getCountryInfo(country.country_code)?.name ??
                country.country_code
              }
              active={activeCountry === country.country_code}
              onClick={() => setActiveCountry(country.country_code)}
              onEdit={() => handleOpenEditCountryModal(country)}
              onDelete={() => handleOpenDeleteConfirm(country)}
            />
          ))}
        </div>
      </SettingContainerSection>

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

      <DeleteCountryModal
        open={isDeleteConfirmOpen}
        countryId={selectedCountry?.id}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseDeleteConfirm();
          }
        }}
        onDeleted={handleDeletedCountry}
      />
    </>
  );
};
