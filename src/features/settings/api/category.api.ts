import { apiClient } from "@/lib/axios";
import type {
  CategoryPayload,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  ListCategoryResponse,
  ListSkillResponse,
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

export const getSkillsByCategoryId = async (
  categoryId: string,
): Promise<ListSkillResponse> => {
  const response = await apiClient.get<ListSkillResponse>(
    `/v1/skill/category/${categoryId}/all`,
  );
  return response.data;
};

export const createSkillApi = async (
  payload: FormData,
): Promise<CreateCategoryResponse> => {
  const response = await apiClient.post<CreateCategoryResponse>(
    "/v1/skill",
    payload,
  );
  return response.data;
};

export const deleteSkillApi = async (skillId: string) => {
  const response = await apiClient.delete(`/v1/skill/${skillId}`);
  return response.data;
};
