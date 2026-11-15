import type {
  AddProductInput,
  CreateBrandInput,
  CreateCategoryInput,
  CreateProductVariantInput,
} from "../schema/admin.schema.ts";
import * as categoryRepository from "../repositories/category.repository.ts";
import * as productRepository from "../repositories/product.repository.ts";
import * as productVariantRepository from "../repositories/productVariant.repository.ts";
import type {
  Brand,
  Category,
  ProductVariant,
} from "../generated/prisma/client.ts";

export async function createCategory(
  categoryInput: CreateCategoryInput,
): Promise<Category> {
  categoryInput.slug = categoryInput.slug.toLowerCase();
  return await categoryRepository.insertCategory(categoryInput);
}

export async function createBrand(body: CreateBrandInput): Promise<Brand> {
  body.slug = body.slug.toLowerCase();
  return await categoryRepository.insertBrand(body);
}

export async function createProduct(productInput: AddProductInput) {
  return await productRepository.insertProduct(productInput);
}

export async function addProductVariant(
  productId: number,
  variant: CreateProductVariantInput,
): Promise<ProductVariant> {
  return await productVariantRepository.insertProductVariant(
    productId,
    variant,
  );
}
