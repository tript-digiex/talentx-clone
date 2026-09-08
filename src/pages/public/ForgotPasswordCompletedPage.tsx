import Button from "@/components/ui/custom/Button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/DGX-Logo-Text.png";

export function ForgotPasswordCompletedPage() {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-lg rounded-lg px-6 py-10 bg-white flex flex-col gap-6">
      <div className="h-8 flex items-center justify-center">
        <img src={logo} alt="TalentX Logo" className="h-full" />
      </div>

      <h1 className="text-center font-bold text-xl">
        We've sent you a password reset email
      </h1>

      <div className="flex justify-center">
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </section>
  );
}
