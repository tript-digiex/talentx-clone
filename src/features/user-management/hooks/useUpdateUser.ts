import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserApi } from "../api/user.api";
import {
  userKeys,
  type UpdateUserPayload,
  type UpdateUserResponse,
} from "../types/user.types";

type UpdateUserVariables = {
  userId: string;
  data: UpdateUserPayload;
};

export const useUpdateUser = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: UpdateUserVariables) =>
      updateUserApi(userId, data),
    onSuccess: (response: UpdateUserResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("User updated successfully");
      query.invalidateQueries({
        queryKey: userKeys.list(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
