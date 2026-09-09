import type { ApiListData } from "@/lib/axios";
import type { ApiResponse } from "@/lib/axios";
import type { GROUP_STATUS, GROUP_TYPES } from "./group.constants";
import type { createGroupSchema } from "../schemas/group.schema";
import type z from "zod";

export type GroupPermissionListResponse = {
  name: string;
  permissions: string[];
};

export type GroupItemResponse = {
  id: string;
  name: string;
  status: GROUP_STATUS;
  type: GROUP_TYPES;
  description: string;
  created_date: Date;
  user_group_count: number;
};

export type GroupItemDetailResponse = GroupItemResponse & {
  module_access?: GroupPermissionListResponse[];
};

export type GroupManagementListPagination = Omit<
  ApiListData<GroupItemResponse>,
  "content"
> | null;

export type GroupPermissionResponse = ApiResponse<
  GroupPermissionListResponse[]
>;

export type CreateGroupPayload = z.infer<typeof createGroupSchema>;
export type UpdateGroupPayload = z.infer<typeof createGroupSchema>;

export type CreateGroupResponse = ApiResponse<GroupItemDetailResponse>;
export type GroupDetailResponse = ApiResponse<GroupItemDetailResponse>;

export type UpdateGroupResponse = ApiResponse<
  Omit<GroupItemDetailResponse, "created_date" | "user_group_count">
>;

export type DeleteGroupResponse = ApiResponse<string>;