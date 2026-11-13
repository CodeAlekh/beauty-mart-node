import type {
  CreateBrandInput,
  CreateCategoryInput,
} from "../schema/admin.schema.ts";
import * as categoryRepository from "../repositories/category.repository.ts";
import type { Brand, Category } from "../generated/prisma/client.ts";

export async function createCategory(
  categoryInput: CreateCategoryInput,
): Promise<Category> {
  categoryInput.slug = categoryInput.slug.toLowerCase();
  return await categoryRepository.insertCategory(categoryInput);
}

export async function createBrand(body: CreateBrandInput): Promise<Brand> {
  body.slug = body.slug.toLowerCase();
  return await categoryRepository.insertBrand(body);
}
