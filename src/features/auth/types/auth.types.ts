import type z from "zod";
import type { loginFormSchema } from "../schemas/auth.schema";

export type LoginFormData = z.infer<typeof loginFormSchema>;