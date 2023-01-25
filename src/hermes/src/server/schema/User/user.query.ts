import { isNil } from 'lodash';
import { extendType, nullable } from 'nexus';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: nullable('User'),
      resolve: async (_root, _args, { user }) => {
        return user;
      },
    });
    t.field('usernameExists', {
      type: nullable('Boolean'),
      args: { username: 'String' },
      resolve: async (_root, { username }, { prisma }) => {
        const existingUser = await prisma.user.findUnique({ where: { username } });
        return !isNil(existingUser);
      },
    });
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
