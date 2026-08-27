import { Route } from "react-router-dom";

import type { AppRouteConfig } from "./types";

export function renderRoute({ path, element: Element }: AppRouteConfig) {
  return <Route key={path} path={path} element={<Element />} />;
}
