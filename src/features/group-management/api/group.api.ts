import { apiClient, type ApiListResponse } from "@/lib/axios";
import { DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE, GROUP_STATUS, GROUP_TYPES } from "../types/group.constants";
import type { GroupItemResponse } from "../types/group.types";

export const groupManagementListApi = async (
  pageNumber: number,
  pageSize: number = DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE,
): Promise<ApiListResponse<GroupItemResponse>> => {
  const payload = {
    type: GROUP_TYPES.ADMIN_MEMBER,
    page_number: pageNumber,
    page_size: pageSize,
    status: GROUP_STATUS.ACTIVE,
  };

  const response = await apiClient.get<ApiListResponse<GroupItemResponse>>(
    "/v1/group-member/page",
    {
      params: payload,
    },
  );

  return response.data;
};
