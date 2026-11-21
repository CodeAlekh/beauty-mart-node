import type { Request, Response } from "express";
import * as productService from "../services/product.service.ts";
import {
  productFilterSchema,
  type ProductCardResponse,
} from "../schema/product.schema.ts";

export async function getAllProducts(req: Request, res: Response) {
  const products = await productService.getAllProducts();
  res.json({ data: products });
}

export async function filterProducts(req: Request, res: Response) {
  const query = productFilterSchema.parse(req.query);
  const products = await productService.filterProducts(query);
  res.json(products);
}
