import * as productRepository from "../repositories/product.repository.ts";
import type {
  ProductCardResponse,
  ProductFilterQuery,
} from "../schema/product.schema.ts";

export async function getAllProducts() {
  return await productRepository.getAllProduct();
}

function calculateDiscount(
  mrp: number | undefined,
  price: number | undefined,
): number | null {
  if (!mrp || !price) {
    return null;
  }
  return Math.round(((mrp - price) / mrp) * 100);
}

export async function filterProducts(query: ProductFilterQuery) {
  const { data, count } =
    await productRepository.filterPaginatedProducts(query);
  const returnedData = data.map((x) => {
    // const cheapestVariant =
    //   x.productVariants.sort(
    //     (a, b) => a.price.toNumber() - b.price.toNumber(),
    //   )[0] ?? null;

    const cheapestVariant = x.productVariants.reduce((best, variant) => {
      if (best.price.toNumber() < variant.price.toNumber()) {
        return best;
      } else {
        return variant;
      }
    });

    return {
      id: x.id,
      name: x.name,
      slug: x.slug,
      rating: x.rating,
      reviewCount: x.reviewCount,
      brand: x.brand.name,
      category: x.category.name,
      image: x.images[0] ?? null,
      price: cheapestVariant?.price,
      mrp: cheapestVariant?.mrp,
      discount: calculateDiscount(
        cheapestVariant?.mrp?.toNumber(),
        cheapestVariant?.price?.toNumber(),
      ),
      optionCount: x.productVariants.length,
    };
  });
  return { data: returnedData, count: count };
}
