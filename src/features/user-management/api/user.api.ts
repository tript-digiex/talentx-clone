import { apiClient } from "@/lib/axios";
import type { UserListResponse } from "../types/user.types";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import { DEFAULT_USER_MANAGEMENT_PAGE_SIZE } from "../types/user.constants";

export const getListUserApi = async (
  pageNumber: number = DEFAULT_PAGE_NUMBER,
  pageSize: number = DEFAULT_USER_MANAGEMENT_PAGE_SIZE,
): Promise<UserListResponse> => {
  const response = await apiClient.get<UserListResponse>("/v1/users/member", {
    params: {
      page_number: pageNumber,
      page_size: pageSize,
    },
  });
  return response.data;
};
