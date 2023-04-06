import { Prisma, PrismaClient } from '@prisma/client';
import { createPassword } from '../server/schema/User/helpers/authentication';

/**
 *
 * seed function to provide mock data to users table
 */
const users: Prisma.UserCreateInput[] = [
  {
    email: 'johndoe@example.com',
    password: 'password123',
    profile: {
      create: {
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male',
        weight: 75,
        name: 'John Doe',
        username: 'johndoe',
        height: 180,
        trainingAge: 'beginner',
        goals: ['strength', 'hypertrophy'],
        profileInitialsDefaultColor: '#d8b4fe',
      },
    },
  },
  {
    email: 'dimitri.tsampiras@gmail.com',
    password: 'test',
    profile: {
      create: {
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male',
        weight: 75,
        height: 180,
        name: 'Dimitri Tsampiras',
        username: 'dimitritsampiras',
        trainingAge: 'beginner',
        goals: ['strength', 'hypertrophy'],
        profileInitialsDefaultColor: '#60a5fa',
      },
    },
  },
  {
    email: 'janedoe@example.com',
    password: 'password456',
    profile: {
      create: {
        name: 'Jane Doe',
        username: 'janedoe',
        dateOfBirth: new Date('1995-05-05'),
        gender: 'female',
        weight: 60,
        height: 170,
        trainingAge: 'intermediate',
        goals: ['sports_performance', 'cardio'],
        profileInitialsDefaultColor: '#a7f3d0',
      },
    },
  },
  {
    email: 'bobsmith@example.com',
    password: 'password789',
    profile: {
      create: {
        dateOfBirth: new Date('1985-03-15'),
        gender: 'male',
        weight: 80,
        height: 185,
        name: 'Bob Smith',
        username: 'bobsmith',
        trainingAge: 'advanced',
        goals: ['hypertrophy', 'cardio'],
        profileInitialsDefaultColor: '#facc15',
      },
    },
  },
  {
    email: 'davidchen@example.com',
    password: 'passworddef',
    profile: {
      create: {
        name: 'David Chen',
        username: 'davidchen',
        dateOfBirth: new Date('1998-06-10'),
        gender: 'male',
        weight: 70,
        height: 175,
        trainingAge: 'intermediate',
        goals: ['strength', 'wellness'],
        profileInitialsDefaultColor: '#d1d5db',
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
