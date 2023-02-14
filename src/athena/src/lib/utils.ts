import { Specificity } from './graphql';
import { ThemeColor } from './types';

export const specificityColor = (specificity: Specificity): ThemeColor => {
  if (specificity === Specificity.Strength) return 'red';
  if (specificity === Specificity.Hypertrophy) return 'blue';
  if (specificity === Specificity.General) return 'green';
  if (specificity === Specificity.Athleticism) return 'orange';
  if (specificity === Specificity.Cardio) return 'violet';
  return 'gray';
};
