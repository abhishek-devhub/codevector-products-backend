import { Router } from "express";
import { getProductsController } from "../controllers/product.controller";

const productRoutes = Router()

productRoutes.get('/', getProductsController);

export default productRoutes;
