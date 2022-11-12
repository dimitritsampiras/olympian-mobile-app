-- CreateEnum
CREATE TYPE "Specifity" AS ENUM ('general', 'strength', 'hypertrophy', 'athletic', 'cardio');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "TrainingLevel" AS ENUM ('beginner', 'intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "Publicity" AS ENUM ('private', 'public', 'friends');

-- CreateEnum
CREATE TYPE "MuscleRank" AS ENUM ('primary', 'secondary');

-- CreateEnum
CREATE TYPE "Movement" AS ENUM ('vertical_push', 'horizontal_push', 'vertical_pull', 'horizontal_pull', 'knee_dominant', 'hip_dominant', 'carry', 'isolation', 'flexion', 'extension', 'internal_rotation', 'external_rotation', 'elavation');

-- CreateEnum
CREATE TYPE "Equipment" AS ENUM ('barbell', 'dumbell', 'machine', 'band', 'ball');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "weight" TIMESTAMP(3),
    "height" TIMESTAMP(3),
    "trainingAge" "TrainingLevel",
    "goals" "Specifity"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "complimentary" BOOLEAN,
    "specificity" "Specifity"[],
    "trainingLevel" "TrainingLevel",
    "tags" TEXT[],
    "publicity" "Publicity" NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specificity" "Specifity"[],
    "trainingLevel" "TrainingLevel" NOT NULL,
    "tags" TEXT[],
    "duration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "duration" INTEGER,
    "rpe" INTEGER,
    "description" TEXT NOT NULL,
    "staticExerciseId" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "movement" "Movement" NOT NULL,
    "equipment" "Equipment",

    CONSTRAINT "StaticExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muscle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rank" "MuscleRank" NOT NULL,
    "staticExerciseId" TEXT,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_staticExerciseId_fkey" FOREIGN KEY ("staticExerciseId") REFERENCES "StaticExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muscle" ADD CONSTRAINT "Muscle_staticExerciseId_fkey" FOREIGN KEY ("staticExerciseId") REFERENCES "StaticExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
