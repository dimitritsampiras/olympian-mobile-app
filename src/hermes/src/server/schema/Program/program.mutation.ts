import { extendType, inputObjectType, list, nullable } from 'nexus';

// All mutations for User graphql object type
export const ProgramMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create program mutation
    t.field('createProgram', {
      type: nullable('Program'),
      args: { input: 'CreateProgramInput' },
      resolve: async (_root, { input }, { prisma }) => {
        console.log('hit');
        const { name, publicity, tags, userId } = input;
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
            profileId: profile.id,
          },
        });

        return createdProgram;
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
    t.field('userId', { type: 'String' });
  },
});
