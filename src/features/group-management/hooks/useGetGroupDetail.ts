import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "../types/group.constants";
import { getGroupDetailApi } from "../api/group.api";
import type { GroupDetailResponse } from "../types/group.types";

export const useGetGroupDetail = (groupId: string | null, enabled: boolean) => {
  const query = useQuery<GroupDetailResponse, Error>({
    queryKey: groupKeys.detail(groupId),
    queryFn: () => {
      if (!groupId) {
        throw new Error("Group id is required");
      }

      return getGroupDetailApi(groupId);
    },
    enabled: enabled && !!groupId,
  });

  const response = query.data;
  const groupDetail = response?.success ? response.data : null;
  const errorMessage =
    response && !response.success
      ? response.error.message
      : query.error?.message;

  return {
    ...query,
    groupDetail,
    errorMessage,
  };
};
