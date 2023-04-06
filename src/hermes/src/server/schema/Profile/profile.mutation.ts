import { extendType, nullable } from 'nexus';

export const ProfileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * unfollows another profile
     */
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
    /**
     * follows another profile
     */
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
    /**
     * adds programs to a users library
     */
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
  },
});
