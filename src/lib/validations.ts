import { z } from "zod";

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  ownerName: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Image URL must be a valid URL" }),
  ]),
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number" })
    .int()
    .positive()
    .max(99),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});

export type TPetForm = z.infer<typeof petFormSchema>;

export const petIdSchema = z.string().cuid();

export type TPetId = z.infer<typeof petIdSchema>;
