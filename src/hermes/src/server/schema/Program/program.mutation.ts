import { DateTime } from 'luxon';
import { extendType, inputObjectType, list, nullable } from 'nexus';

// All mutations for User graphql object type
export const ProgramMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     *
     * create program mutation
     */
    t.field('createProgram', {
      type: nullable('Program'),
      args: { input: 'CreateProgramInput' },
      resolve: async (_root, { input }, { prisma }) => {
        const { name, publicity, tags, specificity, userId } = input;
        // check if the profile exists
        const profile = await prisma.profile.findUnique({
          where: { userId },
        });

        // TODO: handle error
        if (!profile) return null;

        const createdProgram = await prisma.program.create({
          data: {
            name,
            publicity,
            tags,
            specificity,
            profile: { connect: { userId } },
          },
        });

        return createdProgram;
      },
    });
    /**
     *
     * create program mutation
     */
    t.field('createWorkout', {
      type: nullable('Workout'),
      args: { programId: 'String' },
      resolve: async (_root, { programId }, { prisma }) => {
        try {
          // check if the profile exists
          const program = await prisma.program.findUnique({
            where: { id: programId },
            include: { workouts: true },
          });
          // TODO: handle error
          if (!program) return null;

          const createdWorkout = await prisma.workout.create({
            data: {
              name: `Workout #${program.workouts.length + 1}`,
              duration: DateTime.fromSeconds(0).toJSDate(),
              trainingLevel: program.trainingLevel,
              programId,
            },
          });

          return createdWorkout;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    });
  },
});

export const CreateProgramInput = inputObjectType({
  name: 'CreateProgramInput',
  definition(t) {
    t.field('name', { type: 'String' });
    t.field('publicity', { type: 'Publicity' });
    t.field('tags', { type: list('String') });
    t.field('specificity', { type: list('Specificity') });
    t.field('userId', { type: 'String' });
  },
});
