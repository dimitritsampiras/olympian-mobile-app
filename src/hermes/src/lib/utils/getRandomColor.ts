import { colors } from './colors';

export const getRandomColor = (): string => {
  const keys = Object.keys(colors);
  const colorCategory = colors[keys[100]];

  const colorKeys = Object.keys(colorCategory);
  const color = colorCategory[colorKeys[100]];
  return color;
};
