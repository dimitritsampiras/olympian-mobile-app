import { extendType, list, nullable } from 'nexus';

// All mutations for User graphql object type
export const ProgramQuery = extendType({
  type: 'Query',
  definition(t) {
    // create program mutation
    t.field('program', {
      type: nullable('Program'),
      args: { programId: 'String' },
      resolve: async (_root, { programId }, { prisma }) => {
        const program = await prisma.program.findUnique({
          where: { id: programId },
          include: { profile: { include: { user: { select: { username: true } } } } },
        });
        return program;
      },
    });
    // create program mutation
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
  },
});
