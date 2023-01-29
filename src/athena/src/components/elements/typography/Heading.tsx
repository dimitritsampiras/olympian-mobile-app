import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import theme from '../../../theme';

interface HeadingProps {
  as?: 'title' | 'h1' | 'h2' | 'h3';
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  noMargin?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({ as = 'h1', children, style, noMargin }) => {
  let fontSize;
  switch (as) {
    case 'title':
      fontSize = 40;
      break;
    case 'h1':
      fontSize = 30;
      break;
    case 'h2':
      fontSize = 26;
      break;
    case 'h3':
      fontSize = 20;
      break;
  }

  return (
    <Text
      style={[
        { fontSize, color: theme.gray[900], fontWeight: '700', width: 250 },
        !noMargin && { marginBottom: 24 },
        style,
      ]}>
      {children}
    </Text>
  );
};
