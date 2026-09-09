import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import {
  DEFAULT_USER_MANAGEMENT_PAGE_SIZE,
  type USER_ROLES,
  type USER_STATUS,
} from "./user.constants";
import type { ApiListData, ApiListResponse, ApiResponse } from "@/lib/axios";
import type {
  GROUP_STATUS,
  GROUP_TYPES,
} from "@/features/group-management/types/group.constants";
import type { createUserSchema } from "../schemas/user.schemas";
import type z from "zod";

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
  detail: (userId: string | null) =>
    [...userKeys.all, "detail", userId] as const,
};

export type UserListResponse = ApiListResponse<UserItemResponse>;

export type UserManagementListPagination = Omit<
  ApiListData<UserItemResponse>,
  "content"
> | null;

export type GROUP_MEMBER_LIST_DATA = {
  id: string;
  name: string;
  status: GROUP_STATUS;
  type: GROUP_TYPES;
  created_date: Date;
};

export type UserDetailResponseData = UserItemResponse & {
  group_member?: GROUP_MEMBER_LIST_DATA | null;
};

export type GROUP_MEMBER_RESPONSE = ApiResponse<GROUP_MEMBER_LIST_DATA[]>;

export type CreateUserPayload = z.infer<typeof createUserSchema>;

export type UpdateUserPayload = CreateUserPayload;

export type UserResponse = ApiResponse<UserItemResponse>;

export type UserDetailResponse = ApiResponse<UserDetailResponseData>;

export type UpdateUserResponse = ApiResponse<
  Omit<UserItemResponse, "user_code"> & {
    group_member_id?: string;
  }
>;

export type DeleteUserResponse = ApiResponse<undefined>;