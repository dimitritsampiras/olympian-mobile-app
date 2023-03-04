/*
  Warnings:

  - Made the column `description` on table `StaticExercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "StaticExercise" ALTER COLUMN "description" SET NOT NULL;
