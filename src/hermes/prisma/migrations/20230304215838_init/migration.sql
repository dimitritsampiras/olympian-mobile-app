/*
  Warnings:

  - Added the required column `rpe` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "rpe" INTEGER NOT NULL;
