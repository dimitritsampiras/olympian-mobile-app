import { colors } from '../../../../lib/utils/colors';

export const getRandomDefaultProfileColor = (): string => {
  const keys = Object.keys(colors);
  const colorCategory = colors[keys[Math.floor(keys.length * Math.random())]];

  const colorKeys = Object.keys(colorCategory);
  const color = colorCategory[colorKeys[Math.floor(colorKeys.length * Math.random())]];
  return color;
};
