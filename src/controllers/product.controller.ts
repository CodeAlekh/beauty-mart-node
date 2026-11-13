import type { Request, Response } from "express";
import * as productService from "../services/product.service.ts";

export async function getAllProducts(req: Request, res: Response) {
  const p = await productService.getAllProducts();
  res.json({ data: p });
}
