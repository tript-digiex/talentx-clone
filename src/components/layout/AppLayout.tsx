import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sidebar/AppSidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#EAECF0] text-[#071124]">
      <AppSidebar />

      <main className="min-h-screen pl-32 transition-[padding-left] duration-300 ease-out peer-hover:pl-101">
        <div className="min-h-screen px-4 py-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
