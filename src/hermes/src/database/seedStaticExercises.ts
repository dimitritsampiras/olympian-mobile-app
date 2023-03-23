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
        description: 'the barbell bench press is a',
      },
      {
        name: 'Deadlift',
        movement: 'hip_dominant',
        primaryTargetMuscle: 'hamstring',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'lower_back',
        equipment: 'barbell',
        description: 'the barbell bench press is a',
      },
      {
        name: 'Pull-up',
        movement: 'vertical_pull',
        primaryTargetMuscle: 'back_deltoids',
        secondaryTargetMuscle: 'biceps',
        equipment: 'bodyweight',
        description: 'the barbell bench press is a',
      },
      {
        name: 'Squats',
        movement: 'knee_dominant',
        primaryTargetMuscle: 'quadriceps',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'hamstring',
        equipment: 'barbell',
        description: 'the barbell bench press is a',
      },
      {
        name: 'Pull Ups',
        movement: 'vertical_pull',
        primaryTargetMuscle: 'upper_back',
        secondaryTargetMuscle: 'biceps',
        tertiaryTargetMuscle: 'back_deltoids',
        equipment: 'bodyweight',
        description: 'the barbell bench press is a',
      },
      {
        name: 'Shoulder Press',
        movement: 'vertical_push',
        primaryTargetMuscle: 'front_deltoids',
        secondaryTargetMuscle: 'triceps',
        tertiaryTargetMuscle: 'chest',
        equipment: 'dumbbell',
        description: 'the barbell bench press is a',
      },
      {
        name: 'Deadlift',
        movement: 'hip_dominant',
        primaryTargetMuscle: 'hamstring',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'lower_back',
        equipment: 'barbell',
        description: 'the barbell bench press is a',
      },
    ],
    skipDuplicates: true,
  });
};
