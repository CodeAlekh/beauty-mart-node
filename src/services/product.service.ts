import * as productRepository from "../repositories/product.repository.ts";

export async function getAllProducts() {
  return await productRepository.getAllProduct();
}
