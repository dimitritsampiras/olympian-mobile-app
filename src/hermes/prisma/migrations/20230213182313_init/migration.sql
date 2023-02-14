/*
  Warnings:

  - The values [athletic] on the enum `Specificity` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Specificity_new" AS ENUM ('general', 'strength', 'hypertrophy', 'athleticism', 'cardio');
ALTER TABLE "Profile" ALTER COLUMN "goals" TYPE "Specificity_new"[] USING ("goals"::text::"Specificity_new"[]);
ALTER TABLE "Program" ALTER COLUMN "specificity" TYPE "Specificity_new"[] USING ("specificity"::text::"Specificity_new"[]);
ALTER TABLE "Workout" ALTER COLUMN "specificity" TYPE "Specificity_new"[] USING ("specificity"::text::"Specificity_new"[]);
ALTER TYPE "Specificity" RENAME TO "Specificity_old";
ALTER TYPE "Specificity_new" RENAME TO "Specificity";
DROP TYPE "Specificity_old";
COMMIT;
