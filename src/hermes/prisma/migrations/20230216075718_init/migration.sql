/*
  Warnings:

  - Made the column `workoutId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "workoutId" SET NOT NULL;
