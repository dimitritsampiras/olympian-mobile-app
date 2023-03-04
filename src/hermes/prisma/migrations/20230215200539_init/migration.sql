/*
  Warnings:

  - You are about to drop the column `description` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "description",
ADD COLUMN     "authorNotes" TEXT;
