import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../api/auth.api";
import type { ForgotPasswordResponse } from "../types/auth.types";
import { toast } from "sonner";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (response: ForgotPasswordResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
      }

      toast.success("Request Successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
