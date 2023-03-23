import { extendType, list, nullable } from 'nexus';

export const ProfileQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('profileFromId', {
      type: nullable('Profile'),
      args: { id: 'String' },
      resolve: async (_root, { id }, { prisma }) => {
        return await prisma.profile.findUnique({
          where: { id },
        });
      },
    });
    t.field('myProfile', {
      type: nullable('Profile'),
      resolve: async (_root, _args, { userId, prisma }) => {
        return await prisma.profile.findUnique({
          where: { userId },
        });
      },
    });
    t.field('myFollowers', {
      type: list('Profile'),
      resolve: async (_root, _args, { userId, prisma }) => {
        const profile = await prisma.profile.findUnique({
          where: { userId },
          include: { followedBy: { include: { followedBy: true } } },
        });

        return profile?.followedBy || [];
      },
    });
    t.field('myFollowersCount', {
      type: 'Int',
      resolve: async (_root, _args, { userId, prisma }) => {
        const count = await prisma.profile.count({
          where: { followedBy: { some: { userId } } },
        });
        return count;
      },
    });
    t.field('myFollows', {
      type: list('Profile'),
      resolve: async (_root, _args, { userId, prisma }) => {
        return (
          (
            await prisma.profile.findUnique({
              where: { userId },
              include: { following: true },
            })
          )?.following || []
        );
      },
    });
    t.field('myFollowsCount', {
      type: 'Int',
      resolve: async (_root, _args, { userId, prisma }) => {
        const count = await prisma.profile.count({
          where: { following: { some: { userId } } },
        });
        return count;
      },
    });
  },
});
