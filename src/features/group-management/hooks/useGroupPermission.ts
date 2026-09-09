import { useQuery } from "@tanstack/react-query";
import { groupPermissionListApi } from "../api/group.api";
import { groupKeys } from "../types/group.constants";
import type { GroupPermissionResponse } from "../types/group.types";

export const useGroupPermission = (open: boolean) => {
  const query = useQuery<GroupPermissionResponse, Error>({
    queryKey: groupKeys.permissions(),
    queryFn: () => groupPermissionListApi(),
    enabled: open,
  });

  const response = query.data;
  const listPermissions = response?.success ? response.data : [];
  const errorMessage =
    response && !response.success ? response.error.message : query.error?.message;

  return {
    ...query,
    listPermissions,
    errorMessage,
  };
};
