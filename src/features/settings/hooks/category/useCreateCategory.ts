import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi } from "../../api/category.api";
import type { CreateCategoryResponse } from "../../types/category/category.types";
import { toast } from "sonner";
import { categoryKeys } from "../../types/category/category.constants";

export const useCreateCategory = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: (response: CreateCategoryResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Category created successfully");
      query.invalidateQueries({
        queryKey: categoryKeys.list,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
