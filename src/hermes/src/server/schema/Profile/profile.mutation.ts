import { extendType, nullable } from 'nexus';

export const ProfileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('unfollow', {
      type: nullable('Profile'),
      args: { profileId: 'String' },
      resolve: async (_root, { profileId }, { userId, prisma }) => {
        return await prisma.profile.update({
          where: { userId },
          data: {
            following: { disconnect: { id: profileId } },
          },
        });
      },
    });
    t.field('follow', {
      type: nullable('Profile'),
      args: { profileId: 'String' },
      resolve: async (_root, { profileId }, { userId, prisma }) => {
        return await prisma.profile.update({
          where: { userId },
          data: {
            following: { connect: { id: profileId } },
          },
        });
      },
    });
    t.field('addProgramToLibrary', {
      type: nullable('Profile'),
      args: { programId: 'String' },
      resolve: async (_root, { programId }, { userId, prisma }) => {
        return await prisma.profile.update({
          where: { userId },
          data: {
            programLibrary: {
              connect: {
                id: programId,
              },
            },
          },
        });
      },
    });

    t.field('setGoal', {
      type: nullable('Goal'),
      args: { profileId: 'String', staticExerciseId: 'String', reps: 'Int', weight: 'Int' },
      resolve: async (_root, { profileId, staticExerciseId, reps, weight }, { prisma }) => {
        return await prisma.goal.create({
          data: {
            profileId,
            staticExerciseId,
            reps,
            weight
          },
        });
      },
    });
  },
});
