import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/images/DGX-Logo-Text.png";

import { useAuthStore } from "@/stores/auth.store";
import LoginForm from "@/features/auth/components/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import type { LoginFormType } from "@/features/auth/types/auth.types";
import {
  getRedirectPath,
  hasValidAuthSession,
} from "@/features/auth/utils/auth.utils";

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [searchParams] = useSearchParams();
  const loginMutation = useLogin();

  const redirectPath = getRedirectPath(searchParams);

  const handleLoginSubmit = async (data: LoginFormType) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    }
  };

  if (isAuthenticated && hasValidAuthSession()) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EAECF0] px-4">
      <section className="w-full max-w-md rounded-lg px-6 py-10 bg-white flex flex-col gap-6">
        <div className="h-8 flex items-center justify-center">
          <img src={logo} alt="TalentX Logo" className="h-full" />
        </div>

        <LoginForm
          isSubmitting={loginMutation.isPending}
          onSubmit={handleLoginSubmit}
        />
      </section>
    </main>
  );
}
