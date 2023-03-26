import { SvgProps, NumberProp } from 'react-native-svg';
import theme from '../theme';
import { CreateProgramInput } from './graphql';
interface Props extends SvgProps {
  size?: NumberProp;
}
export type HeroIcon = ({ size, ...props }: Props) => JSX.Element;
export type ThemeColor = Exclude<keyof typeof theme.colors, 'black' | 'white'>;

export type CreateProgramInputWithoutUserId = Omit<CreateProgramInput, 'userId'>;

export type FormikHandleChange = {
  (e: React.ChangeEvent<unknown>): void;
  <T = string | React.ChangeEvent<unknown>>(field: T): T extends React.ChangeEvent<unknown>
    ? void
    : (e: string | React.ChangeEvent<unknown>) => void;
};
