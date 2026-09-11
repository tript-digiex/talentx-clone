import { CommonModal } from "@/components/common/CommonModal";
import Button from "@/components/ui/custom/Button";
import DateSelect, {
  toDateSelectValue,
} from "@/components/ui/custom/DateSelect";
import Input from "@/components/ui/custom/Input";
import type { MODAL_MODE } from "@/constants/modal.constants";
import { useCreateHoliday } from "@/features/settings/hooks/holidays/useCreateHoliday";
import { createHolidaySchema } from "@/features/settings/schemas/holidays.schemas";
import {
  DEFAULT_CREATE_HOLIDAY_FORM_VALUES,
  HOLIDAY_MODAL_MODE_CONFIG,
} from "@/features/settings/types/holidays/holidays.constants";
import type {
  CreateHolidayPayload,
  HolidayData,
} from "@/features/settings/types/holidays/holidays.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type HolidayFormModalProps = {
  countryHolidayId: string;
  open: boolean;
  mode: MODAL_MODE | null;
  holiday: HolidayData | null;
  onOpenChange: (open: boolean) => void;
};

export const HolidayFormModal = ({
  countryHolidayId,
  open,
  mode,
  holiday,
  onOpenChange,
}: HolidayFormModalProps) => {
  const createHolidayMutation = useCreateHoliday();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors: createHolidayErrors },
  } = useForm<CreateHolidayPayload>({
    resolver: zodResolver(createHolidaySchema),
    defaultValues: DEFAULT_CREATE_HOLIDAY_FORM_VALUES,
    mode: "onSubmit",
  });

  const handleCloseModal = () => {
    onOpenChange(false);
    reset(DEFAULT_CREATE_HOLIDAY_FORM_VALUES);
  };

  const handleSubmitHoliday = (data: CreateHolidayPayload) => {
    createHolidayMutation.mutate(
      {
        ...data,
        country_holiday_id: countryHolidayId,
      },
      {
        onSuccess: (response) => {
          if (response.success) {
            handleCloseModal();
          }
        },
      },
    );
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    reset({
      country_holiday_id: countryHolidayId,
      holiday_date: toDateSelectValue(holiday?.holiday_date),
      description: holiday?.description ?? "",
    });
  }, [countryHolidayId, holiday, open, reset]);

  if (!mode) {
    return null;
  }

  const modalConfig = HOLIDAY_MODAL_MODE_CONFIG[mode];

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
            loading={createHolidayMutation.isPending}
            onClick={handleSubmit(handleSubmitHoliday, (errors) => {
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
        name="holiday_date"
        render={({ field }) => (
          <DateSelect
            name={field.name}
            label="Select Date"
            required
            value={field.value ?? ""}
            error={!!createHolidayErrors.holiday_date}
            helperText={createHolidayErrors.holiday_date?.message}
            onBlur={field.onBlur}
            onValueChange={field.onChange}
          />
        )}
      />

      <Input
        {...register("description")}
        label="Description"
        required
        type="text"
        placeholder="Holiday description"
        error={!!createHolidayErrors.description}
        helperText={createHolidayErrors.description?.message}
      />
    </CommonModal>
  );
};
