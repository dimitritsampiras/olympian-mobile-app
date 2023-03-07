/*
  Warnings:

  - Added the required column `setId` to the `PerformedSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PerformedSet" ADD COLUMN     "setId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformedSet" ADD CONSTRAINT "PerformedSet_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
