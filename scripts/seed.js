import "dotenv/config";
import { prisma } from "../src/db/prisma.js";
import {
  randomCategory,
  randomPrice,
  randomCreatedAt,
  randomUpdatedAt
} from "../src/utils/seed-helpers.js";

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

async function seedProducts() {
  console.log("Starting product seed...");

  const existingCount = await prisma.product.count();
  if (existingCount > 0) {
    console.log(`Products table already has ${existingCount} rows. Clearing table first...`);
    await prisma.product.deleteMany();
  }

  for (let start = 0; start < TOTAL_PRODUCTS; start += BATCH_SIZE) {
    const batch = [];

    for (let i = start; i < Math.min(start + BATCH_SIZE, TOTAL_PRODUCTS); i++) {
      const createdAt = randomCreatedAt();
      const updatedAt = randomUpdatedAt(createdAt);

      batch.push({
        name: `Product ${i + 1}`,
        category: randomCategory(),
        price: randomPrice(),
        createdAt,
        updatedAt
      });
    }

    await prisma.product.createMany({
      data: batch
    });

    console.log(`Inserted ${Math.min(start + BATCH_SIZE, TOTAL_PRODUCTS)} / ${TOTAL_PRODUCTS}`);
  }

  console.log("Seeding complete.");
}

seedProducts()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });