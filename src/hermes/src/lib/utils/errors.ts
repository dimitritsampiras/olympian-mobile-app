import { DateTime } from 'luxon';
import { NexusGenAllTypes } from '../types/nexus';

export const createAppError = (message: string): NexusGenAllTypes['AppError'] => {
  return {
    name: 'General Error',
    message,
    createdAt: DateTime.now().toISO()
  };
};
