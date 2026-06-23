import { z } from "zod";
import { CATEGORIES } from "../constants/categories.js";

export const getProductsQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(100).optional(),
    category: z
        .string()
        .trim()
        .toLowerCase()
        .refine((value) => CATEGORIES.includes(value), {
            message: "Invalid Category"
        })
        .optional(),
    cursor: z.string().optional(),
    snapshot: z.string().datetime().optional()
})