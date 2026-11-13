import { prisma } from "../config/prisma.ts";
import type { Category } from "../generated/prisma/client.ts";
import type { CreateCategoryInput } from "../schema/admin.schema.ts";

export async function insertCategory(category: CreateCategoryInput): Promise<Category> {
    return await prisma.category.create({data: category});
}