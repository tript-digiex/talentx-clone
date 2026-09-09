import z from "zod";
import { USER_ROLES } from "../types/user.constants";

export const createUserSchema = z
  .object({
    first_name: z.string().trim().min(1, "First name is required"),
    last_name: z.string().trim().min(1, "Last name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),
    role: z.enum(USER_ROLES),
    group_member_id: z.string().optional(),
    permissions: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === USER_ROLES.ADMIN) {
      return;
    }

    if (!data.group_member_id?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["group_member_id"],
        message: "Group is required",
      });
    }
  });
