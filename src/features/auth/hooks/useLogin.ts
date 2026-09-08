import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { loginApi } from "../api/auth.api";
import type { LoginResponse } from "../types/auth.types";
import { getRedirectPath } from "../utils/auth.utils";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectPath = getRedirectPath(searchParams);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response: LoginResponse) => {
      if (!response.success) {
        toast.error(response.error.message);
        return;
      }

      const session = response.data;

      setSession({
        jwtToken: session.jwt_token,
        expirationTime: session.expiration_time,
      });

      navigate(redirectPath, { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
