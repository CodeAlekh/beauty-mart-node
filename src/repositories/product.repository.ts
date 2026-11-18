import { prisma } from "../config/prisma.ts";
import type { AddProductInput } from "../schema/admin.schema.ts";

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
