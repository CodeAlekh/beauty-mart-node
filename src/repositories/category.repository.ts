import { prisma } from "../config/prisma.ts";
import type { Brand, Category } from "../generated/prisma/client.ts";
import type {
  CreateBrandInput,
  CreateCategoryInput,
} from "../schema/admin.schema.ts";

export async function insertCategory(
  category: CreateCategoryInput,
): Promise<Category> {
  return await prisma.category.create({ data: category });
}

export async function insertBrand(body: CreateBrandInput): Promise<Brand> {
  return await prisma.brand.create({ data: body });
}
