// import { extendType, list } from 'nexus';
// import { mockStaticExerciseData } from '../../../data/StaticExercise';

// export const ExerciseQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.field('staticExercises', {
//       type: list('StaticExercise'),
//       args: { skip: 'Int', take: 'Int' },
//       resolve: async (_root, { skip, take }, { prisma }) => {
//         console.log(skip, take, prisma);
//         return mockStaticExerciseData;
//       },
//     });
//   },
// });
