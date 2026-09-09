import { ConfirmModal } from "@/components/common/ConfirmModal";
import { toast } from "sonner";
import { useDeleteUser } from "../hooks/useDeleteUser";

type DeleteUserModalProps = {
  open: boolean;
  userId: string | null;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

export const DeleteUserModal = ({
  open,
  userId,
  onOpenChange,
  onDeleted,
}: DeleteUserModalProps) => {
  const deleteGroupMutation = useDeleteUser();

  const handleDeleteGroup = () => {
    if (!userId) {
      toast.error("User id is required");
      return;
    }

    deleteGroupMutation.mutate(userId, {
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
      title="Remove User"
      description="Are you sure you want to remove this user? This action cannot be undone."
      confirmLabel="Delete"
      onOpenChange={onOpenChange}
      onConfirm={handleDeleteGroup}
      loading={deleteGroupMutation.isPending}
    />
  );
};
