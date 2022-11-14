/*
  Warnings:

  - The `specificity` column on the `Program` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `goals` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `specificity` column on the `Workout` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Specificity" AS ENUM ('general', 'strength', 'hypertrophy', 'athletic', 'cardio');

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "specificity",
ADD COLUMN     "specificity" "Specificity"[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "goals",
ADD COLUMN     "goals" "Specificity"[];

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "specificity",
ADD COLUMN     "specificity" "Specificity"[];

-- DropEnum
DROP TYPE "Specifity";
