import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import theme from '../../../theme';

interface SubHeadingProps extends TextProps {
  as?: 'title' | 'h1' | 'h2' | 'h3';
  children: ReactNode;
}

export const SubHeading: React.FC<SubHeadingProps> = ({ as = 'h1', style, children }) => {
  let fontSize;
  switch (as) {
    case 'h1':
      fontSize = 20;
      break;
    case 'h2':
      fontSize = 16;
      break;
    case 'h3':
      fontSize = 14;
      break;
  }

  let marginBottom;
  switch (as) {
    case 'h1':
      marginBottom = 16;
      break;
    case 'h2':
      marginBottom = 12;
      break;
    case 'h3':
      marginBottom = 8;
      break;
  }

  return (
    <Text
      style={[{ fontSize, color: theme.colors.gray[600], fontWeight: '400', marginBottom }, style]}>
      {children}
    </Text>
  );
};
