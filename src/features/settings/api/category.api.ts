import { apiClient } from "@/lib/axios";
import type {
  CategoryPayload,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  ListCategoryResponse,
  UpdateCategoryResponse,
} from "../types/category/category.types";

export const getListCategory = async (): Promise<ListCategoryResponse> => {
  const response = await apiClient.get<ListCategoryResponse>("/v1/category");
  return response.data;
};

export const createCategoryApi = async (
  payload: CategoryPayload,
): Promise<CreateCategoryResponse> => {
  const response = await apiClient.post<CreateCategoryResponse>(
    "/v1/category",
    payload,
  );
  return response.data;
};

export const updateCategoryApi = async (
  categoryId: string,
  payload: CategoryPayload,
): Promise<UpdateCategoryResponse> => {
  const response = await apiClient.put<UpdateCategoryResponse>(
    `/v1/category/${categoryId}`,
    payload,
  );
  return response.data;
};

export const deleteCategoryApi = async (
  categoryId: string,
): Promise<DeleteCategoryResponse> => {
  const response = await apiClient.delete<DeleteCategoryResponse>(
    `/v1/category/${categoryId}`,
  );
  return response.data;
};
