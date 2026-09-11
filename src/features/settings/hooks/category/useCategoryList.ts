import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "../../types/category/category.constants";
import { getListCategory } from "../../api/category.api";

export const useCategoryList = () => {
  const query = useQuery({
    queryKey: categoryKeys.list,
    queryFn: getListCategory,
  });

  const response = query.data;
  const categories = response?.success ? response.data : [];
  const errorMessage =
    response && !response.success
      ? response?.error?.message
      : query.error?.message;

  return {
    ...query,
    categories,
    errorMessage,
  };
};
