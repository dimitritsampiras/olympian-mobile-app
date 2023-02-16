import { extendType, list, nullable } from 'nexus';

export const ProgramQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('trendingPrograms', {
      type: list('Program'),
      args: { skip: 'Int', take: 'Int' },
      resolve: async (_root, { skip, take }, { prisma }) => {
        return prisma.program.findMany({
          skip,
          take: 8,
        });
      },
    });
    t.field('popularPrograms', {
      type: list('Program'),
      args: { skip: 'Int', take: 'Int' },
      resolve: async (_root, { skip, take }, { prisma }) => {
        console.log(skip, take, prisma);
        return prisma.program.findMany({
          skip,
          take: 8,
        });
      },
    });
    // create program mutation
    t.field('program', {
      type: nullable('Program'),
      args: { programId: 'String' },
      resolve: async (_root, { programId }, { prisma }) => {
        const program = await prisma.program.findUnique({
          where: { id: programId },
          include: {
            workouts: { include: { exercises: { select: { id: true } } } },
            profile: { include: { user: { select: { username: true } } } },
          },
        });
        return program;
      },
    });
    /**
     *
     * gets all programs that the user has
     */
    t.field('userPrograms', {
      type: list('Program'),
      resolve: async (_root, _args, { prisma, userId }) => {
        const programs = await prisma.program.findMany({
          where: { profile: { userId } },
          include: { profile: { include: { user: { select: { username: true } } } } },
        });
        return programs;
      },
    });
    /**
     *
     * gets all programs that the user has
     */
    t.field('workout', {
      type: nullable('Workout'),
      args: { workoutId: 'String' },
      resolve: async (_root, { workoutId }, { prisma }) => {
        const workout = await prisma.workout.findUnique({
          where: { id: workoutId },
          include: {
            program: { include: { profile: true } },
            exercises: { include: { staticExercise: true } },
          },
        });
        return workout;
      },
    });
    /**
     *
     * gets all programs that the user has
     */
    t.field('staticExercise', {
      type: nullable('StaticExercise'),
      args: { staticExerciseId: 'String' },
      resolve: async (_root, { staticExerciseId }, { prisma }) => {
        const staticExercise = await prisma.staticExercise.findUnique({
          where: { id: staticExerciseId },
        });
        return staticExercise;
      },
    });
    /**
     *
     * gets all programs that the user has
     */
    t.field('staticExercises', {
      type: list('StaticExercise'),
      resolve: async (_root, _args, { prisma }) => {
        const staticExercise = await prisma.staticExercise.findMany({
          orderBy: { name: 'asc' },
        });
        return staticExercise;
      },
    });
  },
});
