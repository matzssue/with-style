-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('SHOES', 'CLOTHES', 'ACCESORIES');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('TSHIRT', 'HOODIE', 'SWEATER', 'COAT', 'DRESS', 'JEANS', 'SWEATPANTS', 'TROUSERS', 'SNEAKERS', 'PUMPS', 'FLATSHOES', 'SPORTSHOES', 'WATCH', 'BELT', 'BAG', 'CAP');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('WINTER', 'SUMMER', 'AUTUMN', 'SPRING', 'ALL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "season" "Season" NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "type" "ProductType" NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInOrder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductInOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInOrder" ADD CONSTRAINT "ProductInOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInOrder" ADD CONSTRAINT "ProductInOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
