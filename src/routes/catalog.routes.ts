import { Router } from "express";
import { getCategories } from "../controllers/catalog.controller.ts";

export const catalogRouter = Router();

catalogRouter.get("/categories", getCategories);
