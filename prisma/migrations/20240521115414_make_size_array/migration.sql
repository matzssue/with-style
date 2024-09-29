/*
  Warnings:

  - The values [CLOTHES] on the enum `ProductCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `gender` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('S', 'M', 'L', 'XL');

-- AlterEnum
BEGIN;
CREATE TYPE "ProductCategory_new" AS ENUM ('MAN', 'WOMAN', 'SHOES', 'ACCESORIES');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "ProductCategory_new" USING ("category"::text::"ProductCategory_new");
ALTER TYPE "ProductCategory" RENAME TO "ProductCategory_old";
ALTER TYPE "ProductCategory_new" RENAME TO "ProductCategory";
DROP TYPE "ProductCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gender",
ADD COLUMN     "size" "Size"[],
ADD COLUMN     "subcategory" TEXT;

-- DropEnum
DROP TYPE "Gender";
