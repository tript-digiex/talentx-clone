import { apiClient, type ApiListResponse } from "@/lib/axios";
import {
  DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE,
  GROUP_STATUS,
  GROUP_TYPES,
} from "../types/group.constants";
import type {
  CreateGroupPayload,
  CreateGroupResponse,
  GroupItemResponse,
  GroupPermissionResponse,
} from "../types/group.types";

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

export const groupPermissionListApi =
  async (): Promise<GroupPermissionResponse> => {
    const response = await apiClient.get<GroupPermissionResponse>(
      "/v1/group-member/default",
      {
        params: {
          user_role: GROUP_TYPES.ADMIN_MEMBER,
        },
      },
    );

    return response.data;
  };

export const createGroupApi = async (data: CreateGroupPayload): Promise<CreateGroupResponse> => {
  const payload = {
    ...data,
    type: GROUP_TYPES.ADMIN_MEMBER,
  }

  const response = await apiClient.post<CreateGroupResponse>(
    "/v1/group-member",
    payload,
  );
  
  return response.data;
}
