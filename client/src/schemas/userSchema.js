import { z } from "zod";
import { MAX_SIZE } from "../utils/constants";

export const updateUserSchema = z.object({
  profilePicture: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_SIZE, {
      message: "File size must be less than 5MB",
    })
    .optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
});
