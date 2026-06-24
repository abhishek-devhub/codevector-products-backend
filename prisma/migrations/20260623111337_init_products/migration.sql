-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_products_updated_id_desc" ON "products"("updated_at" DESC, "id" DESC);

-- CreateIndex
CREATE INDEX "idx_products_category_updated_id_desc" ON "products"("category", "updated_at" DESC, "id" DESC);
