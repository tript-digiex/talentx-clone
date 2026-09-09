import { groupKeys } from "@/features/group-management/types/group.constants";
import { useQuery } from "@tanstack/react-query";
import { getGroupMemberListApi } from "../api/user.api";

export const useGetGroupMember = (enabled: boolean) => {
  const query = useQuery({
    queryKey: groupKeys.groups(),
    queryFn: () => getGroupMemberListApi(),
    enabled: enabled,
  });

  const response = query.data;
  const groupMembers = response?.success ? response.data : [];
  const errorMessage =
    response && !response.success
      ? response.error.message
      : query.error?.message;

  return {
    ...query,
    groupMembers,
    errorMessage,
  };
};
