import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSkillApi } from "../../api/category.api";
import { toast } from "sonner";
import { categoryKeys } from "../../types/category/category.constants";

export const useDeleteSkill = (categoryId: string) => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: deleteSkillApi,
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Skill deleted successfully");
      query.invalidateQueries({
        queryKey: categoryKeys.skills(categoryId),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
