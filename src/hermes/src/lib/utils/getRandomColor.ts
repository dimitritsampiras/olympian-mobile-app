import { colors } from './colors';

export const getRandomColor = (): string => {
  const keys = Object.keys(colors);
  const colorCategory = colors[keys[Math.floor(keys.length * Math.random())]];

  const color = colorCategory[200];
  return color || '#';
};
