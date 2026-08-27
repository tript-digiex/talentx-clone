import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PUBLIC_ROUTES, SIDEBARRED_ROUTES } from "@/routes/route-config";
import { renderRoute } from "@/routes/render-route";
import { AppLayout } from "@/layouts/AppLayout";
import { SpinnerLoader } from "@/components/ui/custom/SpinnerLoader";

export function AppRoutes() {
  return (
    <Suspense fallback={<SpinnerLoader />}>
      <Routes>
        <Route>{PUBLIC_ROUTES.map(renderRoute)}</Route>
        <Route path="/" element={<Navigate to="/talents" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {SIDEBARRED_ROUTES.map(renderRoute)}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/talents" replace />} />
      </Routes>
    </Suspense>
  );
}
