import * as productRepository from "../repositories/product.repository.ts";
import type { ProductFilterQuery } from "../schema/product.schema.ts";

export async function getAllProducts() {
  return await productRepository.getAllProduct();
}

export async function filterProducts(query: ProductFilterQuery) {
  return await productRepository.filterPaginatedProducts(query);
}
