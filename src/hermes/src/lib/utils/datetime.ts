/**
 * A collection of helper functions to handle date time related functions
 */
import { DateTime } from 'luxon';

export const getCurrentDateISO = () => {
  return DateTime.now().toISO();
};
