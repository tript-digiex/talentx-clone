import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useDeleteGroup } from "@/features/group-management/hooks/useDeleteGroup";
import { toast } from "sonner";

type DeleteGroupModalProps = {
  open: boolean;
  groupId: string | null;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

export function DeleteGroupModal({
  open,
  groupId,
  onOpenChange,
  onDeleted,
}: DeleteGroupModalProps) {
  const deleteGroupMutation = useDeleteGroup();

  const handleDeleteGroup = () => {
    if (!groupId) {
      toast.error("Group id is required");
      return;
    }

    deleteGroupMutation.mutate(groupId, {
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
      title="Remove Group"
      description="This action cannot be undone. Are you sure you want to delete this group?"
      confirmLabel="Delete"
      onOpenChange={onOpenChange}
      onConfirm={handleDeleteGroup}
      loading={deleteGroupMutation.isPending}
    />
  );
}
