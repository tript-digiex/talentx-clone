import Button from "@/components/ui/custom/Button";
import Input from "@/components/ui/custom/Input";
import type { ForgotPasswordFormType } from "../types/auth.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordFormSchema } from "../schemas/auth.schema";

type ForgotPasswordFormProps = {
  onSubmit: (data: ForgotPasswordFormType) => void;
  isSubmitting?: boolean;
};

const ForgotPasswordForm = ({
  onSubmit,
  isSubmitting = false,
}: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      user_email: "",
    },
    mode: "onSubmit",
  });

  return (
    <form
      className="flex max-w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Enter your email"
        type="email"
        {...register("user_email")}
        error={!!formErrors.user_email}
        helperText={formErrors.user_email?.message}
      />

      <Button className="w-full" type="submit" size="lg" loading={isSubmitting}>
        Confirm
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
