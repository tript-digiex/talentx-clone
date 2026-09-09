import { useQuery } from "@tanstack/react-query";
import { groupManagementListApi } from "../api/group.api";
import {
  DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE,
  groupKeys,
} from "../types/group.constants";
import type { GroupManagementListPagination } from "../types/group.types";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";

export const useGroupManagementList = (
  pageNumber: number = DEFAULT_PAGE_NUMBER,
  pageSize: number = DEFAULT_GROUP_MANAGEMENT_PAGE_SIZE,
) => {
  const query = useQuery({
    queryKey: groupKeys.list(pageNumber, pageSize),
    queryFn: () => groupManagementListApi(pageNumber, pageSize),
  });

  const response = query.data;
  const listData = response?.success ? response.data : null;
  const groups = listData?.content ?? [];
  const pagination: GroupManagementListPagination = listData
    ? {
        total_elements: listData.total_elements,
        number_of_elements: listData.number_of_elements,
        page_size: listData.page_size,
        page_number: listData.page_number,
        total_pages: listData.total_pages,
      }
    : null;
  const errorMessage =
    response && !response.success
      ? response.error.message
      : query.error?.message;

  return {
    ...query,
    groups,
    pagination,
    errorMessage,
  };
};
