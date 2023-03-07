/*
  Warnings:

  - The values [yoga,dance,zumba] on the enum `TrainingType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingType_new" AS ENUM ('cardio', 'olympic_weightlifting', 'sports_performance', 'calisthenics', 'crossfit', 'boxing', 'swimming', 'cycling', 'running', 'martial_arts', 'rowing', 'gymnastics', 'aerobics', 'functional_training', 'recovery', 'pilates', 'hiit', 'hypertrophy', 'strength', 'wellness', 'stretching');
ALTER TABLE "Profile" ALTER COLUMN "goals" TYPE "TrainingType_new"[] USING ("goals"::text::"TrainingType_new"[]);
ALTER TABLE "Program" ALTER COLUMN "trainingType" TYPE "TrainingType_new"[] USING ("trainingType"::text::"TrainingType_new"[]);
ALTER TABLE "Workout" ALTER COLUMN "trainingType" TYPE "TrainingType_new"[] USING ("trainingType"::text::"TrainingType_new"[]);
ALTER TYPE "TrainingType" RENAME TO "TrainingType_old";
ALTER TYPE "TrainingType_new" RENAME TO "TrainingType";
DROP TYPE "TrainingType_old";
COMMIT;
