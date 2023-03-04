/*
  Warnings:

  - Made the column `number` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "number" SET NOT NULL;
