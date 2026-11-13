import z from "zod";

const basicStringSchema = z.string().trim().min(1).max(100);
const basicStringArraySchema = z.array(basicStringSchema).max(10);

export const createCategorySchema = z.object({
  name: basicStringSchema,
  slug: basicStringSchema,
});

export const createBrandSchema = createCategorySchema.extend({
  logoUrl: basicStringSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateBrandInput = z.infer<typeof createBrandSchema>;

const imageSchema = z.object({
  url: basicStringSchema,
  text: basicStringSchema,
});

export const productCreateSchema = z.object({
  name: basicStringSchema,
  slug: basicStringSchema,
  description: z.string().trim().min(1).max(500),
  brandId: z.int().positive(),
  categoryId: z.int().positive(),
  skinTypes: basicStringArraySchema,
  concerns: basicStringArraySchema,
  images: z.array(imageSchema),
});

export type AddProductInput = z.infer<typeof productCreateSchema>;
