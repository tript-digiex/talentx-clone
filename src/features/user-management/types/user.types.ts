import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import {
  DEFAULT_USER_MANAGEMENT_PAGE_SIZE,
  type USER_ROLES,
  type USER_STATUS,
} from "./user.constants";
import type { ApiListData, ApiListResponse, ApiResponse } from "@/lib/axios";

export type UserItemResponse = {
  id: string;
  user_code: string;
  first_name: string;
  last_name: string;
  email: string;
  role: USER_ROLES;
  status: USER_STATUS;
  name_avatar: string;
  created_date: Date;
};

export const userKeys = {
  all: ["user-management"] as const,
  list: (
    pageNumber: number = DEFAULT_PAGE_NUMBER,
    pageSize: number = DEFAULT_USER_MANAGEMENT_PAGE_SIZE,
  ) => [...userKeys.all, "list", { pageNumber, pageSize }] as const,
};

export type UserListResponse = ApiListResponse<UserItemResponse>;

export type UserManagementListPagination = Omit<
  ApiListData<UserItemResponse>,
  "content"
> | null;
