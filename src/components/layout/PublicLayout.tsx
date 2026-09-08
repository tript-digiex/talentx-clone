import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EAECF0] px-4">
      <Outlet />
    </main>
  );
};

export default PublicLayout;
