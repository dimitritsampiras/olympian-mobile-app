import { extendType, inputObjectType, nullable, objectType } from 'nexus';
import { loginUser, signUpUser } from './helpers/authentication';

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
        return await loginUser(prisma, input);
      },
    });
    t.field('signup', {
      type: nullable('Boolean'),
      args: { input: 'SignUpInput' },
      resolve: async (_root, { input }, { prisma }) => {
        return await signUpUser(prisma, input);
      },
    });
  },
});

// Login input type for login mutation args
export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.string('username');
    t.string('password');
  },
});

export const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.string('username');
    t.string('password');
    t.string('email');
    t.string('name');
  },
});

export const UserResponse = objectType({
  name: 'UserResponse',
  definition(t) {
    t.field('user', { type: nullable('User') });
    t.field('error', { type: nullable('AppError') });
  },
});
