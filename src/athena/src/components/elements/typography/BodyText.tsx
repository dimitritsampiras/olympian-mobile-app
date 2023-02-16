import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import theme from '../../../theme';

interface BodyTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export const BodyText: React.FC<BodyTextProps> = ({ children, style }) => {
  return <Text style={[{ color: theme.colors.gray[500], lineHeight: 20 }, style]}>{children}</Text>;
};
