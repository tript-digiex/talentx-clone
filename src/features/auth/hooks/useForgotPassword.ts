import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../api/auth.api";
import type { ForgotPasswordResponse } from "../types/auth.types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (response: ForgotPasswordResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      toast.success("Request Successfully");
      navigate("/forgotPasswordCompleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
