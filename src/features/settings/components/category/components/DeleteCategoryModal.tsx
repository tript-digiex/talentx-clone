import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useDeleteCategory } from "@/features/settings/hooks/category/useDeleteCategory";
import { toast } from "sonner";

type DeleteCategoryModalProps = {
  open: boolean;
  categoryId: string | undefined;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

export const DeleteCategoryModal = ({
  open,
  categoryId,
  onOpenChange,
  onDeleted,
}: DeleteCategoryModalProps) => {
  const deleteCategoryMutation = useDeleteCategory();

  const handleDeleteCountry = () => {
    if (!categoryId) {
      toast.error("Category id is required");
      return;
    }

    deleteCategoryMutation.mutate(categoryId, {
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
      title="Delete Category"
      description="Are you sure you want to perform this action?"
      confirmLabel="Delete"
      onOpenChange={onOpenChange}
      onConfirm={handleDeleteCountry}
      loading={deleteCategoryMutation.isPending}
    />
  );
};
