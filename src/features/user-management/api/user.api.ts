import { apiClient } from "@/lib/axios";
import type {
  CreateUserPayload,
  GROUP_MEMBER_RESPONSE,
  UserListResponse,
  UserResponse,
} from "../types/user.types";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import {
  DEFAULT_USER_MANAGEMENT_PAGE_SIZE,
  USER_ROLES,
} from "../types/user.constants";
import {
  GROUP_STATUS,
  GROUP_TYPES,
} from "@/features/group-management/types/group.constants";

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

export const getGroupMemberListApi =
  async (): Promise<GROUP_MEMBER_RESPONSE> => {
    const response = await apiClient.get("/v1/group-member", {
      params: {
        type: GROUP_TYPES.ADMIN_MEMBER,
        status: GROUP_STATUS.ACTIVE,
      },
    });

    return response.data;
  };

export const inviteUserApi = async ({
  group_member_id,
  ...input
}: CreateUserPayload): Promise<UserResponse> => {
  const payload = {
    ...input,
    ...(input.role === USER_ROLES.ADMIN_MEMBER ? { group_member_id } : {}),
  };

  const response = await apiClient.post<UserResponse>(
    "/v1/users/member",
    payload,
  );
  return response.data;
};
