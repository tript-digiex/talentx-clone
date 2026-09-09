import z from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  permissions: z
    .array(z.string().min(1, "Permission is required"))
    .min(1, "Permission must not be empty"),
});
