import { AppSidebar } from "./sidebar/AppSidebar";
import { PageLayout } from "./PageLayout";

export function AppLayout() {
  return (
    <div className="h-screen overflow-hidden bg-[#EAECF0] text-[#071124]">
      <AppSidebar />
      <PageLayout />
    </div>
  );
}
