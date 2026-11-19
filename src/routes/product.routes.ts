import { Router } from "express";
import {
  filterProducts,
  getAllProducts,
} from "../controllers/product.controller.ts";

export const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/filter", filterProducts);
