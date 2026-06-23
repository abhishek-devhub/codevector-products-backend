import { Router } from "express";
import { getProductsController } from "../controllers/product.controller.js";

const productRoutes = Router()

productRoutes.get('/', getProductsController);

export default productRoutes;
