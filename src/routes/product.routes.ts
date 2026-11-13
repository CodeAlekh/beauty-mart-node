import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller.ts";

export const productRouter = Router();

productRouter.get("/", getAllProducts);
