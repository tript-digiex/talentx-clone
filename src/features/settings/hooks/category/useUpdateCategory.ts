import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryPayload, UpdateCategoryResponse } from "../../types/category/category.types";
import { updateCategoryApi } from "../../api/category.api";
import { toast } from "sonner";
import { categoryKeys } from "../../types/category/category.constants";

type UpdateCategoryVariables = {
  categoryId: string;
  payload: CategoryPayload;
};

export const useUpdateCategory = () => {
    const query = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, payload }: UpdateCategoryVariables) => (
         updateCategoryApi(categoryId, payload)
    ),
     onSuccess: (response: UpdateCategoryResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Category updated successfully");
      query.invalidateQueries({
        queryKey: categoryKeys.list
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
