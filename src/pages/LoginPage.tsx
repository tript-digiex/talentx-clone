import { Navigate } from "react-router-dom";
import logo from "@/assets/images/DGX-Logo-Text.png";

import { useAuthStore } from "@/stores/auth.store";
import LoginForm from "@/features/auth/components/LoginForm";

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/talents" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
      <section className="w-full max-w-md rounded-lg px-6 py-10 bg-white flex flex-col gap-6">
        <div className="h-8 flex items-center justify-center">
          <img src={logo} alt="TalentX Logo" className="h-full" />
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
