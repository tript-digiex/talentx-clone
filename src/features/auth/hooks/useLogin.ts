import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginApi } from "../api/auth.api";
import { getRedirectPath } from "../utils/auth.utils";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectPath = getRedirectPath(searchParams);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (session) => {
      setSession({
        jwtToken: session.jwt_token,
        expirationTime: session.expiration_time,
      });

      navigate(redirectPath, { replace: true });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
