import _ from 'lodash';
import { CLIENT_COLORS } from '../../constants';

// takes the client colors as returns a random color from the shade paramter
// i.e getRandomColor(100) -> rose[100]
export const getRandomColor = (
  shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 = 100
) => {
  const shadeColors = Object.values(CLIENT_COLORS).map((color) => color[shade]);
  return _.sample(shadeColors);
};
