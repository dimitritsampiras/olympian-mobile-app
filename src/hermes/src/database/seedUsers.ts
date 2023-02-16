import { Prisma, PrismaClient, Profile, Program, User } from '@prisma/client';
import { createPassword } from '../server/schema/User/helpers/authentication';

const users: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    username: 'johndoe',
    password: 'password123',
    profile: {
      create: {
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male',
        weight: 75,
        height: 180,
        trainingAge: 'beginner',
        goals: ['strength', 'hypertrophy'],
      },
    },
  },
  {
    name: 'Dimitri Tsampiras',
    email: 'dimitri.tsampiras@gmail.com',
    username: 'dimitritsampiras',
    password: 'test',
    profile: {
      create: {
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male',
        weight: 75,
        height: 180,
        trainingAge: 'beginner',
        goals: ['strength', 'hypertrophy'],
      },
    },
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    username: 'janedoe',
    password: 'password456',
    profile: {
      create: {
        dateOfBirth: new Date('1995-05-05'),
        gender: 'female',
        weight: 60,
        height: 170,
        trainingAge: 'intermediate',
        goals: ['athleticism', 'cardio'],
      },
    },
  },
  {
    name: 'Bob Smith',
    email: 'bobsmith@example.com',
    username: 'bobsmith',
    password: 'password789',
    profile: {
      create: {
        dateOfBirth: new Date('1985-03-15'),
        gender: 'male',
        weight: 80,
        height: 185,
        trainingAge: 'advanced',
        goals: ['hypertrophy', 'cardio'],
      },
    },
  },
  {
    name: 'Alice Lee',
    email: 'alicelee@example.com',
    username: 'alicelee',
    password: 'passwordabc',
    profile: {
      create: {
        dateOfBirth: new Date('1992-12-31'),
        gender: 'female',
        weight: 55,
        height: 165,
        trainingAge: 'beginner',
        goals: ['general', 'cardio'],
      },
    },
  },
  {
    name: 'David Chen',
    email: 'davidchen@example.com',
    username: 'davidchen',
    password: 'passworddef',
    profile: {
      create: {
        dateOfBirth: new Date('1998-06-10'),
        gender: 'male',
        weight: 70,
        height: 175,
        trainingAge: 'intermediate',
        goals: ['strength', 'athleticism'],
      },
    },
  },
];

export const seedUsers = async (prisma: PrismaClient) => {
  for (const user of users) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: await createPassword(user.password),
        username: user.username,
        profile: user.profile,
      },
    });
  }
};
