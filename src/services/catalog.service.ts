import type { Category } from "../generated/prisma/client.ts";
import { listCategories } from "../repositories/category.repository.ts";

export async function getAllCategories(): Promise<any> {
  return await listCategories();
}
