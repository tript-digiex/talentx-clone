import Button from "@/components/ui/custom/Button";
import Input from "@/components/ui/custom/Input";

const ForgotPasswordForm = () => {
  return (
    <form className="flex max-w-full flex-col gap-4">
      <Input placeholder="Enter your email" type="email" />

      <Button className="w-full" type="submit" size="lg">
        Confirm
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
