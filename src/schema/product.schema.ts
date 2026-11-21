import z from "zod";
import { basicStringSchema, idSchema, moneySchema } from "./admin.schema.ts";
import type {
  ProductGetPayload,
  ProductSelect,
} from "../generated/prisma/models.ts";
import type { selectKey } from "../repositories/product.repository.ts";

export const productFilterSchema = z
  .object({
    id: idSchema.optional(),
    category: idSchema.optional(),
    categorySlug: basicStringSchema.optional(),
    brand: idSchema.optional(),
    skinType: basicStringSchema.optional(),
    concern: basicStringSchema.optional(),
    minPrice: moneySchema.optional(),
    maxPrice: moneySchema.optional(),
    sort: z
      .enum(["newest", "price_asc", "price_desc", "rating"], {
        error: "sort param must have fixed values",
      })
      .default("newest"),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(20).default(10),
  })
  .refine(
    (obj) => {
      if (obj.minPrice && obj.maxPrice) {
        return obj.minPrice < obj.maxPrice;
      }
      return true;
    },
    { error: "minPrice must be smaller than maxPrice" },
  );

export type ProductFilterQuery = z.infer<typeof productFilterSchema>;

export type ProductCard = ProductGetPayload<{ select: typeof selectKey }>;

export type ProductCardResponse = {
  data: ProductCard[];
  count: number;
};
