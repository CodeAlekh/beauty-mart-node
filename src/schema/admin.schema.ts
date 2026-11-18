import z from "zod";

export const basicStringSchema = z.string().trim().min(1).max(100);
const basicStringArraySchema = z.array(basicStringSchema).max(10);
export const idSchema = z.coerce.number().int().positive();

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

export const moneySchema = z
  .number()
  .min(0.01)
  .max(999_999.99)
  .multipleOf(0.01, { error: "Price must be upto 2 decimal places" });

export const createProductVariantSchema = z
  .object({
    label: basicStringSchema,
    mrp: moneySchema,
    price: moneySchema,
    stock: z.int().min(0),
    code: basicStringSchema,
    images: z.array(imageSchema),
  })
  .refine((obj) => obj.price <= obj.mrp, {
    error: "mrp must be greater or equal to price",
  });

export type CreateProductVariantInput = z.infer<
  typeof createProductVariantSchema
>;
