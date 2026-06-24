import { Prisma } from "../../generated/prisma/index.js";
import { prisma } from "../db/prisma.js";

export async function getProductsPage({
    limit,
    cursor,
    category,
    snapshot
}) {
    const pageSizePlusOne = limit + 1

    const categoryFilter = category ?
        Prisma.sql`AND category = ${category}`
        : Prisma.empty;

    const cursorFilter = cursor
        ? Prisma.sql`
      AND (
        updated_at < ${new Date(cursor.updatedAt)}
        OR (
          updated_at = ${new Date(cursor.updatedAt)}
          AND id < ${BigInt(cursor.id)}
        )
      )
    `
        : Prisma.empty;

    const rows = await prisma.$queryRaw`
      SELECT id, name, price, category, updated_at,created_at
      FROM products
      WHERE updated_at <= ${new Date(snapshot)}
      ${categoryFilter}
      ${cursorFilter}
      ORDER BY updated_at DESC, id DESC
      LIMIT ${pageSizePlusOne}
    `
    return rows 
    
}