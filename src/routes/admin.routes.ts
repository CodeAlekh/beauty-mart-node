import { Router } from "express";
import { addCategory } from "../controllers/admin.controller.ts";

export const adminRouter = Router();

adminRouter.post("/category", addCategory);
