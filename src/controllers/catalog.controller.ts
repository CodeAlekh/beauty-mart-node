import type { Request, Response } from "express";
import * as catalogService from "../services/catalog.service.ts";

export async function getCategories(req: Request, res: Response) {
  const categories = await catalogService.getAllCategories();
  res.json({ data: categories });
}
