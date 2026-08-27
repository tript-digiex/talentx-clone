import type { ComponentType, LazyExoticComponent } from "react";

export type RouteElement = ComponentType | LazyExoticComponent<ComponentType>;

export type AppRouteConfig = {
  path: string;
  element: RouteElement;
};
