import logo from "@/assets/images/DGX-Logo-Text.png";
import Button from "@/components/ui/custom/Button";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EAECF0] px-4">
      <section className="w-full max-w-md rounded-lg px-6 py-10 bg-white flex flex-col gap-6">
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<ArrowLeft />}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <div className="h-8 flex items-center justify-center">
          <img src={logo} alt="TalentX Logo" className="h-full" />
        </div>

        <h1 className="text-center font-bold text-3xl">Set a new password</h1>

        <ForgotPasswordForm />
      </section>
    </main>
  );
}
