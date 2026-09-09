import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteUserApi } from "../api/user.api";
import { userKeys, type UserResponse } from "../types/user.types";
import { toast } from "sonner";

export const useCreateUser = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: inviteUserApi,
    onSuccess: (response: UserResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("User invited successfully");
      query.invalidateQueries({
        queryKey: userKeys.list(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
