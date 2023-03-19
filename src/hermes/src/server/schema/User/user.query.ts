import { isNil } from 'lodash';
import { extendType, nullable } from 'nexus';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     *
     * determines the user from the request header
     */
    t.field('me', {
      type: nullable('User'),
      resolve: async (_root, _args, { prisma, userId }) => {
        if (!userId) return null;
        return await prisma.user.findUnique({
          where: { id: userId },
          include: { profile: { select: { name: true, username: true } } },
        });
      },
    });
    /**
     *
     * checks if the username exist
     */
    t.field('usernameExists', {
      type: nullable('Boolean'),
      args: { username: 'String' },
      resolve: async (_root, { username }, { prisma }) => {
        const existingProfile = await prisma.profile.findUnique({ where: { username } });
        return !isNil(existingProfile?.username);
      },
    });
    /**
     *
     * checks if the email exists
     */
    t.field('emailExists', {
      type: nullable('Boolean'),
      args: { email: 'String' },
      resolve: async (_root, { email }, { prisma }) => {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        return !isNil(existingUser);
      },
    });
  },
});
