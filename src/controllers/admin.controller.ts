import type { Request, Response } from "express";
import * as adminService from "../services/admin.service.ts";
import {
  createBrandSchema,
  createCategorySchema,
} from "../schema/admin.schema.ts";

export async function addCategory(req: Request, res: Response) {
  const body = createCategorySchema.parse(req.body);
  const cat = await adminService.createCategory(body);
  res.json({ data: cat });
}

export async function addBrand(req: Request, res: Response) {
  const body = createBrandSchema.parse(req.body);
  const brand = await adminService.createBrand(body);
  res.json({ data: brand });
}
