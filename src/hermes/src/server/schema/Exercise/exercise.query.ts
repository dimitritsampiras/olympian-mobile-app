import { extendType, list } from 'nexus';

// All mutations for User graphql object type
export const ExerciseQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('exercises', {
      type: list('StaticExercise'),
      resolve: async (_root, _args, { prisma }) => {
        return await prisma.staticExercise.findMany();
      },
    });
  },
});
