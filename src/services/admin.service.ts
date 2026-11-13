import type { CreateCategoryInput } from "../schema/admin.schema.ts";
import * as categoryRepository from "../repositories/category.repository.ts";
import type { Category } from "../generated/prisma/client.ts";

export async function createCategory(
  categoryInput: CreateCategoryInput,
): Promise<Category> {
  categoryInput.slug = categoryInput.slug.toLowerCase();
  return await categoryRepository.insertCategory(categoryInput);
}
