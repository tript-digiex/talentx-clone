import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateGroupResponse } from "../types/group.types";
import { createGroupApi } from "../api/group.api";
import { toast } from "sonner";
import { groupKeys } from "../types/group.constants";

export const useCreateGroup = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: createGroupApi,
    onSuccess: (response: CreateGroupResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Group created successfully");
      query.invalidateQueries({
        queryKey: groupKeys.list(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
