import Input from "@/components/ui/custom/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../schemas/auth.schema";
import { Checkbox as CheckboxShadcn } from "@/components/ui/shadcn/checkbox";
import type { LoginFormType } from "../types/auth.types";
import { Button } from "@/components/ui/shadcn/button";

const LoginForm = () => {
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

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col max-w-full gap-4"
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
        placeholder="••••••••"
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
      </div>

      <Button type="submit" variant="outline" size="lg">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
