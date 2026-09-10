import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useDeleteCountryHoliday } from "@/features/settings/hooks/holidays/useDeleteCountryHoliday";
import { toast } from "sonner";

type DeleteCountryModalProps = {
  open: boolean;
  countryId: string | undefined;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

export const DeleteCountryModal = ({
  open,
  countryId,
  onOpenChange,
  onDeleted,
}: DeleteCountryModalProps) => {
  const deleteCountryMutation = useDeleteCountryHoliday();

  const handleDeleteCountry = () => {
    if (!countryId) {
      toast.error("Country id is required");
      return;
    }

    deleteCountryMutation.mutate(countryId, {
      onSuccess: (response) => {
        if (response.success) {
          onDeleted();
        }
      },
    });
  };

  return (
    <ConfirmModal
      open={open}
      title="Delete Country Holiday"
      description="Are you sure you want to delete this country's holidays?"
      confirmLabel="Delete"
      onOpenChange={onOpenChange}
      onConfirm={handleDeleteCountry}
      loading={deleteCountryMutation.isPending}
    />
  );
};
