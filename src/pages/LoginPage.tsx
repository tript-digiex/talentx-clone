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
      <section className="w-full max-w-md rounded-lg p-6 bg-white flex flex-col gap-6">
        <div className="h-8 flex items-center justify-center">
          <img src={logo} alt="TalentX Logo" className="h-full" />
        </div>

        {/* <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Name</span>
            <input
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
              name="name"
              placeholder="TalentX Admin"
              type="text"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Email</span>
            <input
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30"
              name="email"
              placeholder="admin@talentx.local"
              type="email"
            />
          </label>

          <Button className="w-full" type="submit">
            Login
          </Button>
        </form> */}

        <LoginForm />
      </section>
    </main>
  );
}
