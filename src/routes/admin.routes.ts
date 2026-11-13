import { Router } from "express";
import {
  addBrand,
  addCategory,
  addProduct,
} from "../controllers/admin.controller.ts";

export const adminRouter = Router();

adminRouter.post("/category", addCategory);
adminRouter.post("/brand", addBrand);
adminRouter.post("/product", addProduct);
