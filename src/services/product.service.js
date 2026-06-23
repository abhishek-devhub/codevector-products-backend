import { decodeCursor, encodeCursor } from "../utils/cursor.js";
import { normalizeLimit } from "../utils/pagination.js";
import { getProductsPage } from "../repositories/product.repository.js";

export async function fetchProducts(query) {
    const limit = normalizeLimit(query.limit);
    const snapshot = query.snapshot || new Date().toISOString();

    let decodedCursor = null;

    if (query.cursor) {
        decodedCursor = decodeCursor(query.cursor);
    }

    const rows = await getProductsPage({
        category: query.category,
        limit,
        snapshot,
        cursor: decodedCursor
    });

    const hasNextPage = rows.length > limit;
    const data = hasNextPage ? rows.slice(0, limit) : rows;

    let nextCursor = null;

    if (hasNextPage && data.length > 0) {
        const lastItem = data[data.length - 1];
        nextCursor = encodeCursor({
            updatedAt: lastItem.updated_at.toISOString(),
            id: lastItem.id.toString()
        });
    }

    return {
        data: data.map((item) => ({
            id: item.id.toString(),
            name: item.name,
            category: item.category,
            price: item.price.toString(),
            created_at: item.created_at,
            updated_at: item.updated_at
        })),
        pagination: {
            limit,
            hasNextPage,
            nextCursor,
            snapshot
        }
    };
}