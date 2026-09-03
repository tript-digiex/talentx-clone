import Input from "@/components/ui/custom/Input";
import Button from "@/components/ui/custom/Button";
import { Checkbox as CheckboxShadcn } from "@/components/ui/shadcn/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginFormSchema } from "../schemas/auth.schema";
import type { LoginFormType } from "../types/auth.types";

type LoginFormProps = {
  onSubmit: (data: LoginFormType) => Promise<void> | void;
  isSubmitting?: boolean;
};

const LoginForm = ({ onSubmit, isSubmitting = false }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
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
        {...register("email")}
        error={!!formErrors.email}
        helperText={formErrors.email?.message}
      />

      <Input
        placeholder="Enter your password"
        type="password"
        {...register("password")}
        error={!!formErrors.password}
        helperText={formErrors.password?.message}
      />

      <div className="flex items-center justify-between">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <div className="flex items-center">
              <CheckboxShadcn
                id="rememberMe"
                checked={field.value}
                onCheckedChange={field.onChange}
              />

              <label htmlFor="rememberMe" className="ml-2 text-sm">
                Remember for 30 days
              </label>
            </div>
          )}
        />

        <Button type="button" size="sm" variant="link">
          Forgot password
        </Button>
      </div>

      <Button className="w-full" type="submit" size="lg" loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
