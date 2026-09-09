import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../api/user.api";
import { userKeys, type DeleteUserResponse } from "../types/user.types";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: (response: DeleteUserResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("User deleted successfully");
      query.invalidateQueries({
        queryKey: userKeys.list(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};