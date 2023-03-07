/*
  Warnings:

  - You are about to drop the column `number` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `supersetLetter` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "number",
DROP COLUMN "supersetLetter",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "supersetOrder" VARCHAR(1);
