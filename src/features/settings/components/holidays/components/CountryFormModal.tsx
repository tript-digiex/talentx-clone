import { CommonModal } from "@/components/common/CommonModal";
import Button from "@/components/ui/custom/Button";
import Select from "@/components/ui/custom/Select";
import type { MODAL_MODE } from "@/constants/modal.constants";
import { useCreateCountryHoliday } from "@/features/settings/hooks/holidays/useCreateCountryHoliday";
import { createCountryHolidaySchema } from "@/features/settings/schemas/holidays.schemas";
import {
  COUNTRY_FLAG_MAP,
  COUNTRY_MODAL_MODE_CONFIG,
  DEFAULT_CREATE_HOLIDAY_FORM_VALUES,
} from "@/features/settings/types/holidays/holidays.constants";
import type {
  CountryData,
  CreateCountryHolidayPayload,
} from "@/features/settings/types/holidays/holidays.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type CountryFormModalProps = {
  open: boolean;
  mode: MODAL_MODE | null;
  countryCode: string | null;
  countries: CountryData[];
  onOpenChange: (open: boolean) => void;
  setActiveCountry: (countryCode: string) => void;
};

export const CountryFormModal = ({
  open,
  mode,
  countryCode,
  countries,
  onOpenChange,
  setActiveCountry,
}: CountryFormModalProps) => {
  const createCountryHolidayMutation = useCreateCountryHoliday();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: createCountryError },
  } = useForm<CreateCountryHolidayPayload>({
    resolver: zodResolver(createCountryHolidaySchema),
    defaultValues: DEFAULT_CREATE_HOLIDAY_FORM_VALUES,
    mode: "onSubmit",
  });

  const handleCloseModal = () => {
    onOpenChange(false);
    reset(DEFAULT_CREATE_HOLIDAY_FORM_VALUES);
  };

  const handleSubmitCountry = (data: CreateCountryHolidayPayload) => {
    createCountryHolidayMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          handleCloseModal();
          setActiveCountry(data.country_code);
        }
      },
    });
  };

  const countryOptions = useMemo(() => {
    const existingCountryCodes = new Set(
      countries.map((country) => country.country_code.toUpperCase()),
    );

    return Object.entries(COUNTRY_FLAG_MAP)
      .filter(
        ([optionCountryCode]) =>
          optionCountryCode === countryCode ||
          !existingCountryCodes.has(optionCountryCode),
      )
      .map(([optionCountryCode, countryInfo]) => ({
        value: optionCountryCode,
        label: countryInfo.name,
        icon: (
          <img
            src={countryInfo.img}
            className="size-4 rounded-full object-cover"
          />
        ),
      }));
  }, [countries, countryCode]);

  useEffect(() => {
    if (!open) {
      return;
    }

    reset({
      country_code: countryCode ?? "",
    });
  }, [countryCode, open, reset]);

  if (!mode) {
    return null;
  }

  const modalConfig = COUNTRY_MODAL_MODE_CONFIG[mode];

  return (
    <CommonModal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCloseModal();
        }
      }}
      title={modalConfig.title}
      bodyClassName="space-y-5"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={handleCloseModal}
            size="sm"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            loading={createCountryHolidayMutation.isPending}
            onClick={handleSubmit(handleSubmitCountry, (errors) => {
              const firstError = Object.values(errors)[0]?.message;

              if (firstError) {
                toast.error(firstError);
              }
            })}
          >
            {modalConfig.submitButton}
          </Button>
        </>
      }
    >
      <Controller
        control={control}
        name="country_code"
        render={({ field }) => (
          <Select
            name={field.name}
            label="Select Country"
            required
            placeholder="Countries"
            options={countryOptions}
            value={field.value}
            error={!!createCountryError.country_code}
            helperText={createCountryError.country_code?.message}
            emptyMessage="No countries available"
            searchable
            searchPlaceholder="Search"
            maxVisibleItems={5}
            onBlur={field.onBlur}
            onValueChange={field.onChange}
          />
        )}
      />
    </CommonModal>
  );
};
