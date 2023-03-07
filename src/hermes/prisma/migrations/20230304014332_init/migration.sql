/*
  Warnings:

  - The `goals` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `specificity` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `specificity` on the `Workout` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('cardio', 'yoga', 'olympic_weightlifting', 'sports_performance', 'calisthenics', 'crossfit', 'boxing', 'dance', 'swimming', 'cycling', 'running', 'martial_arts', 'rowing', 'gymnastics', 'aerobics', 'zumba', 'functional_training', 'recovery', 'pilates', 'hiit', 'hypertrophy', 'strength', 'wellness');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "goals",
ADD COLUMN     "goals" "TrainingType"[];

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "specificity",
ADD COLUMN     "trainingType" "TrainingType"[];

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "specificity",
ADD COLUMN     "trainingType" "TrainingType"[];

-- DropEnum
DROP TYPE "Specificity";
