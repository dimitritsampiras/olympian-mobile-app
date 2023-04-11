import { Prisma, PrismaClient, Profile, Program, User } from '@prisma/client';
import { createPassword } from '../utils/auth';

const users: Prisma.UserCreateInput[] = [
  {
    email: 'dimitri.tsampiras@gmail.com',
    password: 'test',
    profile: {
      create: {
        name: 'Dimitri',
        username: 'dimitritsampiras',
      },
    },
  },
  {
    email: 'adonis.tsampiras@gmail.com',
    password: 'test',
    profile: {
      create: {
        name: 'Adonis',
        username: 'adonis123',
        defaultColor: '#ffe4e6',
      },
    },
  },
];

export const seedUsers = async (prisma: PrismaClient) => {
  for (const user of users) {
    await prisma.user
      .create({
        data: {
          email: user.email,
          password: await createPassword(user.password),
          profile: user.profile,
        },
      })
      .catch((e) => e);
  }
};
