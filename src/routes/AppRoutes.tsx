import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PUBLIC_ROUTES, SIDEBARRED_ROUTES } from "@/routes/route-config";
import { renderRoute } from "@/routes/render-route";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import PublicLayout from "@/components/layout/PublicLayout";

export function AppRoutes() {
  return (
    <Suspense fallback={<SpinnerLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          {PUBLIC_ROUTES.map(renderRoute)}
        </Route>
        <Route path="/" element={<Navigate to="/talents" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            {SIDEBARRED_ROUTES.map(renderRoute)}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/talents" replace />} />
      </Routes>
    </Suspense>
  );
}
