import { z } from "zod";

export const getProductsQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(100).optional(),
    category: z.string().trim().toLowerCase().min(1).optional(),
    cursor: z.string().optional(),
    snapshot: z.string().datetime().optional()
})