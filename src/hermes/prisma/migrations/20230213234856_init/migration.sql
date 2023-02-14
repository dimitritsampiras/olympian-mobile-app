/*
  Warnings:

  - Made the column `profileImageDefaultColor` on table `Program` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileImageDefaultEmoji` on table `Program` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_programId_fkey";

-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "profileImageDefaultColor" SET NOT NULL,
ALTER COLUMN "profileImageDefaultColor" SET DEFAULT '#e0e7ff',
ALTER COLUMN "profileImageDefaultEmoji" SET NOT NULL,
ALTER COLUMN "profileImageDefaultEmoji" SET DEFAULT '🏋️‍♀️';

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
