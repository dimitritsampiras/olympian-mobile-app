import { Prisma, PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

const programs: Prisma.ProgramCreateInput[] = [
  {
    name: 'Beginner Push Pull Legs',
    complimentary: false,
    specificity: ['hypertrophy'],
    trainingLevel: 'beginner',
    tags: ['full body', 'beginner', 'strength', 'hypertrophy'],
    publicity: 'public',
    likes: 10,
    profileImageDefaultColor: 'e0e7ff',
    profileImageDefaultEmoji: '1F93C',
    workouts: {
      create: [
        {
          name: 'Push Day',
          duration: DateTime.fromSeconds(45 * 60).toJSDate(),
          exercises: {
            create: [
              {
                authorNotes: 'keep your lats and core tight',
                reps: 5,
                sets: 5,
                rpe: 7,
                staticExerciseId: 'cle62wkl20078nfybmdwuoo5f',
              },
              {
                authorNotes: 'keep your core tight',
                reps: 5,
                sets: 8,
                rpe: 6,
                staticExerciseId: 'cle62wkl20084nfybxonp7wrp',
              },
            ],
          },
        },
        {
          name: 'Pull Day',
          duration: DateTime.fromSeconds(45 * 60).toJSDate(),
          exercises: {
            create: [
              {
                authorNotes: 'keep your shoudlers retracted',
                reps: 10,
                sets: 5,
                rpe: 5,
                staticExerciseId: 'cle62wkl20083nfybhz99irow',
              },
              {
                authorNotes: 'keep your core tight',
                reps: 5,
                sets: 8,
                rpe: 6,
                staticExerciseId: 'cle62wkl20085nfybgsr7xn2l',
              },
            ],
          },
        },
      ],
    },
    profile: {
      connect: { userId: 'cle62wkj70039nfyb17kali1q' },
    },
  },
];

export const seedPrograms = async (prisma: PrismaClient) => {
  for (const program of programs) {
    await prisma.program.create({
      data: program,
    });
  }
};
