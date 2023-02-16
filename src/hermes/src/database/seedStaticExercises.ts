import { PrismaClient } from '@prisma/client';

export const seedStaticExercises = async (prisma: PrismaClient) => {
  await prisma.staticExercise.createMany({
    data: [
      {
        name: 'Barbell Bench Press',
        movement: 'horizontal_push',
        primaryTargetMuscle: 'chest',
        secondaryTargetMuscle: 'triceps',
        equipment: 'barbell',
      },
      {
        name: 'Deadlift',
        movement: 'hip_dominant',
        primaryTargetMuscle: 'hamstring',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'lower_back',
        equipment: 'barbell',
      },
      {
        name: 'Pull-up',
        movement: 'vertical_pull',
        primaryTargetMuscle: 'back_deltoids',
        secondaryTargetMuscle: 'biceps',
        equipment: 'bodyweight',
      },
      {
        name: 'Squats',
        movement: 'knee_dominant',
        primaryTargetMuscle: 'quadriceps',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'hamstring',
        equipment: 'barbell',
      },
      {
        name: 'Pull Ups',
        movement: 'vertical_pull',
        primaryTargetMuscle: 'upper_back',
        secondaryTargetMuscle: 'biceps',
        tertiaryTargetMuscle: 'back_deltoids',
        equipment: 'bodyweight',
      },
      {
        name: 'Shoulder Press',
        movement: 'vertical_push',
        primaryTargetMuscle: 'front_deltoids',
        secondaryTargetMuscle: 'triceps',
        tertiaryTargetMuscle: 'chest',
        equipment: 'dumbbell',
      },
      {
        name: 'Deadlift',
        movement: 'hip_dominant',
        primaryTargetMuscle: 'hamstring',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'lower_back',
        equipment: 'barbell',
      },
    ],
    skipDuplicates: true,
  });
};
