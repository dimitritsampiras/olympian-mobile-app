/*
  Warnings:

  - You are about to drop the column `duration` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `rpe` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "duration",
DROP COLUMN "reps",
DROP COLUMN "rpe",
DROP COLUMN "sets";
