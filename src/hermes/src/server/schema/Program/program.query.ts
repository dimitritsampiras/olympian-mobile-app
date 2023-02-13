import { extendType, list, nonNull } from 'nexus';
import { mockTrendingPrograms, mockPopularPrograms } from '../../../data/programs';

export const ProgramQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('trendingPrograms', {
      type: nonNull(list(nonNull('Program'))),
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
      type: nonNull(list(nonNull('Program'))),
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
  },
});
