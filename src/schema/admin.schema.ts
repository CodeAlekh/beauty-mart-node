import z from "zod";

const basicStringSchema = z.string().trim().min(1).max(100);

export const createCategorySchema = z.object({
  name: basicStringSchema,
  slug: basicStringSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
