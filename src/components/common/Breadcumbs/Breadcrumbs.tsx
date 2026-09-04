import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { getBreadcrumbItems } from "./breadcumbs.utils";



export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbItems(pathname);
  const showCurrentPill = breadcrumbs.length > 1;

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-3 text-base pb-4">
      <Link
        to="/dashboard"
        className="inline-flex size-5 shrink-0 items-center justify-center text-[#667085] transition-colors hover:text-[#071124]"
      >
        <Home className="size-5 stroke-[1.8]" />
      </Link>

      {breadcrumbs.map((item, index) => {
        const isCurrent = index === breadcrumbs.length - 1;
        const contentClassName = cn(
          "inline-flex min-h-8 items-center whitespace-nowrap rounded-md px-2 text-[15px] leading-5 transition-colors",
          isCurrent
            ? "font-semibold text-black"
            : "font-medium text-[#344054] hover:text-[#071124]",
          isCurrent && showCurrentPill && "bg-[#F9FAFB]",
        );

        return (
          <div key={index} className="flex items-center gap-3">
            <ChevronRight
              aria-hidden="true"
              className="size-5 shrink-0 text-[#D0D5DD]"
              strokeWidth={2}
            />

            {item.href && !isCurrent ? (
              <Link to={item.href} className={contentClassName}>
                {item.label}
              </Link>
            ) : (
              <span className={contentClassName}>{item.label}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
