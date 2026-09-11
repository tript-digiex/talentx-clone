import { apiClient } from "@/lib/axios";
import type { ListCategoryResponse } from "../types/category/category.types";

export const getListCategory = async (): Promise<ListCategoryResponse> => {
  const response =
    await apiClient.get<ListCategoryResponse>("/v1/category");
  return response.data;
};
