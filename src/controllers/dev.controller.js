import { prisma } from "../db/prisma.js";
import { CATEGORIES } from "../constants/categories.js";

function randomCategory() {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

function randomPrice() {
  const value = Math.floor(Math.random() * 50000) + 100;
  return (value / 100).toFixed(2);
}

export async function simulateChangesController(req, res, next) {
  try {
    const insertCount = Number(req.query.insertCount || 25);
    const updateCount = Number(req.query.updateCount || 25);

    if (insertCount < 0 || updateCount < 0) {
      return res.status(400).json({
        success: false,
        message: "insertCount and updateCount must be non-negative"
      });
    }

    // 1) Insert new products
    if (insertCount > 0) {
      const newRows = [];

      for (let i = 0; i < insertCount; i++) {
        newRows.push({
          name: `Injected Product ${Date.now()}-${i}`,
          category: randomCategory(),
          price: randomPrice(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      await prisma.product.createMany({
        data: newRows
      });
    }

    // 2) Update random existing products to move them to top of feed
    if (updateCount > 0) {
      const randomProducts = await prisma.$queryRaw`
        SELECT id
        FROM products
        ORDER BY RANDOM()
        LIMIT ${updateCount}
      `;

      const now = new Date();

      for (const row of randomProducts) {
        await prisma.product.update({
          where: { id: row.id },
          data: {
            updatedAt: now
          }
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Simulated product inserts/updates successfully",
      inserted: insertCount,
      updated: updateCount
    });
  } catch (error) {
    next(error);
  }
}