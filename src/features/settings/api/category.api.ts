import { apiClient } from "@/lib/axios";
import type {
  CategoryPayload,
  CreateCategoryResponse,
  ListCategoryResponse,
} from "../types/category/category.types";

export const getListCategory = async (): Promise<ListCategoryResponse> => {
  const response = await apiClient.get<ListCategoryResponse>("/v1/category");
  return response.data;
};

export const createCategoryApi = async (
  payload: CategoryPayload,
): Promise<CreateCategoryResponse> => {
  const response = await apiClient.post<CreateCategoryResponse>(
    "v1/category",
    payload,
  );
  return response.data;
};
