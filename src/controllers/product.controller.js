import { fetchProducts } from "../services/product.service.js";
import { getProductsQuerySchema } from "../validators/product.validator.js";

export async function getProductsController(req, res, next) {
  try {
    const parsed = getProductsQuerySchema.parse(req.query);
    const result = await fetchProducts(parsed);

    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
}