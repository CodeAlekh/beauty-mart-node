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

export async function listCategories(): Promise<any> {
  const countProductQuery = {
    // select: { products: { where: { productVariants: { some: {} } } } },
    select: { products: {} },
  };
  const val = await prisma.category.findMany({
    select: { id: true, name: true, slug: true, _count: countProductQuery },
  });
  const returingVal = val.map((x) => {
    return {
      id: x.id,
      name: x.name,
      slug: x.slug,
      productCount: x._count.products,
    };
  });
  return returingVal;
}
