import { extendType, list, nullable } from 'nexus';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: nullable('User'),
      resolve: async (_root, _args, { user }) => {
        return user;
      },
    });
  },
});
