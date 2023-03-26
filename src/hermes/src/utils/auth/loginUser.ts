import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { NexusGenInputs } from '../../types';
import config from '../../config';

/**
 *
 * Body of log in mutation
 * @returns Either a jwt or undefined
 */
export const loginUser = async (
  prisma: PrismaClient,
  input: NexusGenInputs['LoginInput']
): Promise<string | null> => {
  const { username, password } = input;

  const profile = await prisma.profile.findUnique({ where: { username }, include: { user: true } });

  // user does not exist guard clause
  if (!profile?.user) return null;

  const { user } = profile;

  const isVerified = await argon2.verify(user.password, password);

  // incorrect password guard clause
  if (!isVerified) return null;

  try {
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: '3d',
    });

    return token;
  } catch (error) {
    return null;
  }
};
