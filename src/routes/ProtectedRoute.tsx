import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { hasValidAuthSession } from "@/features/auth/utils/auth.utils";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearSession = useAuthStore((state) => state.clearSession);
  const location = useLocation();

  const hasValidSession = isAuthenticated && hasValidAuthSession();

  useEffect(() => {
    if (!hasValidSession) {
      clearSession();
    }
  }, [clearSession, hasValidSession]);

  if (!hasValidSession) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(
          `${location.pathname}${location.search}`,
        )}`}
        replace
      />
    );
  }

  return <Outlet />;
}
