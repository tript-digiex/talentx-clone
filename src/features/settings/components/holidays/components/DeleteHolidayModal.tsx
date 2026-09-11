import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useDeleteHoliday } from "@/features/settings/hooks/holidays/useDeleteHoliday";
import { toast } from "sonner";

type DeleteHolidayModalProps = {
  open: boolean;
  holidayId: string | undefined;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

export const DeleteHolidayModal = ({
  open,
  holidayId,
  onOpenChange,
  onDeleted,
}: DeleteHolidayModalProps) => {
  const deleteMutation = useDeleteHoliday();

  const handleDeleteCountry = () => {
    if (!holidayId) {
      toast.error("Holiday id is required");
      return;
    }

    deleteMutation.mutate(holidayId, {
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
      title="Delete Holiday"
      description="Are you sure you want to delete this holiday?"
      confirmLabel="Delete"
      onOpenChange={onOpenChange}
      onConfirm={handleDeleteCountry}
      loading={deleteMutation.isPending}
    />
  );
};
