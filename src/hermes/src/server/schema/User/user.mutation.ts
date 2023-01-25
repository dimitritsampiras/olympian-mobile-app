import { isNil } from 'lodash';
import { extendType, inputObjectType, nullable, objectType } from 'nexus';
import { loginUser, signUpUser } from './helpers/authentication';
import { findEmail, findUsername } from './helpers/findUsers';

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
      },
    });
    t.field('signup', {
      type: nullable('Boolean'),
      args: { input: 'SignUpInput' },
      resolve: async (_root, { input }, { prisma }) => {
        const userCreated = await signUpUser(prisma, input);
        return userCreated;
      },
    });
    t.field('usernameExists', {
      type: nullable('Boolean'),
      args: { input: 'String' },
      resolve: async (_root, { input }, { prisma }) => {
        const existingUser = await prisma.user.findUnique({ where: { username: input } });
        return !isNil(existingUser);
      },
    });
    t.field('emailExists', {
      type: nullable('Boolean'),
      args: { input: 'String' },
      resolve: async (_root, { input }, { prisma }) => {
        const emailFound = await findEmail(prisma, input);
        return emailFound;
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
