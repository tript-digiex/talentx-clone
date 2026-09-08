import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getAuthInfoApi } from "../api/auth.api";
import { authKeys } from "../types/auth.constants";
import { hasValidAuthSession } from "../utils/auth.utils";

export const useAuthInfo = (enabled = true) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const hasValidSession = isAuthenticated && hasValidAuthSession();

  const query = useQuery({
    queryKey: authKeys.info(),
    queryFn: getAuthInfoApi,
    enabled: enabled && hasValidSession,
    retry: false,
  });

  const user = query.data?.success ? query.data.data : null;

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  const displayName = fullName || user?.email || "User";

  return {
    ...query,
    user,
    displayName,
  };
};
