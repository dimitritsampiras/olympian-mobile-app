import { extendType, list, nullable } from 'nexus';

// All mutations for User graphql object type
export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: nullable('User'),
      resolve: async (_root, _args, { user }) => {
        return user;
      }
    });
    t.field('users', {
      type: list('User'),
      args: {
        beans: list('Int')
      },
      resolve: async (_root, {beans}, { prisma }) => {
        const users = await prisma.user.findMany();
        return users;
      }
    })
  }
});
