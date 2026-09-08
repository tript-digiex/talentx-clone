import type { ApiListData } from "@/lib/axios";
import type { GROUP_STATUS, GROUP_TYPES } from "./group.constants";

export type GroupItemResponse = {
  id: string;
  name: string;
  status: GROUP_STATUS;
  type: GROUP_TYPES;
  description: string;
  created_date: Date;
  user_group_count: number;
};

export type GroupManagementListPagination = Omit<
  ApiListData<GroupItemResponse>,
  "content"
> | null;
