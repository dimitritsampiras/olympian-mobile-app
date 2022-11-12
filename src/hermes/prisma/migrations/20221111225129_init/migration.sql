/*
  Warnings:

  - The `weight` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `height` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER,
DROP COLUMN "height",
ADD COLUMN     "height" INTEGER;
