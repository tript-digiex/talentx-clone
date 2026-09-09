import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  UpdateGroupPayload,
  UpdateGroupResponse,
} from "../types/group.types";
import { groupKeys } from "../types/group.constants";
import { updateGroupApi } from "../api/group.api";

type UpdateGroupVariables = {
  groupId: string;
  data: UpdateGroupPayload;
};

export const useUpdateGroup = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, data }: UpdateGroupVariables) =>
      updateGroupApi(groupId, data),
    onSuccess: (response: UpdateGroupResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Group updated successfully");
      query.invalidateQueries({
        queryKey: groupKeys.all,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
