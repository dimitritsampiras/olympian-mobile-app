import { colors } from './colors';

/**
 *
 * gets a random color from the colors.ts file
 */
export const getRandomColor = (): string => {
  const keys = Object.keys(colors);
  const colorCategory = colors[keys[Math.floor(keys.length * Math.random())]];

  const color = colorCategory[200];
  return color || '#';
};
