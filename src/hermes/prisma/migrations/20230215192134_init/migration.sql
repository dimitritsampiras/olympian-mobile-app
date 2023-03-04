-- CreateEnum
CREATE TYPE "Specificity" AS ENUM ('general', 'strength', 'hypertrophy', 'athleticism', 'cardio');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "TrainingLevel" AS ENUM ('beginner', 'intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "Publicity" AS ENUM ('private', 'public', 'friends');

-- CreateEnum
CREATE TYPE "Muscle" AS ENUM ('trapezius', 'upper_back', 'lower_back', 'chest', 'biceps', 'triceps', 'forearm', 'back_deltoids', 'middle_deltoids', 'front_deltoids', 'abs', 'obliques', 'adductor', 'hamstring', 'quadriceps', 'abductors', 'calves', 'gluteal', 'head', 'neck');

-- CreateEnum
CREATE TYPE "Movement" AS ENUM ('vertical_push', 'horizontal_push', 'vertical_pull', 'horizontal_pull', 'knee_dominant', 'hip_dominant', 'carry', 'isolation', 'flexion', 'extension', 'internal_rotation', 'external_rotation', 'elevation', 'rotation', 'anti_extension', 'anti_rotation', 'anti_lateral_flexion', 'explosive');

-- CreateEnum
CREATE TYPE "Equipment" AS ENUM ('barbell', 'dumbbell', 'machine', 'band', 'ball', 'cable', 'kettlebell', 'resistance_band', 'suspension_trainer', 'bodyweight', 'bench', 'box', 'foam_roller', 'medicine_ball', 'sandbag', 'sled', 'trap_bar', 'weighted_vest');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "weight" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainingAge" "TrainingLevel",
    "goals" "Specificity"[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "complimentary" BOOLEAN,
    "specificity" "Specificity"[],
    "trainingLevel" "TrainingLevel",
    "tags" TEXT[],
    "publicity" "Publicity" NOT NULL,
    "likes" INTEGER,
    "profileImageDefaultColor" VARCHAR(7) NOT NULL DEFAULT 'e0e7ff',
    "profileImageDefaultEmoji" VARCHAR(5) NOT NULL DEFAULT '1F93C',
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specificity" "Specificity"[],
    "trainingLevel" "TrainingLevel",
    "tags" TEXT[],
    "duration" TIMESTAMP(3) NOT NULL,
    "programId" TEXT,

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
    "workoutId" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "movement" "Movement" NOT NULL,
    "primaryTargetMuscle" "Muscle" NOT NULL,
    "secondaryTargetMuscle" "Muscle",
    "tertiaryTargetMuscle" "Muscle",
    "equipment" "Equipment",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaticExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_staticExerciseId_fkey" FOREIGN KEY ("staticExerciseId") REFERENCES "StaticExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
