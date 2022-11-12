import { PrismaClient } from '@prisma/client';
import { NexusGenObjects } from '../lib/types/nexus';

/**
 *
 * App Context interface
 * @remarks No reason for this to be in a separate file except from require() in ./schema.ts
 */
export interface AppContext {
  req: Express.Request;
  res: Express.Response;
  prisma: PrismaClient;
  user: NexusGenObjects['User'] | null;
}
