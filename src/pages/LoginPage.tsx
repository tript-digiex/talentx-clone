import { type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/shadcn/button";
import { useAuthStore } from "@/stores/auth.store";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const location = useLocation();
  const navigate = useNavigate();
  const from =
    (location.state as LocationState | null)?.from?.pathname || "/talents";

  if (isAuthenticated) {
    return <Navigate to="/talents" replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const name = String(formData.get("name") || "").trim();

    login({
      email: email || "admin@talentx.local",
      name,
    });
    navigate(from, { replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-sm rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">TalentX</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use mock login to access the dashboard.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
        </form>
      </section>
    </main>
  );
}
