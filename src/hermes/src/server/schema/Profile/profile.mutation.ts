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
  },
});
