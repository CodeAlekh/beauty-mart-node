import { prisma } from "../config/prisma.ts";
import type { ProductVariant } from "../generated/prisma/client.ts";
import type { CreateProductVariantInput } from "../schema/admin.schema.ts";
import { updateStartingPrice } from "./product.repository.ts";

export async function insertProductVariant(
  productId: number,
  variant: CreateProductVariantInput,
): Promise<ProductVariant> {
  const { images, ...fields } = variant;
  const iamgesToBeSaved = images.map((x, pos) => {
    return { ...x, productId: productId, position: pos };
  });
  const savedVariants = await prisma.productVariant.create({
    data: {
      productId: productId,
      ...fields,
      images: { create: iamgesToBeSaved },
    },
    include: { images: true },
  });
  updateStartingPrice(productId);
  return savedVariants;
}
