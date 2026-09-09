import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroupApi } from "../api/group.api";
import type { DeleteGroupResponse } from "../types/group.types";
import { toast } from "sonner";
import { groupKeys } from "../types/group.constants";

export const useDeleteGroup = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: deleteGroupApi,
    onSuccess: (response: DeleteGroupResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Group deleted successfully");
      query.invalidateQueries({
        queryKey: groupKeys.list(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
