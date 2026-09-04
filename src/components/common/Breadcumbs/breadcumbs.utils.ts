import { routeLabels } from "./breadcumbs.constants";
import type { BreadcrumbItem } from "./breadcumbs.types";

export function toTitleCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    return {
      label: routeLabels[segment] ?? toTitleCase(segment),
      href,
    };
  });
}
