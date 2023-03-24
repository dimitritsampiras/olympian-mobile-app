import { TrainingType } from './graphql';
import { ThemeColor } from './types';

type TrainingTypeTuple = [ThemeColor, string];

export const BROWSE_CATGEORIES: Record<TrainingType, TrainingTypeTuple> = {
  hypertrophy: ['red', '26F9'],
  strength: ['blue', '26F9'],
  cardio: ['blue', '1F3C3'],
  olympic_weightlifting: ['amber', '1F3CB'],
  calisthenics: ['cyan', '1F938'],
  crossfit: ['lime', '1F3CB'],
  boxing: ['rose', '1F94A'],
  swimming: ['orange', '1F3CA'],
  cycling: ['warmGray', '1F6B4'],
  running: ['green', '1F3C3'],
  martial_arts: ['violet', '1F94B'],
  rowing: ['lightBlue', '1F6A3'],
  gymnastics: ['teal', '1F938'],
  aerobics: ['yellow', '1F3CB'],
  functional_training: ['amber', '1F9D7'],
  sports_performance: ['blue', '26BD'],
  recovery: ['green', '1FA79'],
  pilates: ['slate', '26F9'],
  hiit: ['cyan', '26F9'],
  wellness: ['green', '26F9'],
  stretching: ['amber', '26F9'],
};
