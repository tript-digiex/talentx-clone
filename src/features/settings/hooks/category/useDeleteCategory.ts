import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCategoryApi } from "../../api/category.api";
import { categoryKeys } from "../../types/category/category.constants";

export const useDeleteCategory = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Category deleted successfully");
      query.invalidateQueries({
        queryKey: categoryKeys.list,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
