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

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data]);

  const fullName = [query.data?.first_name, query.data?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName = fullName || query.data?.email || "User";

  return {
    ...query,
    user: query.data,
    displayName
  };
};
