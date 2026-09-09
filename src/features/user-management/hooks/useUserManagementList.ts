import { useQuery } from "@tanstack/react-query";
import {
  userKeys,
  type UserManagementListPagination,
} from "../types/user.types";
import { DEFAULT_PAGE_NUMBER } from "@/constants/pagination.constants";
import { DEFAULT_USER_MANAGEMENT_PAGE_SIZE } from "../types/user.constants";
import { getListUserApi } from "../api/user.api";

export const useUserManagementList = (
  pageNumber: number = DEFAULT_PAGE_NUMBER,
  pageSize: number = DEFAULT_USER_MANAGEMENT_PAGE_SIZE,
) => {
  const query = useQuery({
    queryKey: userKeys.list(pageNumber, pageSize),
    queryFn: () => getListUserApi(pageNumber, pageSize),
  });

  const response = query.data;
  const listData = response?.success ? response.data : null;
  const users = listData?.content ?? [];
  const pagination: UserManagementListPagination = listData
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
    users,
    pagination,
    errorMessage,
  };
};
