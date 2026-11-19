import type { Record } from "@prisma/client/runtime/client";
import { prisma } from "../config/prisma.ts";
import type { AddProductInput } from "../schema/admin.schema.ts";
import type { ProductFilterQuery } from "../schema/product.schema.ts";
import type { ProductOrderByWithRelationInput } from "../generated/prisma/models.ts";

export async function insertProduct(product: AddProductInput) {
  const { images, ...everythingElse } = product;

  const imagesWithPosition = images.map((x, i) => {
    return { url: x.url, text: x.text, position: i };
  });

  const dataToBeSaved = {
    images: { create: imagesWithPosition },
    reviewCount: 0,
    ...everythingElse,
  };

  const p = prisma.product.create({
    data: dataToBeSaved,
    include: { images: true },
  });
  return p;
}

export async function getAllProduct() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true, productVariants: true },
  });
}

export async function updateStartingPrice(productId: number) {
  const x = await prisma.productVariant.findFirst({
    where: { productId: productId },
    orderBy: { price: "asc" },
  });
  const minPrice = x?.price ?? 0;
  await prisma.product.update({
    where: { id: productId },
    data: { startingPrice: minPrice },
  });
}

function getOrderByObject(sort: string): ProductOrderByWithRelationInput {
  switch (sort) {
    case "newest":
      return { createdAt: "desc" };
    case "price_asc":
      return { startingPrice: "asc" };
    case "price_desc":
      return { startingPrice: "desc" };
    case "rating":
      return { rating: "desc" };
    default:
      return { createdAt: "desc" };
  }
}

export async function filterPaginatedProducts(query: ProductFilterQuery) {
  const whereObject = {
    isActive: true,
    id: query.id ? query.id : undefined,
    categoryId: query?.category ?? undefined,
    category: query.categorySlug ? { slug: query.categorySlug } : undefined,
    brandId: query?.brand ?? undefined,
    skinTypes: query.skinType ? { has: query.skinType } : undefined,
    concerns: query.concern ? { has: query.concern } : undefined,
    startingPrice: { gte: query.minPrice, lte: query.maxPrice },
  };

  const data = await prisma.product.findMany({
    where: whereObject,
    orderBy: getOrderByObject(query.sort),
    skip: (query.page - 1) * query.limit,
    take: query.limit,
  });
  const count = await prisma.product.count({
    where: whereObject,
  });
  return { data: data, count: count };
}
