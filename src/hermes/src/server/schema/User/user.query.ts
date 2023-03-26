/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Exercise, Profile, Program, Workout } from '@prisma/client';
import { isNil } from 'lodash';
import { extendType, list, nullable, unionType } from 'nexus';

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
    /**
     *
     * checks if the email exists
     */
    t.field('browseSearch', {
      type: list('BrowseResponseTypeUnion'),
      args: { keyword: 'String' },
      resolve: async (_root, { keyword }, { prisma }) => {
        const profilesQuery = prisma.profile.findMany({
          where: {
            OR: [
              { name: { contains: keyword, mode: 'insensitive' } },
              { username: { contains: keyword, mode: 'insensitive' } },
            ],
          },
          include: { followedBy: true },
        });

        const programsQuery = prisma.program.findMany({
          where: {
            OR: [{ name: { contains: keyword, mode: 'insensitive' } }],
          },
        });

        const workoutsQuery = prisma.workout.findMany({
          where: {
            OR: [{ name: { contains: keyword, mode: 'insensitive' } }],
          },
        });

        const exercisesQuery = prisma.exercise.findMany({
          where: {
            OR: [{ staticExercise: { name: { contains: keyword, mode: 'insensitive' } } }],
          },
        });

        const [profiles, programs, workouts, exercises] = await Promise.all([
          profilesQuery,
          programsQuery,
          workoutsQuery,
          exercisesQuery,
        ]);
        return [...profiles, ...programs, ...workouts, ...exercises];
      },
    });
  },
});

export const BrowseResponseTypeUnion = unionType({
  name: 'BrowseResponseTypeUnion',
  definition(t) {
    t.members('Profile', 'Program', 'Workout', 'Exercise');
  },
  resolveType: (res) => {
    if ((res as Profile).username) return 'Profile';
    if ((res as Program).name) return 'Program';
    if ((res as Exercise).staticExerciseId) return 'Exercise';
    if ((res as Workout).trainingType) return 'Workout';
    return null;
  },
});
