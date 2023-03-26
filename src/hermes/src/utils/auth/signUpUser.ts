import argon2 from 'argon2';

import { PrismaClient } from '@prisma/client';
import { NexusGenInputs } from '../../types';
import { getRandomColor } from '../misc';
import { PROFILE_DEFAULT_COLOR_SHADE } from '../../constants';

type SignUpInput = NexusGenInputs['SignUpInput'];

/**
 * Function that hashes a password with argon2
 * @param password Inputed password string
 * @returns Hashed password
 */
export const createPassword = async (password: string) => {
  const passwordHash = await argon2.hash(password);
  return passwordHash;
};

/**
 *
 * Body of sign up mutation
 * @returns Either a user object or an error
 */
export const signUpUser = async (prisma: PrismaClient, input: SignUpInput) => {
  const { username, password, name, email } = input;

  const defaultProfileColor = getRandomColor(PROFILE_DEFAULT_COLOR_SHADE);

  const user = await prisma.user.create({
    data: {
      email,
      password: await createPassword(password),
      profile: {
        create: {
          name,
          username,
          defaultColor: defaultProfileColor,
        },
      },
    },
  });

  return !!user;
};
