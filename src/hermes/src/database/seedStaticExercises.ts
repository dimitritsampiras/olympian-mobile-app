import { PrismaClient } from '@prisma/client';

/**
 *
 * seed function to rpvoide mock data to exercises
 */
export const seedStaticExercises = async (prisma: PrismaClient) => {
  await prisma.staticExercise.createMany({
    data: [
      {
        name: 'Barbell Bench Press',
        movement: 'horizontal_push',
        primaryTargetMuscle: 'chest',
        secondaryTargetMuscle: 'triceps',
        equipment: 'barbell',
        description:
          'The barbell bench press is a classic compound lift, primarily involving the chest and triceps, but also the front deltoids.',
      },
      {
        name: 'Deadlift',
        movement: 'hip_dominant',
        primaryTargetMuscle: 'hamstring',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'lower_back',
        equipment: 'barbell',
        description:
          'The deadlift is a very technical compound lift involving the hamstrings and lower back.',
      },
      {
        name: 'Pull-up',
        movement: 'vertical_pull',
        primaryTargetMuscle: 'back_deltoids',
        secondaryTargetMuscle: 'biceps',
        equipment: 'bodyweight',
        description:
          'The pull up is a calisthenic movement with which the participant hoists their chin above a horizontal bar using an overhand grip. Primarily involves the lat muscles, but also works the upper back.',
      },
      {
        name: 'Squats',
        movement: 'knee_dominant',
        primaryTargetMuscle: 'quadriceps',
        secondaryTargetMuscle: 'gluteal',
        tertiaryTargetMuscle: 'hamstring',
        equipment: 'barbell',
        description: 'The squat is a quadricep and glute focused compound lift.',
      },
      {
        name: 'Shoulder Press',
        movement: 'vertical_push',
        primaryTargetMuscle: 'front_deltoids',
        secondaryTargetMuscle: 'triceps',
        tertiaryTargetMuscle: 'chest',
        equipment: 'dumbbell',
        description:
          'The shoulder press (also called overhead press, or military press) involves all three deltoids, but also involves the pectoral muscles and triceps.',
      },
    ],
    skipDuplicates: true,
  });
};
