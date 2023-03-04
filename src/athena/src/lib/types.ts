import { SvgProps, NumberProp } from 'react-native-svg';
import theme from '../theme';
interface Props extends SvgProps {
  size?: NumberProp;
}
export type HeroIcon = ({ size, ...props }: Props) => JSX.Element;
export type ThemeColor = Exclude<keyof typeof theme.colors, 'black' | 'white'>;
