import type z from "zod";
import type { loginFormSchema } from "../schemas/auth.schema";

export type LoginFormType = z.infer<typeof loginFormSchema>;