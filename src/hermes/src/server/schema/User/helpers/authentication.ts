import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

import config from '../../../../config';
import { NexusGenInputs } from '../../../../lib/types/nexus';
import { PrismaClient, User } from '@prisma/client';
import { getRandomColor } from '../../../../lib/utils/getRandomColor';

type LoginInput = NexusGenInputs['LoginInput'];
type SignUpInput = NexusGenInputs['SignUpInput'];

/**
 * Function that returns payload fron authorization string.
 *
 * @description
 * Server requests will contain a property "Authorization" whose value is "Bearer <token>".
 * The token is a jwt that can be used to authenticate and identify the user for each request.
 * The function takes that token and extracts the user object with jwt.verify
 *
 * @param authorization Authorization string from request headers.
 * @returns Payload object.
 */
export const authenticateUser = (authorization: string | undefined): string | undefined => {
  try {
    const bearerLength = 'Bearer '.length;
    if (!authorization || !(authorization.length > bearerLength)) return;
    const reqToken = authorization.slice(bearerLength);

    const payload = jwt.verify(reqToken, config.jwtSecret) as {
      userId: string;
      iat: number;
      exp: number;
    };

    return payload.userId;
  } catch (e) {
    return;
  }
};

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
 * Body of log in mutation
 * @returns Either a jwt or undefined
 */
export const loginUser = async (
  prisma: PrismaClient,
  input: LoginInput
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

/**
 *
 * Body of sign up mutation
 * @returns Either a user object or an error
 */
export const signUpUser = async (prisma: PrismaClient, input: SignUpInput) => {
  const { username, password, name, email } = input;

  const profileInitialsDefaultColor = getRandomColor();

  const user = await prisma.user.create({
    data: {
      email,
      password: await createPassword(password),
      profile: {
        create: {
          name,
          username,
          profileInitialsDefaultColor,
        },
      },
    },
  });

  return !!user;
};

/**
 *
 * @param user User object coming from request
 * @param unAuthorizedRoles List of roles that are unauthorized
 * @returns boolean based on authroized
 */
export const isUserAuthorized = (user: User | null) => {
  if (!user) return false;
  return true;
};
