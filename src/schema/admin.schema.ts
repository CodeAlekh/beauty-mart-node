import z from "zod";

const basicStringSchema = z.string().trim().min(1).max(100);

export const createCategorySchema = z.object({
  name: basicStringSchema,
  slug: basicStringSchema,
});

export const createBrandSchema = createCategorySchema.extend({
  logoUrl: basicStringSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateBrandInput = z.infer<typeof createBrandSchema>;
