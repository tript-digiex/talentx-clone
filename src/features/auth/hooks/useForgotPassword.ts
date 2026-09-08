import { useMutation } from "@tanstack/react-query";
import React from "react";
import { forgotPasswordApi } from "../api/auth.api";
import { toast } from "sonner";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {},
    onError: (error) => {
        toast.error(error.message)
    },
  });
};
