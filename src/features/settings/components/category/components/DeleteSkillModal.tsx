import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useDeleteSkill } from "@/features/settings/hooks/category/useDeleteSkill";
import { toast } from "sonner";

type DeleteSkillModalProps = {
  open: boolean;
  skillId: string | undefined;
  categoryId: string | "";
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
};

export const DeleteSkillModal = ({
  open,
  skillId,
  categoryId,
  onOpenChange,
  onDeleted,
}: DeleteSkillModalProps) => {
  const deleteMutation = useDeleteSkill(categoryId);

  const handleDeleteCountry = () => {
    if (!skillId) {
      toast.error("Skill id is required");
      return;
    }

    if (!categoryId) {
      toast.error("Category id is required");
      return;
    }

    deleteMutation.mutate(skillId, {
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
      title="Delete skill"
      description="Are you sure you want to perform this action?"
      confirmLabel="Delete"
      onOpenChange={onOpenChange}
      onConfirm={handleDeleteCountry}
      loading={deleteMutation.isPending}
    />
  );
};
