import { useHolidaysByCountry } from "../../hooks/holidays/useHolidaysByCountry";
import { formatHoliday } from "../../utils/holiday.utils";
import { SectionListItem } from "./components/SectionListItem";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import Button from "@/components/ui/custom/Button";
import { useState } from "react";
import { MODAL_MODE } from "@/constants/modal.constants";

type HolidaysSectionProps = {
  countryHolidayId: string;
};

export const HolidaysSection = ({ countryHolidayId }: HolidaysSectionProps) => {
  const { holidays, isLoading, isError, errorMessage } =
    useHolidaysByCountry(countryHolidayId);
  // const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null)

  // const handleOpenAddHolidayModal = () => {
  //   setModalMode(MODAL_MODE.ADD);
  // }

  if (!countryHolidayId) {
    return (
      <div className="py-3 text-sm text-muted-foreground">
        Select a country to view holidays
      </div>
    );
  }

  if (countryHolidayId && isLoading) {
    return <SpinnerLoader />;
  }

  if (countryHolidayId && isError) {
    return (
      <ErrorMessage errorMessage={errorMessage || "Error loading holidays"} />
    );
  }

  return (
    <div className="flex-1 border rounded-md">
      <div className="font-bold border-b px-4 py-2">Holidays</div>
      <div className="px-4 p-2">
        <Button
          type="button"
          className="font-normal p-4 my-2"
          // onClick={handleOpenAddCountryModal}
        >
          Add Holiday
        </Button>
        {countryHolidayId && !isLoading && !isError && holidays.length > 0 ? (
          <div className="flex-1">
            {holidays.map((holiday) => (
              <SectionListItem
                key={holiday.id}
                label={formatHoliday(
                  holiday.date || holiday.holiday_date,
                  holiday.description,
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
