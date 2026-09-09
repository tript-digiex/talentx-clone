import { useQuery } from "@tanstack/react-query";
import { getUserDetailApi } from "../api/user.api";
import { userKeys } from "../types/user.types";

export const useGetUserDetail = (userId: string | null, enabled: boolean) => {
  const query = useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => {
      if (!userId) {
        throw new Error("User id is required");
      }

      return getUserDetailApi(userId);
    },
    enabled: enabled && !!userId,
  });

  const response = query.data;
  const userDetail = response?.success ? response.data : null;
  const errorMessage =
    response && !response.success
      ? response.error.message
      : query.error?.message;

  return {
    ...query,
    userDetail,
    errorMessage,
  };
};
