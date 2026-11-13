import { Router } from "express";
import { addBrand, addCategory } from "../controllers/admin.controller.ts";

export const adminRouter = Router();

adminRouter.post("/category", addCategory);
adminRouter.post("/brand", addBrand);
