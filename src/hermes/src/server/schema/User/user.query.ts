import { extendType, nullable } from 'nexus';

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
  }
});
