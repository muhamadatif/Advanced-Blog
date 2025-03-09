import { z } from "zod";
import { MAX_SIZE } from "../utils/constants";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title must be at least 3 characters"),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_SIZE, {
      message: "File size must be less than 2MB",
    })
    .optional(),
  category: z.string().optional(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(200, "Content can not exceed 200 characters"),
});
