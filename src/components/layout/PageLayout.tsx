import { Outlet } from "react-router-dom";
import Breadcrumbs from "../common/Breadcumbs";

export function PageLayout() {
  return (
    <main className="h-screen overflow-hidden pl-32 py-3 pr-3 transition-[padding-left] duration-300 ease-out peer-hover:pl-101">
      <div className="h-full overflow-y-auto rounded-l-4xl bg-white px-6 py-8">
        <Breadcrumbs />
        <Outlet />
      </div>
    </main>
  );
}
