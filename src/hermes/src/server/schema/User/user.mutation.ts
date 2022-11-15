import { extendType, inputObjectType, nullable, objectType } from 'nexus';
import { loginUser } from './helpers/authentication';


// login () -> user 
// register () -> user

// All mutations for User graphql object type
export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // login mutation
    t.field('login', {
      type: nullable('String'),
      args: { input: 'LoginInput' },
      resolve: async (_root, { input }, { prisma }) => {
        const token = await loginUser(prisma, input);
        return token;
      }
    });
  }
});

// Login input type for login mutation args
export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.string('username');
    t.string('password');
  }
});

export const UserResponse = objectType({
  name: 'UserResponse',
  definition(t) {
    t.field('user', { type: nullable('User') });
    t.field('error', { type: nullable('AppError') });
  }
});
