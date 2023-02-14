import { extendType, list, nonNull, nullable } from 'nexus';
import { mockTrendingPrograms, mockPopularPrograms } from '../../../data/programs';

export const ProgramQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('trendingPrograms', {
      type: list('Program'),
      args: { skip: 'Int', take: 'Int' },
      resolve: async (_root, { skip, take }, { prisma }) => {
        console.log(skip, take, prisma);
        return mockTrendingPrograms;
        //   return await prisma.program.findMany({
        //     skip,
        //     take,
        //     orderBy: {
        //       // "trendingness" Program field does not yet exist.
        //       trendingness: 'desc',
        //     },
        //   });
      },
    });
    t.field('popularPrograms', {
      type: list('Program'),
      args: { skip: 'Int', take: 'Int' },
      resolve: async (_root, { skip, take }, { prisma }) => {
        console.log(skip, take, prisma);
        return mockPopularPrograms;
        //   return await prisma.program.findMany({
        //     skip,
        //     take,
        //     orderBy: {
        //       // "popularity" Program field does not yet exist.
        //       popularity: 'desc',
        //     },
        //   });
      },
    });
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
