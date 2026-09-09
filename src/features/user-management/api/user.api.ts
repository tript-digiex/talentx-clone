import { apiClient } from "@/lib/axios";
import type {
  GROUP_MEMBER_RESPONSE,
  UserListResponse,
} from "../types/user.types";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import { DEFAULT_USER_MANAGEMENT_PAGE_SIZE } from "../types/user.constants";
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
    const payload = {
      type: GROUP_TYPES.ADMIN_MEMBER,
      status: GROUP_STATUS.ACTIVE,
    };

    const response = await apiClient.get("/v1/group-member", {
      params: {
        payload,
      },
    });

    return response.data;
  };
