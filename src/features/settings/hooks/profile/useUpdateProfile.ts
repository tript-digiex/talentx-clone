import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileApi } from "../../api/profile.api";
import { authKeys } from "@/features/auth/types/auth.constants";
import type { UserProfileResponse } from "../../types/profile.types";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: (response: UserProfileResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Profile updated successfully");
      query.invalidateQueries({
        queryKey: authKeys.info(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
