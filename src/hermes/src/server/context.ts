import { PrismaClient, User } from '@prisma/client';

/**
 *
 * App Context interface
 * @remarks No reason for this to be in a separate file except from require() in ./schema.ts
 */
export interface AppContext {
  req: Express.Request;
  res: Express.Response;
  prisma: PrismaClient;
  user: User | null;
}
