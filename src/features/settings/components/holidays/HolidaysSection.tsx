import { useHolidaysByCountry } from "../../hooks/holidays/useHolidaysByCountry";
import { formatHoliday } from "../../utils/holiday.utils";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import Button from "@/components/ui/custom/Button";
import { useState } from "react";
import { MODAL_MODE } from "@/constants/modal.constants";
import { HolidayFormModal } from "./components/HolidayFormModal";
import type { HolidayData } from "../../types/holidays/holidays.types";
import { DeleteHolidayModal } from "./components/DeleteHolidayModal";
import { SettingSectionListItem } from "@/components/common/SettingSectionListItem";
import { SettingContainerSection } from "@/components/common/SettingContainerSection";

type HolidaysSectionProps = {
  countryHolidayId: string;
};

export const HolidaysSection = ({ countryHolidayId }: HolidaysSectionProps) => {
  const { holidays, isLoading, isError, errorMessage } =
    useHolidaysByCountry(countryHolidayId);
  const [modalMode, setModalMode] = useState<MODAL_MODE | null>(null);
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayData | null>(
    null,
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleOpenAddHolidayModal = () => {
    setSelectedHoliday(null);
    setModalMode(MODAL_MODE.ADD);
  };

  const handleOpenEditHolidayModal = (holiday: HolidayData) => {
    setSelectedHoliday(holiday);
    setModalMode(MODAL_MODE.EDIT);
  };

  const handleOpenDeleteConfirm = (holiday: HolidayData) => {
    setSelectedHoliday(holiday);
    setIsDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setSelectedHoliday(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleCloseHolidayModal = () => {
    setModalMode(null);
  };

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
    <>
      <SettingContainerSection title="Holidays">
          <Button
            type="button"
            className="font-normal p-4 my-2"
            onClick={handleOpenAddHolidayModal}
          >
            Add Holiday
          </Button>
          {countryHolidayId && !isLoading && !isError && holidays.length > 0 ? (
            <div className="flex-1">
              {holidays.map((holiday) => (
                <SettingSectionListItem
                  key={holiday.id}
                  label={formatHoliday(
                    holiday.holiday_date,
                    holiday.description,
                  )}
                  onEdit={() => handleOpenEditHolidayModal(holiday)}
                  onDelete={() => handleOpenDeleteConfirm(holiday)}
                />
              ))}
            </div>
          ) : null}
      </SettingContainerSection>

      <HolidayFormModal
        countryHolidayId={countryHolidayId}
        open={modalMode !== null}
        mode={modalMode}
        holiday={selectedHoliday}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseHolidayModal();
          }
        }}
      />

      <DeleteHolidayModal
        open={isDeleteConfirmOpen}
        holidayId={selectedHoliday?.id}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseDeleteConfirm();
          }
        }}
        onDeleted={() => handleCloseDeleteConfirm()}
      />
    </>
  );
};
